import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE from "../config";  // adjust path if needed



function CandidateJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/jd/all`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <h1>Available Jobs</h1>

      <div style={styles.grid}>
        {jobs.map((job) => (
          <div key={job.id} style={styles.card}>
            <h3>{job.parsed.role}</h3>

            <p>{job.description.slice(0, 100)}...</p>

            <button
              style={styles.button}
              onClick={() =>
                navigate(`/candidate/jd/${job.id}`)
              }
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandidateJobs;

const styles = {
  container: {
    padding: "40px",
    color: "white",
    background: "#020617",
    minHeight: "100vh"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px"
  },

  card: {
    padding: "20px",
    background: "#1e293b",
    borderRadius: "10px"
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#16a34a",
    border: "none",
    color: "white",
    cursor: "pointer"
  }
};