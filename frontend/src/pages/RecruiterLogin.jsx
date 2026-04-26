import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RecruiterLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // 🔐 Hardcoded credentials
    if (username === "recruiter" && password === "123") {
      setError("");
      navigate("/recruiter/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      {/* Glow */}
      <div style={styles.blur}></div>

      {/* Login Card */}
      <div style={styles.card}>
        <h2 style={styles.title}>Recruiter Login</h2>

        <input
          type="text"
          placeholder="Username"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.hint}>
          Use: <b>recruiter / 123</b>
        </p>
      </div>
    </div>
  );
}

export default RecruiterLogin;


/* ================== STYLES ================== */

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at top, #1e293b, #020617)",
    fontFamily: "Arial, sans-serif",
    color: "white",
    position: "relative",
    overflow: "hidden"
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
    width: "350px",
    padding: "30px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.1)",
    textAlign: "center",
    zIndex: 1
  },

  title: {
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "white",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "#2563eb",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  },

  error: {
    color: "#ef4444",
    fontSize: "14px"
  },

  hint: {
    marginTop: "15px",
    fontSize: "13px",
    color: "#94a3b8"
  }
};