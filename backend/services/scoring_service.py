import re

# -------------------------------
# 🔹 NORMALIZATION
# -------------------------------
def normalize(text):
    return re.sub(r'[^a-zA-Z0-9 ]', '', text.lower()).strip()


# -------------------------------
# 🔹 SKILL MAP (GENERAL + PRACTICAL)
# -------------------------------
skill_map = {
    # Programming
    "python": ["python", "pandas", "numpy", "matplotlib"],
    "java": ["java", "spring", "springboot"],
    "javascript": ["javascript", "node", "express", "react", "vue", "angular"],
    "c++": ["c++", "cpp", "stl"],
    "sql": ["sql", "mysql", "postgres", "sqlite", "database"],

    # Data Science / ML
    "ml": ["machine learning", "scikit", "sklearn", "xgboost", "lightgbm"],
    "dl": ["deep learning", "neural", "cnn", "rnn", "lstm", "gru"],
    "data science": ["analysis", "statistics", "regression", "classification", "clustering"],
    "data analysis": ["pandas", "numpy", "excel", "analysis", "visualization"],

    # AI / LLM
    "llm": ["llm", "langchain", "rag", "transformers", "huggingface", "prompt"],
    "nlp": ["nlp", "text", "tokenization", "bert", "embedding"],

    # Frameworks
    "django": ["django", "rest framework"],
    "flask": ["flask", "api"],
    "react": ["react", "frontend", "jsx"],
    "node": ["node", "express", "backend"],

    # DevOps / Cloud
    "docker": ["docker", "container"],
    "kubernetes": ["kubernetes", "k8s"],
    "aws": ["aws", "ec2", "s3", "lambda"],
    "azure": ["azure"],
    "gcp": ["gcp", "google cloud"],

    # Databases
    "mongodb": ["mongodb", "nosql"],
    "postgresql": ["postgres", "postgresql"],
    "mysql": ["mysql"],

    # Tools
    "git": ["git", "github", "version control"],

    # Fundamentals
    "dsa": ["data structures", "algorithms", "dsa"],
    "oop": ["oop", "object oriented"],

    # Web
    "frontend": ["html", "css", "javascript", "react"],
    "backend": ["api", "server", "database", "node", "django", "flask"],
    "full stack": ["frontend", "backend", "database"]
}


# -------------------------------
# 🔹 SKILL SCORE
# -------------------------------
def calculate_skill_score(jd_skills, candidate_skills):
    jd_skills = [normalize(s) for s in jd_skills]
    candidate_skills = [normalize(s) for s in candidate_skills]

    matched = 0

    for jd_skill in jd_skills:
        found = False

        # ✅ Direct / partial match
        for c_skill in candidate_skills:
            if jd_skill in c_skill or c_skill in jd_skill:
                found = True
                break

        # ✅ Synonym / semantic match
        if not found and jd_skill in skill_map:
            for keyword in skill_map[jd_skill]:
                keyword = normalize(keyword)

                for c_skill in candidate_skills:
                    if keyword in c_skill:
                        found = True
                        break

                if found:
                    break

        if found:
            matched += 1

    return (matched / len(jd_skills)) * 100 if jd_skills else 0


# -------------------------------
# 🔹 PROJECT SCORE
# -------------------------------
def calculate_project_score(jd_skills, projects):
    if not projects:
        return 0

    jd_skills = [normalize(s) for s in jd_skills]
    project_matches = 0

    for project in projects:
        desc = normalize(project.get("description", ""))

        for skill in jd_skills:
            if skill in desc:
                project_matches += 1
                break

    return (project_matches / len(projects)) * 100


# -------------------------------
# 🔹 EXPERIENCE SCORE
# -------------------------------
def calculate_experience_score(experience):
    exp = str(experience).lower()

    if "fresher" in exp:
        return 50
    elif "intern" in exp:
        return 70
    elif "experienced" in exp:
        return 90
    else:
        return 60


# -------------------------------
# 🔹 CODING SCORE
# -------------------------------
def calculate_coding_score(total):
    if total >= 500:
        return 100
    elif total >= 300:
        return 80
    elif total >= 150:
        return 60
    elif total >= 50:
        return 40
    else:
        return 10


# -------------------------------
# 🔹 FINAL SCORE
# -------------------------------
def calculate_final_score(jd, candidate):
    jd_skills = jd.get("skills", [])
    candidate_skills = candidate.get("parsed_resume", {}).get("skills", [])
    projects = candidate.get("parsed_resume", {}).get("projects", [])
    experience = candidate.get("parsed_resume", {}).get("experience", "")
    total_solved = candidate.get("total_problems_solved", 0)

    skill_score = calculate_skill_score(jd_skills, candidate_skills)
    project_score = calculate_project_score(jd_skills, projects)
    experience_score = calculate_experience_score(experience)
    coding_score = calculate_coding_score(total_solved)

    final_score = (
        skill_score * 0.4 +
        project_score * 0.2 +
        experience_score * 0.2 +
        coding_score * 0.2
    )

    return {
        "skill_score": round(skill_score, 2),
        "project_score": round(project_score, 2),
        "experience_score": round(experience_score, 2),
        "coding_score": round(coding_score, 2),
        "final_score": round(final_score, 2)
    }