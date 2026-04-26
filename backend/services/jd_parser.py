import requests
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def parse_jd(jd_text):
    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    prompt = f"""
    Extract structured information from this job description.

    STRICT RULES:
    - Return ONLY valid JSON
    - No explanation
    - No markdown

    Format:
    {{
      "skills": [],
      "experience_required": true/false,
      "role": ""
    }}

    JD:
    {jd_text}
    """

    data = {
        "model": "llama-3.1-8b-instant",
        "messages": [{"role": "user", "content": prompt}]
    }

    response = requests.post(url, headers=headers, json=data)
    result = response.json()

    # 🔥 Extract only the content
    content = result["choices"][0]["message"]["content"]

    # 🔥 Convert string → JSON safely
    try:
        json_str = re.search(r'\{.*\}', content, re.DOTALL).group()
        return json.loads(json_str)
    except:
        return {
            "skills": [],
            "experience_required": False,
            "role": "Unknown"
        }