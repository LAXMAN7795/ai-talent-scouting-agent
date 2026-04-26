import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.blur}></div>

      <div style={styles.card}>
        <div style={styles.icon}>✅</div>

        <h2 style={styles.title}>Application Submitted!</h2>

        <p style={styles.text}>
          Your profile has been successfully submitted.
        </p>

        <p style={styles.subtext}>
          If shortlisted, you will receive an email regarding the next steps.
        </p>

        <div style={styles.buttons}>
          <button
            style={styles.button}
            onClick={() => navigate("/")}
          >
            Go Home
          </button>

          <button
            style={styles.buttonAlt}
            onClick={() => navigate("/candidate/apply")}
          >
            Apply Another
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;


/* ================== STYLES ================== */

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #1e293b, #020617)",
    fontFamily: "Arial",
    color: "white",
    position: "relative"
  },

  blur: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "#22c55e",
    filter: "blur(120px)",
    top: "20%",
    left: "50%",
    transform: "translateX(-50%)",
    opacity: 0.4
  },

  card: {
    width: "400px",
    padding: "30px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.1)",
    textAlign: "center",
    zIndex: 1
  },

  icon: {
    fontSize: "40px",
    marginBottom: "10px"
  },

  title: {
    marginBottom: "10px"
  },

  text: {
    fontSize: "16px",
    marginBottom: "10px"
  },

  subtext: {
    fontSize: "14px",
    color: "#94a3b8",
    marginBottom: "20px"
  },

  buttons: {
    display: "flex",
    gap: "10px",
    justifyContent: "center"
  },

  button: {
    padding: "10px 15px",
    background: "#2563eb",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer"
  },

  buttonAlt: {
    padding: "10px 15px",
    background: "#16a34a",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer"
  }
};