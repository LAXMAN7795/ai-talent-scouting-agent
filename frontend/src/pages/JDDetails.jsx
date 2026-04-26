import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE from "../config";



function JDDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  useEffect(() => {
    console.log("Fetching JD:", id);

    fetch(`${API_BASE}/jd/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("JD DATA:", data);
        setJob(data);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!job || job.error) {
    return (
      <p style={{ color: "white", padding: "40px" }}>
        Loading job...
      </p>
    );
  }

  return (
    <div style={styles.container}>
      <h1>{job.parsed.role}</h1>

      <p style={{ marginTop: "10px" }}>
        {job.description}
      </p>

      <h3 style={{ marginTop: "20px" }}>Skills Required:</h3>
      <ul>
        {job.parsed.skills.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <button
        style={styles.button}
        onClick={() =>
          navigate("/candidate/apply", {
            state: { jd_id: job.id }
          })
        }
      >
        Apply Now
      </button>
    </div>
  );
}

export default JDDetails;

const styles = {
  container: {
    padding: "40px",
    color: "white",
    background: "#020617",
    minHeight: "100vh"
  },

  button: {
    marginTop: "20px",
    padding: "12px",
    background: "#16a34a",
    border: "none",
    color: "white",
    cursor: "pointer"
  }
};