import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ApplyPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const jd_id = state?.jd_id;

  const [form, setForm] = useState({
    name: "",
    email: "",
    linkedin: "",
    github: "",
    resume_file: null
  });

  const [codingProfiles, setCodingProfiles] = useState([
    { platform: "leetcode", solved: "", link: "" }
  ]);

  const [loading, setLoading] = useState(false);

  // Handle basic inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle coding platforms
  const handleCodingChange = (index, field, value) => {
    const updated = [...codingProfiles];
    updated[index][field] = value;
    setCodingProfiles(updated);
  };

  const addPlatform = () => {
    setCodingProfiles([
      ...codingProfiles,
      { platform: "", solved: "", link: "" }
    ]);
  };

  // 🔥 FINAL SUBMIT (MATCHES YOUR BACKEND)
  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert("Name and Email required");
      return;
    }

    if (!form.resume_file) {
      alert("Please upload resume PDF");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("linkedin", form.linkedin);
      formData.append("github", form.github);

      formData.append("jd_id", jd_id);   // 🔥 ADD THIS


      // ✅ Convert coding platforms → string
      const platformsString = codingProfiles
        .filter(p => p.platform && p.solved)
        .map(p => `${p.platform}:${p.solved}`)
        .join(",");

      // ✅ Convert coding links → string
      const linksString = codingProfiles
        .filter(p => p.platform && p.link)
        .map(p => `${p.platform}:${p.link}`)
        .join(",");

      formData.append("coding_platforms", platformsString);
      formData.append("coding_links", linksString);

      // 📄 Resume file
      formData.append("resume", form.resume_file);

      const res = await fetch("http://127.0.0.1:8000/apply", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      console.log("APPLY RESPONSE:", data);

      navigate("/candidate/success");

    } catch (err) {
      console.error(err);
      alert("Error applying");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.blur}></div>

      <div style={styles.card}>
        <h2>Apply for Job</h2>

        {/* Basic Inputs */}
        <input name="name" placeholder="Name" style={styles.input} onChange={handleChange} />
        <input name="email" placeholder="Email" style={styles.input} onChange={handleChange} />
        <input name="linkedin" placeholder="LinkedIn URL" style={styles.input} onChange={handleChange} />
        <input name="github" placeholder="GitHub URL" style={styles.input} onChange={handleChange} />

        {/* Resume Upload */}
        <input
          type="file"
          accept=".pdf"
          style={styles.input}
          onChange={(e) =>
            setForm({ ...form, resume_file: e.target.files[0] })
          }
        />

        {/* Coding Platforms */}
        <h3 style={{ marginTop: "20px" }}>Coding Profiles</h3>

        {codingProfiles.map((p, i) => (
          <div key={i} style={styles.row}>
            <input
              placeholder="Platform (leetcode, hackerrank)"
              style={styles.smallInput}
              onChange={(e) => handleCodingChange(i, "platform", e.target.value)}
            />

            <input
              placeholder="Solved"
              style={styles.smallInput}
              onChange={(e) => handleCodingChange(i, "solved", e.target.value)}
            />

            <input
              placeholder="Profile Link"
              style={styles.smallInput}
              onChange={(e) => handleCodingChange(i, "link", e.target.value)}
            />
          </div>
        ))}

        <button style={styles.addBtn} onClick={addPlatform}>
          + Add Platform
        </button>

        {/* Submit */}
        <button style={styles.button} onClick={handleSubmit}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}

export default ApplyPage;


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
    background: "#16a34a",
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
    zIndex: 1
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "white"
  },

  row: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px"
  },

  smallInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "white"
  },

  addBtn: {
    marginTop: "10px",
    background: "#334155",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  button: {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    background: "#16a34a",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  }
};