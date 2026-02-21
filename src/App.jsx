import Footer from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/home";
import DeveloperDashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
export default function Page() {
  const cleanPages = ["/dashboard", "/login", "/register"];
  const location = useLocation();
  const isDashboardPage = cleanPages.includes(location.pathname);
  return (
    <>
      <LenisScroll />
      {!isDashboardPage && <Navbar />}
      <main
        className={
          isDashboardPage ? "overflow-clip" : "px-6 md:px-16 lg:px-24 xl:px-32"
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DeveloperDashboard />} />
        </Routes>
      </main>
      {!isDashboardPage && <Footer />}
    </>
  );
}
