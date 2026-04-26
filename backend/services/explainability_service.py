def generate_explanation(jd_parsed, candidate_data, scores):

    jd_skills = [s.lower() for s in jd_parsed.get("skills", [])]
    resume = candidate_data.get("parsed_resume", {})

    candidate_skills = [s.lower() for s in resume.get("skills", [])]
    projects = resume.get("projects", [])
    total_solved = candidate_data.get("total_problems_solved", 0)

    # -------------------------------
    # Skill Match Explanation
    # -------------------------------
    matched_skills = []

    for jd_skill in jd_skills:
        for c_skill in candidate_skills:
            if jd_skill in c_skill or c_skill in jd_skill:
                matched_skills.append(jd_skill)
                break

    # -------------------------------
    # Project Explanation
    # -------------------------------
    best_project = None

    for project in projects:
        desc = project.get("description", "").lower()

        if any(skill in desc for skill in jd_skills):
            best_project = project.get("name")
            break

    # -------------------------------
    # Coding Strength
    # -------------------------------
    if total_solved >= 300:
        coding_level = "Strong"
    elif total_solved >= 100:
        coding_level = "Moderate"
    else:
        coding_level = "Basic"

    # -------------------------------
    # Final Explanation
    # -------------------------------
    explanation = {
        "matched_skills": matched_skills,
        "project_highlight": best_project,
        "coding_strength": coding_level,
        "summary": f"Candidate matches {len(matched_skills)} required skills, "
                   f"has relevant project experience, and shows {coding_level.lower()} coding ability."
    }

    return explanation