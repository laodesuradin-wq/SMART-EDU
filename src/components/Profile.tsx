import { useState } from "react";
import { UserProgress } from "../types";
import { User, Star, Zap, Save, CheckCircle, Target, Users } from "lucide-react";
import { motion } from "motion/react";

interface ProfileProps {
  user: UserProgress;
  onUpdateUser: (updatedUser: UserProgress) => void;
  onSwitchUser: () => void;
}

export function Profile({ user, onUpdateUser, onSwitchUser }: ProfileProps) {
  const [name, setName] = useState(user.name);
  const [dailyGoal, setDailyGoal] = useState(user.dailyGoal);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (name.trim()) {
      onUpdateUser({ ...user, name: name.trim(), dailyGoal });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      <div className="px-1 mb-2 border-b-2 border-slate-100 pb-4">
        <h2 className="font-display font-bold text-3xl text-slate-900">Profil Saya</h2>
        <p className="text-slate-500 mt-2 font-medium">Kelola informasi akun dan lihat progres belajarmu.</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-sm flex flex-col gap-8">
        
        {/* Profile Header section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b-2 border-slate-50 pb-8">
           <div className="w-24 h-24 md:w-32 md:h-32 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 shrink-0 border-4 border-indigo-50">
             <User className="w-12 h-12 md:w-16 md:h-16" />
           </div>
           
           <div className="flex-1 flex flex-col items-center md:items-start w-full">
             <label className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide">Nama Pengguna</label>
             <div className="flex flex-col sm:flex-row items-center w-full gap-3 mt-1">
               <input 
                 type="text"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className="flex-1 w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 font-semibold text-slate-800 focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors"
                 placeholder="Masukkan namamu..."
               />
             </div>
             
             <div className="w-full mt-6">
                <label className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide flex items-center gap-2">
                   <Target className="w-4 h-4 text-emerald-500" /> Target XP Harian
                </label>
                <div className="flex items-center gap-4 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3">
                   <input 
                     type="range"
                     min="100"
                     max="2000"
                     step="100"
                     value={dailyGoal}
                     onChange={e => setDailyGoal(Number(e.target.value))}
                     className="flex-1 accent-indigo-600"
                   />
                   <span className="font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-lg min-w-[80px] text-center">
                      {dailyGoal} XP
                   </span>
                </div>
             </div>

             <div className="w-full mt-6 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleSave}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0 shadow-lg shadow-indigo-200"
                >
                  {isSaved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                  {isSaved ? 'Tersimpan' : 'Simpan Perubahan'}
                </button>
                <button 
                  onClick={onSwitchUser}
                  className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0 md:hidden"
                >
                  <Users className="w-5 h-5" />
                  Ganti Akun
                </button>
             </div>
             {isSaved && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-500 text-sm font-semibold mt-3 flex items-center gap-1"
                >
                  <CheckCircle className="w-4 h-4" /> Profil berhasil diperbarui!
                </motion.p>
             )}
           </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-100 flex items-center gap-5">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-amber-200 flex items-center justify-center shrink-0">
                <Star className="w-8 h-8 text-amber-500 fill-current" />
              </div>
              <div>
                <h4 className="text-amber-800/60 font-bold uppercase tracking-wider text-xs mb-1">Total Poin XP</h4>
                <p className="text-3xl font-display font-bold text-amber-600">{user.points}</p>
              </div>
           </div>

           <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-100 flex items-center gap-5">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-emerald-200 flex items-center justify-center shrink-0">
                <Zap className="w-8 h-8 text-emerald-500 fill-current" />
              </div>
              <div>
                <h4 className="text-emerald-800/60 font-bold uppercase tracking-wider text-xs mb-1">Level Saat Ini</h4>
                <p className="text-3xl font-display font-bold text-emerald-600">Level {user.level}</p>
              </div>
           </div>
        </div>

        {/* Progress Section */}
        <div>
           <h3 className="font-display font-bold text-xl text-slate-800 mb-4">Statistik Belajar</h3>
           <div className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-100">
             <div className="flex items-center justify-between mb-2">
               <span className="font-semibold text-slate-600">Modul Selesai</span>
               <span className="font-bold text-indigo-600">{user.completedModules.length} Modul</span>
             </div>
             
             {user.completedModules.length === 0 ? (
                <p className="text-sm text-slate-500 italic mt-4 bg-white p-4 rounded-xl border border-slate-200 text-center">
                  Belum ada pelajaran yang diselesaikan. Yuk mulai belajar!
                </p>
             ) : (
                <div className="mt-4 flex flex-wrap gap-2">
                  {user.completedModules.map(mod => (
                    <span key={mod} className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-sm font-semibold shadow-sm">
                      Pelajaran ID: {mod}
                    </span>
                  ))}
                </div>
             )}
           </div>
        </div>

      </div>
    </div>
  );
}
