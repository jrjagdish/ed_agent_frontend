import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight} from "lucide-react";
import { Link } from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://edagent-production-74a4.up.railway.app/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include"
    });
    if (response.ok) window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-[#03050c] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-indigo-600/10 blur-[100px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-8 rounded-[24px] shadow-2xl z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white tracking-tighter">Welcome Back</h1>
          <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest font-bold">Secure Access Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="email" 
                className="w-full bg-[#03050c] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-indigo-500 outline-none transition-all text-white"
                placeholder="name@company.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="password" 
                className="w-full bg-[#03050c] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-indigo-500 outline-none transition-all text-white"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button className="w-full bg-white text-black font-black text-xs py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-500 hover:text-white transition-all group">
            AUTHORIZE <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        
       <Link to='/register'> <p className="text-center text-slate-500 text-[10px] mt-6 font-bold uppercase cursor-pointer hover:text-white transition-colors">
          Don't have an account? <span className="text-indigo-400">Register</span>
        </p></Link>
      </motion.div>
    </div>
  );
};

export default Login;
