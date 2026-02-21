import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include"
      });
      const data = await response.json();
      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        setError(data.detail || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Is the backend running?");
    }
  };

  return (
    <div className="min-h-screen bg-[#03050c] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] size-[500px] bg-blue-600/10 blur-[100px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-8 rounded-[24px] shadow-2xl z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <ShieldCheck className="text-indigo-400" size={24} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">Create Account</h1>
          <p className="text-slate-500 text-[10px] mt-2 uppercase tracking-[0.2em] font-bold">Developer Access Tier</p>
        </div>

        {error && <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                required
                className="w-full bg-[#03050c] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-indigo-500 outline-none transition-all text-white"
                placeholder="johndoe"
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="email" required
                className="w-full bg-[#03050c] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-indigo-500 outline-none transition-all text-white"
                placeholder="dev@example.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="password" required
                className="w-full bg-[#03050c] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-indigo-500 outline-none transition-all text-white"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button className="w-full bg-indigo-600 text-white font-black text-xs py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all group">
            INITIALIZE SYSTEM <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        <Link to='/login'> <p className="text-center text-slate-500 text-[10px] mt-6 font-bold uppercase cursor-pointer hover:text-white transition-colors">
                  Alredy have an account? <span className="text-indigo-400">Login</span>
                </p></Link>
      </motion.div>
    </div>
  );
};

export default Register;