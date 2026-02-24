import React, { useState, useEffect } from "react";
import { Key, Trash2, ChevronLeft, Loader2, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ApiKeysPage = () => {
  const [keys, setKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetching logic - matches @app.get("/api_keys/")
  const fetchKeys = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://ed-agent.onrender.com/api_keys/", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        // Since backend returns a list directly: [{}, {}]
        setKeys(data); 
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  // 2. Deletion logic - matches @app.delete("/api_key/{key_id}")
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to deactivate this key?")) return;

    try {
      const response = await fetch(`https://ed-agent.onrender.com/api_key/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        // Remove from UI state
        setKeys(keys.filter((k) => k.id !== id));
      } else {
        const errorData = await response.json();
        alert(errorData.detail || "Failed to delete");
      }
    } catch (err) {
      alert("Server connection error");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#03050c] text-slate-100 font-sans p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-12">
          <a href="/dashboard" className="inline-flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 hover:text-indigo-300 transition-all">
            <ChevronLeft size={14} /> Back to Dashboard
          </a>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            Access Keys
          </h1>
        </header>

        <div className="bg-white/[0.01] backdrop-blur-2xl border border-white/5 rounded-[24px] overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Key Name</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Last Used</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {keys.map((item) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id} 
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="size-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                        <span className="text-xs font-bold text-white uppercase tracking-tight">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-medium text-slate-500 flex items-center gap-2">
                        <Calendar size={12} />
                        {item.last_used_at ? new Date(item.last_used_at).toLocaleDateString() : "Never Used"}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-3 rounded-xl bg-transparent border border-white/5 text-slate-500 hover:border-red-500/50 hover:text-red-500 hover:bg-red-500/5 transition-all"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {isLoading && (
            <div className="py-20 flex justify-center">
              <Loader2 className="animate-spin text-indigo-600" size={32} />
            </div>
          )}

          {!isLoading && keys.length === 0 && (
            <div className="py-20 text-center text-slate-600 font-bold uppercase text-[10px] tracking-widest">
              Zero active keys found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiKeysPage;