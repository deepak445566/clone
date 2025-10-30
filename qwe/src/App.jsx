import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import About from "./components/About";
import Courses from "./components/Courses";
import Work from "./components/Work";
import Trusted from "./components/Trusted";
import Skiper from "./components/Skiper";
import Achievement from "./components/Achievement";
import Footer from "./components/Footer";
import Detailed from "./pages/Detailed";
import Review from "./components/Review";
import Marque from "./components/Marque";
import Team from "./components/Team";
import OwnerLogin from "./pages/owner/OwnerLogin";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import UserSearch from "./pages/user/UserSearch";
import CoursesPage from "./pages/user/CoursesPage";
import Contact from "./pages/user/Contact";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('ownerToken');
  return token ? children : <Navigate to="/owner/login" />;
};

function App() {
  return (
    <>
      {/* Conditional Navbar - Don't show on certificate pages and contact */}
      <Routes>
        <Route path="/owner/*" element={null} />
        <Route path="/certificate/*" element={null} />
        <Route path="/contact" element={null} />
        <Route path="*" element={<Navbar />} />
      </Routes>

      {/* Routes */}
      <Routes>
        {/* Main Website Routes */}
        <Route
          path="/"
          element={
            <>  
              <Marque/>
              <Slider />
              <About />
              <Courses />
              <Work />
              <Trusted />
              <Skiper />
              <Review/>
              <Achievement />
              <Team/>
            </>
          }
        />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/detail/:id" element={<Detailed />} />

        {/* Certificate Management Routes */}
        <Route path="/certificate/search" element={<UserSearch />} />
        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route 
          path="/owner/dashboard" 
          element={
            <ProtectedRoute>
              <OwnerDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>

      {/* Conditional Footer - Don't show on certificate pages and contact */}
      <Routes>
        <Route path="/owner/*" element={null} />
        <Route path="/certificate/*" element={null} />
        <Route path="/contact" element={null} />
        <Route path="*" element={<Footer />} />
      </Routes>
    </>
  );
}

export default App;