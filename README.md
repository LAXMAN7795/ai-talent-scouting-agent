# 🚀 AI Talent Scouting Agent

An AI-powered recruitment platform that automates candidate screening, ranking, and shortlisting using intelligent resume parsing and scoring techniques.

🌐 Live Demo  
Frontend: https://ai-talent-scouting-agent.pages.dev/  
Backend API: https://ai-talent-scouting-agent-geld.onrender.com/  
Demo Video: https://drive.google.com/file/d/1Oh-IvV9HQDYs-ufx-0QYjTwora4Obxo4/view?usp=sharing  

📌 Problem Statement  
Recruiters spend a significant amount of time manually reviewing resumes and shortlisting candidates.  
This project solves that by automatically analyzing resumes, matching candidates with job descriptions, ranking candidates intelligently, and providing automated shortlisting.

💡 Features  

👨‍💼 Recruiter Module  
- Create Job Descriptions (JD)  
- AI-based JD parsing  
- Analyze candidates after applications  
- View ranked & shortlisted candidates  
- Automated email notifications  

👨‍💻 Candidate Module  
- View available job openings  
- Apply with resume (PDF upload)  
- Add coding profiles (LeetCode, HackerRank)  

🤖 AI Capabilities  
- Resume parsing using NLP techniques  
- Skill matching with semantic mapping  
- Candidate scoring system  
- AI-based interest detection  
- Explainable results (why candidate is selected)  

🧠 Tech Stack  

Frontend  
- React (Vite)  

Backend  
- FastAPI (Python)  

Database  
- MongoDB Atlas (Cloud)  

AI / Logic  
- Resume Parsing Engine  
- Skill Matching Algorithm  
- Scoring System  
- Explainability Engine  

Deployment  
- Frontend: Cloudflare Pages  
- Backend: Render  
- Database: MongoDB Atlas  

🏗️ System Architecture  

User (Recruiter / Candidate)  
        ↓  
Frontend (React - Cloudflare Pages)  
        ↓  
Backend API (FastAPI - Render)  
        ↓  
Database (MongoDB Atlas)  
        ↓  
AI Services (Parsing + Scoring + Matching)  

📌 Data Flow  
- Recruiter creates JD → stored in DB  
- Candidate applies → resume parsed  
- AI extracts skills & projects  
- Scoring engine evaluates candidate  
- Ranking API returns shortlist  
- Email service sends notifications  

⚙️ Project Structure  

AI_Talent_Scout/  
├── frontend/  
├── backend/  
├── .gitignore

🔄 Workflow  

1. Recruiter creates a Job Description  
2. Candidate views job and applies  
3. Resume is parsed using AI  
4. Skills & projects are extracted  
5. Candidate is scored based on skills, projects, experience, and coding performance  
6. AI ranks and shortlists candidates  
7. Email notifications are sent  

📊 Scoring Logic  

Candidates are evaluated using:  
- Skill Match Score  
- Project Relevance  
- Experience Score  
- Coding Strength  
- AI-based Interest Score  

Final Score = 70% Match Score + 30% Interest Score  

✨ Key Highlights  
- End-to-End AI Recruitment System  
- Automated candidate ranking  
- Email automation for shortlisting  
- Explainable AI decisions  
- Fully deployed full-stack application  

🚀 How to Run Locally  

1. Clone Repository  
git clone https://github.com/LAXMAN7795/ai-talent-scouting-agent.git  
cd ai-talent-scouting-agent  

2. Backend Setup  
cd backend  
pip install -r requirements.txt  
uvicorn main:app --reload  

3. Frontend Setup  
cd frontend  
npm install  
npm run dev  

🔐 Environment Variables (Backend)  

Create .env file inside backend:  

MONGO_URI=your_mongodb_uri  
GROQ_API_KEY=your_api_key  
EMAIL=your_email  
EMAIL_PASSWORD=your_app_password  

🧪 Testing Flow  

1. Create Job Description (Recruiter)  
2. Apply as Candidate  
3. Upload resume  
4. Analyze candidates  
5. View shortlist results  

📬 Future Improvements  
- User authentication (JWT)  
- Admin dashboard with analytics  
- Resume score visualization  
- Multi-role access system  
- Advanced AI matching  

👨‍💻 Author  

Laxman Sannu Gouda  
LinkedIn: https://www.linkedin.com/in/laxman-gouda/  

⭐ Support  

If you found this project useful, give it a star on GitHub.  

🎯 Final Note  

This project demonstrates how AI can be used to automate recruitment, making hiring faster, smarter, and more efficient.
