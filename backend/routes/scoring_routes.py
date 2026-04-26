from fastapi import APIRouter
from config.db import jd_collection, candidate_collection
from services.scoring_service import calculate_final_score
from bson import ObjectId
from services.scoring_service import calculate_final_score
from services.explainability_service import generate_explanation
from services.chat_agent import simulate_interest
from services.email_service import send_shortlist_email


router = APIRouter()

@router.get("/score/{candidate_email}/{jd_id}")
def calculate_score(candidate_email: str, jd_id: str):

    candidate = candidate_collection.find_one(
        {
            "email": candidate_email,
            "parsed_resume.skills": {"$ne": []}   # only valid resumes
        },
        sort=[("_id", -1)]
    )

    print("CANDIDATE DATA:", candidate)

    try:
        jd = jd_collection.find_one({"_id": ObjectId(jd_id)})
    except:
        return {"error": "Invalid JD ID"}

    if not candidate or not jd:
        return {"error": "Candidate or JD not found"}

    scores = calculate_final_score(jd["parsed"], candidate)

    return {
        "candidate": candidate_email,
        "scores": scores
    }

@router.get("/rank/{jd_id}")
def rank_candidates(jd_id: str):

    from bson import ObjectId

    try:
        jd = jd_collection.find_one({"_id": ObjectId(jd_id)})
    except:
        return {"error": "Invalid JD ID"}

    if not jd:
        return {"error": "JD not found"}

    candidates_raw = list(candidate_collection.find({
        "parsed_resume.skills": {"$ne": []},
        "applied_jd_id": jd_id
    }))

    # 🔥 remove duplicates (keep latest by email)
    unique_candidates = {}

    for c in candidates_raw:
        email = c.get("email")
        unique_candidates[email] = c  # latest overwrites old

    candidates = list(unique_candidates.values())

    results = []

    for candidate in candidates:
        scores = calculate_final_score(jd["parsed"], candidate)

        final_score = scores["final_score"]
        interest_data = simulate_interest(jd["parsed"], candidate)
        interest_score = interest_data["interest_score"]
        combined_score = (final_score * 0.7) + (interest_score * 0.3)

        # 🔥 Labeling
        if final_score >= 70:
            label = "High Match"
        elif final_score >= 50:
            label = "Moderate Match"
        else:
            label = "Low Match"

        explanation = generate_explanation(jd["parsed"], candidate, scores)

        results.append({
            "name": candidate.get("name"),
            "email": candidate.get("email"),
            "score": final_score,
            "label": label,
            "interest_score": interest_score,  
            "combined_score": round(combined_score, 2),                # ✅ NEW
            "interest_summary": interest_data["summary"],
            "details": scores,
            "explanation": explanation
        })

    # -------------------------------
    # 🔥 SORT (Descending)
    # -------------------------------
    results.sort(key=lambda x: x["combined_score"], reverse=True)

    # -------------------------------
    # 🔥 FILTER (ONLY MODERATE + HIGH)
    # -------------------------------
    shortlisted = []

    for candidate in results:
        if candidate["combined_score"] >= 80:
            candidate["label"] = "High Match"
            shortlisted.append(candidate)
        elif candidate["combined_score"] >= 60:
            candidate["label"] = "Moderate Match"
            shortlisted.append(candidate)

    print("FINAL SCORE:", final_score)
    print("INTEREST SCORE:", interest_score)
    print("COMBINED SCORE:", combined_score)

    # -------------------------------
    # 🔥 LIMIT TOP N
    # -------------------------------
    TOP_N = 5
    shortlisted = shortlisted[:TOP_N]
    # -------------------------------
    # 📧 SEND EMAILS
    # -------------------------------
    role = jd["parsed"].get("role", "the role")

    for candidate in shortlisted:
        send_shortlist_email(
            candidate["email"],
            candidate["name"],
            role
        )

    return {
        "total_candidates": len(results),
        "shortlisted_count": len(shortlisted),
        "shortlisted": shortlisted
    }