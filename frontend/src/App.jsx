import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import InterviewQuestions from "./pages/InterviewQuestions";
import ResumeUpload from "./pages/ResumeUpload";
import SpeechAnalysis from "./pages/SpeechAnalysis";
import TextInterview from "./pages/TextInterview";
import VideoRecording from "./pages/VideoRecording";
import Navbar from "./components/Navbar"; // Navbar stays fixed
import Footer from "./pages/Footer";
import LevelPractice from "./components/LevelPractice";
import Forum from "./pages/Forum";
import LevelQuestions from "./pages/LevelQuestions";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ScheduleInterview from "./pages/ScheduleInterview";
import Testimonials from "./components/Testimonials";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Default home page */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview-questions" element={<InterviewQuestions />} />
          <Route path="/resume-upload" element={<ResumeUpload />} />
          <Route path="/speech-analysis" element={<SpeechAnalysis />} />
          <Route path="/text-interview" element={<TextInterview />} />
          <Route path="/video-recording" element={<VideoRecording />} />
          <Route path="/level-practice" element={<LevelPractice />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/level-practice/:level" element={<LevelQuestions />} />
          <Route path="/testimonials" element={<Testimonials/> }/>
          <Route path="*" element={<Navigate to="/" />} />{" "}
          {/* Redirect invalid routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
