import React from 'react';
import { 
  LayoutDashboard, Key, FileText, Settings, HelpCircle, 
  Plus, Info, MoreHorizontal, ArrowUpCircle 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";

const usageData = [
  { name: 'Mon', usage: 400 }, { name: 'Tue', usage: 1100 },
  { name: 'Wed', usage: 800 }, { name: 'Thu', usage: 950 },
  { name: 'Fri', usage: 600 }, { name: 'Sat', usage: 1300 },
  { name: 'Sun', usage: 900 },
];

const DeveloperDashboard = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    // Added overscroll-none to prevent the white bounce-back effect
    <div className="flex min-h-screen w-full bg-[#03050c] text-slate-100 font-sans selection:bg-indigo-500/30 overscroll-none">
      
      {/* FIXED DARK BASE LAYER - Ensures no white shows if Lenis overscrolls */}
      <div className="fixed inset-0 bg-[#03050c] -z-50" />

      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] size-[600px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] size-[600px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      {/* SIDEBAR - Border Radius decreased to 24px */}
      <aside className="hidden lg:flex sticky top-0 h-screen w-72 flex-col p-5 z-20">
        <div className="flex-1 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[24px] p-5 flex flex-col gap-6 shadow-2xl">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/5">
            <div className="size-9 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px]">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" className="rounded-full bg-[#03050c]" alt="avatar" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">Alex Rivera</span>
              <span className="text-[9px] text-indigo-400 font-black tracking-widest uppercase">Pro Dev</span>
            </div>
          </div>

          <nav className="space-y-1">
            <NavItem icon={<LayoutDashboard size={16}/>} label="Overview" active />
            <NavItem icon={<Key size={16}/>} label="API Keys" />
            <NavItem icon={<FileText size={16}/>} label="Documentation" />
            <div className="h-px bg-white/5 mx-2 my-4" />
            <NavItem icon={<Settings size={16}/>} label="Settings" />
            <NavItem icon={<HelpCircle size={16}/>} label="Help Center" />
          </nav>

          <div className="mt-auto p-4 rounded-[16px] bg-indigo-500/5 border border-indigo-500/10 relative overflow-hidden group">
            <p className="text-[9px] font-bold text-indigo-300 uppercase mb-2">Usage</p>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ duration: 1.5 }} className="h-full bg-indigo-500" />
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 lg:p-8 z-10 relative">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* TOP BAR */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-2">
            <div>
              <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black text-white tracking-tighter">
                System Dashboard
              </motion.h1>
              <p className="text-slate-500 text-xs font-medium">v2.0.4 • All systems nominal</p>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-[12px] font-bold text-xs hover:bg-slate-200 transition-colors">
              <Plus size={16} /> New Key
            </motion.button>
          </header>

          {/* BENTO GRID STATS - Border Radius decreased to 16px */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <BentoStat label="Latency" value="24ms" color="text-cyan-400" />
            <BentoStat label="Success" value="99.9%" color="text-emerald-400" />
            <BentoStat label="Keys" value="12" color="text-indigo-400" />
            <BentoStat label="Active" value="1,042" color="text-purple-400" />
          </div>

          {/* MAIN CHART - Border Radius decreased to 24px */}
          <section className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[24px] p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-indigo-500 animate-ping" /> Traffic Analysis
              </h2>
              <div className="flex bg-[#03050c] p-1 rounded-lg border border-white/5">
                {['1H', '24H', '7D'].map((t) => (
                  <button key={t} className={`px-4 py-1.5 text-[10px] font-black rounded-md transition-all ${t === '24H' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-white'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData}>
                  <defs>
                    <linearGradient id="cyberGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="0" vertical={false} stroke="#ffffff05" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 700}} />
                  <Tooltip contentStyle={{ backgroundColor: '#03050c', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="usage" stroke="#6366f1" strokeWidth={3} fill="url(#cyberGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* TABLE AREA - Border Radius decreased to 24px */}
          <section className="bg-white/[0.01] border border-white/5 rounded-[24px] overflow-hidden backdrop-blur-md">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-bold text-sm">Applications</h3>
              <MoreHorizontal className="text-slate-600 cursor-pointer" size={18} />
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                    <tr className="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-white/[0.01]">
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Uptime</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <DashboardRow name="Vision_AI" status="Healthy" time="99.9%" />
                    <DashboardRow name="Cloud_Sync" status="Healthy" time="98.4%" />
                    <DashboardRow name="Legacy_Relay" status="Maintenance" time="74.2%" />
                  </tbody>
               </table>
            </div>
          </section>
        </div>

        {/* Floating Scroll Button - Adjusted radius to 12px */}
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 size-12 rounded-xl bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 z-50"
        >
          <ArrowUpCircle size={20} />
        </button>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }) => (
  <button className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-bold text-xs ${active ? 'bg-white text-black shadow-lg' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
    {icon} <span>{label}</span>
  </button>
);

const BentoStat = ({ label, value, color }) => (
  <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[16px] p-5 hover:bg-white/[0.04] transition-colors group">
    <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1">{label}</p>
    <h4 className={`text-xl font-black ${color}`}>{value}</h4>
  </div>
);

const DashboardRow = ({ name, status, time }) => (
  <tr className="hover:bg-white/[0.01] transition-colors group">
    <td className="px-6 py-4 font-bold text-xs text-slate-300">{name}</td>
    <td className="px-6 py-4">
      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase border ${status === 'Healthy' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10' : 'bg-orange-500/5 text-orange-400 border-orange-500/10'}`}>
        <div className={`size-1 rounded-full ${status === 'Healthy' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-orange-400'}`} />
        {status}
      </div>
    </td>
    <td className="px-6 py-4 text-right text-[10px] font-bold text-slate-500">{time}</td>
  </tr>
);

export default DeveloperDashboard;