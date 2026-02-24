import React, { useState, useEffect } from "react";
import { Key, Trash2, ChevronLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ApiKeysPage = () => {
  const [keys, setKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchKeys = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://ed-agent.onrender.com/api_keys", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        // Assuming your backend returns an array of objects: { id: 1, name: "...", key: "..." }
        setKeys(data.api_keys || []); 
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

  const handleDelete = async (id) => {
    if (!window.confirm("Permanent Action: Revoke this API key?")) return;

    try {
      const response = await fetch(`https://ed-agent.onrender.com/delete_key?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setKeys(keys.filter((k) => k.id !== id));
      }
    } catch (err) {
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#03050c] text-slate-100 font-sans p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Simple Header */}
        <header className="mb-12">
          <a href="/dashboard" className="inline-flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 hover:indigo-300 transition-all">
            <ChevronLeft size={14} /> Back to Dashboard
          </a>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            Access Keys
          </h1>
        </header>

        {/* Clean Glass Table */}
        <div className="bg-white/[0.01] backdrop-blur-2xl border border-white/5 rounded-[24px] overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Label</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Secret Key</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Revoke</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {keys.map((item) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id} 
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-8 py-6 text-xs font-bold text-indigo-100 uppercase tracking-tight">
                      {item.name}
                    </td>
                    <td className="px-8 py-6">
                      <code className="text-[11px] font-mono text-slate-500 group-hover:text-indigo-400 transition-colors">
                        {item.key}
                      </code>
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

        {/* Minimal Footer Info */}
        <p className="mt-8 text-center text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em]">
          Secure credentials managed via Agentix encrypted vault
        </p>
      </div>
    </div>
  );
};

export default ApiKeysPage;