import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RecruiterLogin from "./pages/RecruiterLogin";
import CandidateLogin from "./pages/CandidateLogin";
import JDPage from "./pages/JDPage";
import ResultsPage from "./pages/ResultsPage";
import ApplyPage from "./pages/ApplyPage";
import SuccessPage from "./pages/SuccessPage";
import CandidateJobs from "./pages/CandidateJobs";
import JDDetails from "./pages/JDDetails";
import RecruiterDashboard from "./pages/RecruiterDashboard";


function App() {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* Recruiter */}
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/create-jd" element={<JDPage />} />
        <Route path="/recruiter/results/:id" element={<ResultsPage />} />

        {/* Candidate */}
        <Route path="/candidate-login" element={<CandidateLogin />} />
        <Route path="/candidate/jobs" element={<CandidateJobs />} />
        <Route path="/candidate/jd/:id" element={<JDDetails />} />
        <Route path="/candidate/apply" element={<ApplyPage />} />
        <Route path="/candidate/success" element={<SuccessPage />} />

      </Routes>
    </Router>
  );
}

export default App;