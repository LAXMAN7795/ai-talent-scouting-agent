import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JDPage() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!description) {
      alert("Please enter job description");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/create-jd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ description })
      });

      const data = await res.json();
      console.log("JD RESPONSE:", data);

      const jdId = data.jd_id || data.id;

      if (!jdId) {
        alert("JD ID not received from backend");
        return;
      }

      // ✅ Redirect to dashboard after creation
      navigate("/recruiter/dashboard");

    } catch (err) {
      console.error(err);
      alert("Error creating JD");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.blur}></div>

      <div style={styles.card}>
        <h2>Create Job Description</h2>

        <textarea
          placeholder="Enter job description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />

        <button style={styles.button} onClick={handleSubmit}>
          {loading ? "Creating..." : "Create JD"}
        </button>
      </div>
    </div>
  );
}

export default JDPage;


/* ================== STYLES ================== */

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #1e293b, #020617)",
    color: "white",
    fontFamily: "Arial",
    position: "relative"
  },

  blur: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "#2563eb",
    filter: "blur(120px)",
    top: "20%",
    left: "50%",
    transform: "translateX(-50%)",
    opacity: 0.4
  },

  card: {
    width: "600px",
    padding: "30px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.1)",
    zIndex: 1,
    textAlign: "center"
  },

  textarea: {
    width: "100%",
    height: "120px",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "white"
  },

  button: {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    background: "#2563eb",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  }
};