import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE from "../config";



function ResultsPage() {
  const { id } = useParams();
  const jd_id = id;

  const [candidates, setCandidates] = useState(null); // 🔥 start as null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jd_id) {
      console.error("JD ID missing!");
      setLoading(false);
      return;
    }

    let isMounted = true; // 🔥 prevent double-render override

    console.log("Fetching results for JD:", jd_id);

    fetch(`${API_BASE}/rank/${jd_id}`)
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;

        console.log("API RESPONSE:", data);

        const result = data.shortlisted || [];

        setCandidates(result);   // ✅ set once
        setLoading(false);
      })
      .catch(err => {
        if (!isMounted) return;
        console.error("API ERROR:", err);
        setCandidates([]);
        setLoading(false);
      });

    return () => {
      isMounted = false; // 🔥 cleanup
    };
  }, [jd_id]);

  // -------------------------
  // LOADING STATE
  // -------------------------
  if (loading || candidates === null) {
    return (
      <div style={styles.container}>
        <h2 style={styles.loading}>Analyzing candidates...</h2>
      </div>
    );
  }

  // -------------------------
  // NO DATA STATE
  // -------------------------
  if (candidates.length === 0) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Shortlisted Candidates</h1>
        <p style={styles.loading}>No candidates found</p>
      </div>
    );
  }

  // -------------------------
  // SHOW RESULTS
  // -------------------------
  return (
    <div style={styles.container}>
      <div style={styles.blur}></div>

      <h1 style={styles.title}>Shortlisted Candidates</h1>

      <div style={styles.grid}>
        {candidates.map((c, index) => (
          <div key={index} style={styles.card}>
            
            {/* Header */}
            <div style={styles.header}>
              <h3>{c.name}</h3>
              <span style={getBadgeStyle(c.label)}>
                {c.label}
              </span>
            </div>

            {/* Scores */}
            <div style={styles.scores}>
              <p>Match: {c.score}</p>
              <p>Interest: {c.interest_score}</p>
              <p><b>Final: {c.combined_score}</b></p>
            </div>

            {/* Explanation */}
            <div style={styles.explanation}>
              <p><b>Skills:</b> {c.explanation?.matched_skills?.join(", ")}</p>
              <p><b>Project:</b> {c.explanation?.project_highlight}</p>
              <p><b>Coding:</b> {c.explanation?.coding_strength}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsPage;


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

  blur: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "#2563eb",
    filter: "blur(120px)",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    opacity: 0.4
  },

  title: {
    textAlign: "center",
    marginBottom: "30px"
  },

  loading: {
    textAlign: "center",
    marginTop: "50px",
    color: "#94a3b8"
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
    border: "1px solid rgba(255,255,255,0.1)"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px"
  },

  scores: {
    marginBottom: "10px",
    color: "#cbd5f5"
  },

  explanation: {
    fontSize: "14px",
    color: "#94a3b8"
  }
};


/* ================== BADGE ================== */

function getBadgeStyle(label) {
  if (label === "High Match") {
    return {
      background: "#16a34a",
      padding: "5px 10px",
      borderRadius: "6px",
      fontSize: "12px"
    };
  }

  if (label === "Moderate Match") {
    return {
      background: "#f59e0b",
      padding: "5px 10px",
      borderRadius: "6px",
      fontSize: "12px"
    };
  }

  return {
    background: "#ef4444",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "12px"
  };
}