import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/jd/all")
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.container}>

      {/* 🔹 Top Bar */}
      <div style={styles.topBar}>
        <button
          style={styles.homeBtn}
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>

      {/* 🔹 Title */}
      <h1 style={styles.title}>Recruiter Dashboard</h1>

      {/* 🔹 Create JD Button */}
      <button
        style={styles.createBtn}
        onClick={() => navigate("/recruiter/create-jd")}
      >
        + Create New JD
      </button>

      {/* 🔹 Jobs Grid */}
      <div style={styles.grid}>
        {jobs.length === 0 ? (
          <p style={styles.empty}>No Job Descriptions found</p>
        ) : (
          jobs.map(job => (
            <div key={job.id} style={styles.card}>

              <h3 style={styles.role}>
                {job.parsed?.role || "Role"}
              </h3>

              <p style={styles.desc}>
                {job.description?.slice(0, 120)}...
              </p>

              <button
                style={styles.analyzeBtn}
                onClick={() =>
                  navigate(`/recruiter/results/${job.id}`)
                }
              >
                Analyze Candidates
              </button>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecruiterDashboard;





/* ================== STYLES ================== */

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "radial-gradient(circle at top, #1e293b, #020617)",
    color: "white",
    fontFamily: "Arial, sans-serif",
    position: "relative"
  },

  /* 🔹 Top Right Bar */
  topBar: {
    position: "absolute",
    top: "20px",
    right: "30px"
  },

  homeBtn: {
    padding: "10px 18px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s"
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2rem"
  },

  createBtn: {
    display: "block",
    margin: "0 auto 30px",
    padding: "12px 20px",
    background: "#22c55e",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px"
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "0.3s"
  },

  role: {
    marginBottom: "10px",
    color: "#38bdf8"
  },

  desc: {
    fontSize: "14px",
    color: "#cbd5f5",
    marginBottom: "15px"
  },

  analyzeBtn: {
    padding: "10px",
    background: "#f59e0b",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold"
  },

  empty: {
    gridColumn: "span 3",
    textAlign: "center",
    color: "#94a3b8"
  }
};