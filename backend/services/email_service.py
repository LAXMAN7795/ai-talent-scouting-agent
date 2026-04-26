import smtplib
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

load_dotenv()

EMAIL = os.getenv("EMAIL")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")


def send_shortlist_email(to_email, candidate_name, role):
    subject = "🎉 You are shortlisted!"

    body = f"""
Hi {candidate_name},

Congratulations! 🎉

You have been shortlisted for the role of {role}.

Our team will contact you soon with next steps.

Best regards,  
AI Recruitment Team
"""

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = EMAIL
    msg["To"] = to_email

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL, EMAIL_PASSWORD)
            server.send_message(msg)

        return True

    except Exception as e:
        print("Email error:", e)
        return False