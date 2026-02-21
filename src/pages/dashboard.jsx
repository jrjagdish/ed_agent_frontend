import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Key,
  FileText,
  Settings,
  LogOut,
  Plus,
  MoreHorizontal,
  ArrowUpCircle,
  Copy,
  Check,
  X,
  Menu,
  BarChart3,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const DeveloperDashboard = () => {
  const [usageStats, setUsageStats] = useState({
    current: 0,
    limit: 1000,
    total_spend: 0,
    history: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await fetch("https://edagent-production-74a4.up.railway.app/usage-stats", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUsageStats({
          current: data.total_requests,
          limit: data.limit,
          total_spend: data.total_spend,
          history: data.history,
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleCreateKey = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://edagent-production-74a4.up.railway.app/api_key?name=${newKeyName}`,
        { credentials: "include" },
      );
      const data = await response.json();
      if (response.ok) setGeneratedKey(data.api_key);
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const usagePercent = (usageStats.current / usageStats.limit) * 100;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#03050c] text-slate-100 font-sans">
      {/* MOBILE HEADER */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-white/[0.02] border-b border-white/5 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-indigo-500 flex items-center justify-center font-black text-[10px]">
            A
          </div>
          <span className="font-black text-sm tracking-tighter">
            AGENTIX.DEV
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-slate-400 hover:text-white"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* SIDEBAR (Desktop) & MOBILE MENU (Drawer) */}
      <AnimatePresence>
        {(isMobileMenuOpen || window.innerWidth > 1024) && (
          <motion.aside
            initial={window.innerWidth < 1024 ? { x: -300 } : {}}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`fixed lg:sticky top-0 left-0 h-screen w-72 flex-col p-5 z-[60] bg-[#03050c] lg:bg-transparent ${isMobileMenuOpen ? "flex" : "hidden lg:flex"}`}
          >
            <div className="flex-1 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[24px] p-5 flex flex-col shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center lg:hidden mb-4">
                <span className="font-bold text-xs text-slate-500 uppercase">
                  Navigation
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-500"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 mb-6">
                <div className="size-9 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px]">
                  <div className="w-full h-full rounded-full bg-[#03050c] flex items-center justify-center text-[10px] font-bold">
                    DEV
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase tracking-tight">
                    Admin Portal
                  </span>
                  <span className="text-[9px] text-indigo-400 font-black tracking-widest uppercase">
                    Verified
                  </span>
                </div>
              </div>

              <nav className="flex-1 space-y-1">
                <NavItem
                  icon={<LayoutDashboard size={16} />}
                  label="Overview"
                  active
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <NavItem
                  icon={<Key size={16} />}
                  label="API Keys"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <NavItem
                  icon={<FileText size={16} />}
                  label="Documentation"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <div className="h-px bg-white/5 mx-2 my-4" />
                <NavItem
                  icon={<Settings size={16} />}
                  label="Settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <NavItem
                  icon={<LogOut size={16} />}
                  label="Logout"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </nav>

              <div className="mt-auto pt-4 border-t border-white/5">
                <div className="p-4 rounded-[16px] bg-indigo-500/10 border border-indigo-500/10">
                  <p className="text-[9px] font-bold text-indigo-300 uppercase mb-1">
                    Monthly Usage
                  </p>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xl font-black">
                      {usageStats.current}
                    </span>
                    <span className="text-[10px] text-white/40 mb-1">
                      / {usageStats.limit}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(usagePercent, 100)}%` }}
                      className="h-full bg-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 lg:p-8 z-10 w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto space-y-6">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tighter uppercase">
                System Dashboard
              </h1>
              <p className="text-slate-500 text-[10px] lg:text-xs font-bold uppercase tracking-widest">
                Real-time infrastructure monitoring
              </p>
            </div>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setGeneratedKey("");
                setNewKeyName("");
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-5 py-3 rounded-xl font-black text-[10px] hover:bg-indigo-500 hover:text-white transition-all shadow-xl"
            >
              <Plus size={14} /> NEW API KEY
            </button>
          </header>

          {/* STATS GRID - Responsive 1 to 4 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <BentoStat
              label="Total Requests"
              value={usageStats.current}
              color="text-indigo-400"
            />
            <BentoStat
              label="Monthly Spend"
              value={`$${usageStats.total_spend}`}
              color="text-emerald-400"
            />
            <BentoStat
              label="Token Limit"
              value={usageStats.limit}
              color="text-slate-500"
            />
            <BentoStat label="Latency" value="14ms" color="text-cyan-400" />
          </div>

          {/* CHART SECTION */}
          <section className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[24px] p-4 lg:p-6 shadow-2xl">
            <h2 className="text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-slate-400">
              <div className="size-1.5 rounded-full bg-indigo-500 animate-pulse" />{" "}
              Traffic Analysis
            </h2>
            <div className="h-[250px] lg:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageStats.history}>
                  <defs>
                    <linearGradient
                      id="cyberGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#ffffff05"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#475569", fontSize: 10, fontWeight: 700 }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#03050c",
                      border: "1px solid #1e293b",
                      borderRadius: "12px",
                      fontSize: "10px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="usage"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fill="url(#cyberGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        {/* Floating action for mobile back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="lg:hidden fixed bottom-6 right-6 size-12 rounded-full bg-white text-black shadow-2xl flex items-center justify-center z-50"
        >
          <ArrowUpCircle size={20} />
        </button>
      </main>

      {/* MODAL (Responsive) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-[#0a0c14] border border-white/10 p-6 lg:p-8 rounded-[32px] shadow-2xl"
            >
              <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tighter">
                Create API Key
              </h2>
              {!generatedKey ? (
                <form onSubmit={handleCreateKey} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest">
                      Key Name
                    </label>
                    <input
                      autoFocus
                      className="w-full bg-black border border-white/5 rounded-xl py-4 px-4 text-xs focus:border-indigo-500 outline-none text-white"
                      placeholder="e.g. Production_App"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      required
                    />
                  </div>
                  <button className="w-full bg-indigo-600 text-white font-black text-[10px] py-4 rounded-xl hover:bg-indigo-500 transition-all uppercase tracking-widest">
                    Generate
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl">
                    <p className="text-[9px] text-amber-500 font-black uppercase mb-3">
                      ⚠️ Copy now. Disappears on close.
                    </p>
                    <div className="flex items-center gap-2 bg-black p-3 rounded-xl border border-white/5">
                      <code className="text-[10px] text-indigo-300 flex-1 truncate">
                        {generatedKey}
                      </code>
                      <button
                        onClick={copyToClipboard}
                        className="text-slate-400 hover:text-white"
                      >
                        {copied ? (
                          <Check size={16} className="text-emerald-500" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full bg-white text-black font-black text-[10px] py-4 rounded-xl uppercase tracking-widest"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest ${active ? "bg-white text-black shadow-lg" : "text-slate-500 hover:bg-white/5 hover:text-white"}`}
  >
    {icon} <span>{label}</span>
  </button>
);

const BentoStat = ({ label, value, color }) => (
  <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[20px] p-5 hover:bg-white/[0.04] transition-colors shadow-lg">
    <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-2">
      {label}
    </p>
    <h4 className={`text-2xl font-black ${color} tracking-tighter`}>{value}</h4>
  </div>
);

export default DeveloperDashboard;
