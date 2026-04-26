import requests
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def simulate_interest(jd_parsed, candidate_data):
    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    role = jd_parsed.get("role", "")
    skills = jd_parsed.get("skills", [])
    exp = candidate_data.get("parsed_resume", {}).get("experience", "")

    prompt = f"""
    You are simulating a recruiter conversation.

    Job Role: {role}
    Required Skills: {skills}
    Candidate Experience: {exp}

    Generate a short conversation (3–5 turns) where:
    - Recruiter asks about interest
    - Candidate responds realistically

    Then return ONLY JSON:

    {{
      "interest_score": (0-100),
      "summary": "short reason"
    }}

    Rules:
    - High enthusiasm → 80-100
    - Neutral → 50-70
    - Low → 0-40
    - No extra text
    """

    data = {
        "model": "llama-3.1-8b-instant",
        "messages": [{"role": "user", "content": prompt}]
    }

    response = requests.post(url, headers=headers, json=data)
    result = response.json()

    content = result["choices"][0]["message"]["content"]

    try:
        json_str = re.search(r'\{.*\}', content, re.DOTALL).group()
        return json.loads(json_str)
    except:
        return {
            "interest_score": 50,
            "summary": "Neutral interest"
        }