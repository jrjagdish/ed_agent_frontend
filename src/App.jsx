import Footer from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route ,useLocation} from "react-router-dom";
import Home from "./pages/home";
import DeveloperDashboard from "./pages/dashboard";
export default function Page() {
    const location = useLocation();
    const isDashboardPage = location.pathname === "/dashboard";
  return (
    <>
      <LenisScroll />
      {!isDashboardPage && <Navbar />}
      <main className={isDashboardPage ? "overflow-clip" : "px-6 md:px-16 lg:px-24 xl:px-32"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DeveloperDashboard />} />
        </Routes>
      </main>
      {!isDashboardPage && <Footer />}
    </>
  );
}
