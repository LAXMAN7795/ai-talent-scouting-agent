import requests
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def parse_resume(resume_text):
    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    prompt = f"""
    Extract structured data from this resume.

    STRICT RULES:
    - Return ONLY valid JSON
    - No explanation

    Format:
    {{
      "skills": [],
      "projects": [],
      "experience": "Fresher/Experienced"
    }}

    Resume:
    {resume_text}
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
            "skills": [],
            "projects": [],
            "experience": "Unknown"
        }