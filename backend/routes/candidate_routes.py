from fastapi import APIRouter, UploadFile, File, Form
from config.db import candidate_collection
from services.resume_parser import parse_resume
import pdfplumber
import io

router = APIRouter()

@router.post("/apply")
async def apply_candidate(
    name: str = Form(...),
    email: str = Form(...),
    linkedin: str = Form(...),
    github: str = Form(...),

    jd_id: str = Form(...),

    # ✅ Coding profile links (reference)
    coding_links: str = Form(...),
    # Example:
    # "leetcode:https://leetcode.com/user,codeforces:https://codeforces.com/profile/user"

    # ✅ Coding problems solved
    coding_platforms: str = Form(...),
    # Example:
    # "leetcode:300,codeforces:150"

    # ✅ Resume PDF
    resume: UploadFile = File(...)
):
    # -------------------------------
    # 📄 1. Extract text from PDF
    # -------------------------------
    resume_bytes = await resume.read()

    resume_text = ""
    try:
        with pdfplumber.open(io.BytesIO(resume_bytes)) as pdf:
            for page in pdf.pages:
                resume_text += page.extract_text() or ""
    except:
        resume_text = ""

    # -------------------------------
    # 🧠 2. Parse Resume (AI)
    # -------------------------------
    parsed_resume = parse_resume(resume_text)

    # -------------------------------
    # 📊 3. Process Coding Platforms (Solved Count)
    # -------------------------------
    platform_scores = {}
    total_solved = 0

    try:
        items = coding_platforms.split(",")
        for item in items:
            name_val = item.split(":")
            if len(name_val) == 2:
                platform = name_val[0].strip().lower()
                solved = int(name_val[1].strip())

                platform_scores[platform] = solved
                total_solved += solved
    except:
        platform_scores = {}
        total_solved = 0

    # -------------------------------
    # 🔗 Process Coding Links (FIXED)
    # -------------------------------
    platform_links = {}

    try:
        items = coding_links.split(",")

        for item in items:
            if ":" in item:
                platform, link = item.split(":", 1)

                platform = platform.strip().lower()
                link = link.strip()

                # basic validation
                if link.startswith("http"):
                    platform_links[platform] = link

    except Exception as e:
        platform_links = {}

    # -------------------------------
    # 💾 5. Store Candidate Data
    # -------------------------------
    candidate_data = {
        "name": name,
        "email": email,
        "linkedin": linkedin,
        "github": github,

        "applied_jd_id": jd_id,

        "coding_profiles": platform_scores,
        "coding_links": platform_links,
        "total_problems_solved": total_solved,

        "parsed_resume": parsed_resume
    }

    candidate_collection.insert_one(candidate_data)

    return {
        "message": "Candidate applied successfully",
        "parsed_resume": parsed_resume,
        "coding_profiles": platform_scores,
        "coding_links": platform_links,
        "total_problems_solved": total_solved
    }