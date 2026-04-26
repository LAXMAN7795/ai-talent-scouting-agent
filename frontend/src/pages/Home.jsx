import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      {/* Glow Background */}
      <div style={styles.blur}></div>

      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={{ margin: 0 }}>AI Recruiter</h2>
      </div>

      {/* HERO SECTION */}
      <div style={styles.hero}>
        <h1 style={styles.title}>AI Talent Scouting Agent</h1>

        <p style={styles.subtitle}>
          Smart recruitment powered by AI — Match, Engage, and Hire faster 🚀
        </p>

        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => navigate("/recruiter-login")}>
            Recruiter Login
          </button>

          <button style={styles.buttonAlt} onClick={() => navigate("/candidate-login")}>
            Candidate Login
          </button>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div style={styles.featuresSection}>
        <h2 style={styles.featureTitle}>Powerful Features</h2>

        <div style={styles.grid}>

          <div style={styles.card}>
            <h3>📄 JD Parsing</h3>
            <p>Automatically extracts skills, roles, and experience from job descriptions.</p>
          </div>

          <div style={styles.card}>
            <h3>📊 Candidate Ranking</h3>
            <p>Ranks candidates based on skill match, projects, and coding ability.</p>
          </div>

          <div style={styles.card}>
            <h3>🤖 Interest Detection</h3>
            <p>AI simulates conversations to estimate candidate interest levels.</p>
          </div>

          <div style={styles.card}>
            <h3>📧 Email Automation</h3>
            <p>Automatically sends shortlist notifications to selected candidates.</p>
          </div>

          <div style={styles.card}>
            <h3>🔍 Explainable AI</h3>
            <p>Provides clear reasoning behind every candidate match.</p>
          </div>

          <div style={styles.card}>
            <h3>⚡ Fast Processing</h3>
            <p>Instant evaluation and ranking for quick hiring decisions.</p>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        <p>© 2026 AI Talent Scouting Agent | Built for Hackathon 🚀</p>
      </div>

    </div>
  );
}

export default Home;


/* ================== STYLES ================== */

const styles = {
  container: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #1e293b, #020617)",
    color: "white",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    position: "relative",
    overflow: "hidden"
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
    opacity: 0.4,
    zIndex: 0
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    marginBottom: "40px",
    position: "relative",
    zIndex: 1
  },

  navBtn: {
    padding: "8px 16px",
    background: "#2563eb",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer"
  },

  hero: {
    textAlign: "center",
    marginBottom: "60px",
    position: "relative",
    zIndex: 1
  },

  title: {
    fontSize: "3rem",
    fontWeight: "bold"
  },

  subtitle: {
    fontSize: "1.2rem",
    color: "#94a3b8",
    marginTop: "10px"
  },

  buttonContainer: {
    marginTop: "25px"
  },

  button: {
    padding: "12px 28px",
    margin: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  },

  buttonAlt: {
    padding: "12px 28px",
    margin: "10px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  },

  featuresSection: {
    maxWidth: "1100px",
    margin: "0 auto",
    textAlign: "center",
    position: "relative",
    zIndex: 1
  },

  featureTitle: {
    fontSize: "2rem",
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",   // 🔥 FIXED 3x2 layout
    gap: "25px"
  },

  card: {
    background: "rgba(255, 255, 255, 0.05)",
    padding: "20px",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "0.3s"
  },

  footer: {
    marginTop: "60px",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "14px",
    position: "relative",
    zIndex: 1
  }
};