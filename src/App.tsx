import { useState, useEffect } from "react";
import { ViewState, UserProgress } from "./types";
import { modules, quizzes, leaderboardData } from "./data";
import { Menu } from "./components/Menu";
import { Tutorial } from "./components/Tutorial";
import { Quiz } from "./components/Quiz";
import { Chat } from "./components/Chat";
import { Leaderboard } from "./components/Leaderboard";
import { motion, AnimatePresence } from "motion/react";
import { Home, BookOpen, PenTool, MessageCircle, Star, Crown, Zap, Trophy } from "lucide-react";

export default function App() {
  const [view, setView] = useState<ViewState>("home");
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);

  const [user, setUser] = useState<UserProgress>(() => {
    const saved = localStorage.getItem("siak_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved user state", e);
      }
    }
    return {
      name: "Pelajar Hebat",
      points: 1250,
      level: 5,
      completedModules: []
    };
  });

  useEffect(() => {
    localStorage.setItem("siak_user", JSON.stringify(user));
  }, [user]);

  const activeModule = modules.find(m => m.id === activeModuleId) || modules[0];
  const activeSubject = activeModule?.subjects.find(s => s.id === activeSubjectId) || null;

  const handleFinishTutorial = (id: string) => {
    if (!user.completedModules.includes(id)) {
      setUser(prev => ({ ...prev, points: prev.points + 100, completedModules: [...prev.completedModules, id] }));
    }
    setView("learn");
  };

  const handleFinishQuiz = (score: number) => {
    setUser(prev => ({ ...prev, points: prev.points + score * 50 }));
    setView("home");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-4 sticky top-0 h-screen">
        <div className="flex items-center gap-3 px-2 mb-10 mt-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <span className="text-white font-display font-bold text-lg">S</span>
          </div>
          <h1 className="font-display font-bold text-xl text-slate-900 tracking-tight">
            Siak<span className="text-blue-600">Edu</span>
          </h1>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <NavItem icon={<Home />} label="Beranda" active={view === "home"} onClick={() => setView("home")} />
          <NavItem icon={<BookOpen />} label="Ruang Belajar" active={view === "learn" || view === "tutorial"} onClick={() => setView("learn")} />
          <NavItem icon={<PenTool />} label="Latihan" active={view === "quiz"} onClick={() => setView("quiz")} />
          <NavItem icon={<MessageCircle />} label="Tanya Sandra" active={view === "chat"} onClick={() => setView("chat")} />
          <NavItem icon={<Trophy />} label="Peringkat" active={view === "leaderboard"} onClick={() => setView("leaderboard")} />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col items-center pb-20 md:pb-0 relative min-h-screen">
        
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 sticky top-0 z-20 w-full px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">S</span>
            </div>
            <h1 className="font-display font-bold text-lg text-slate-900 tracking-tight">
              Siak<span className="text-blue-600">Edu</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-1 bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-sm font-bold">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            {user.points}
          </div>
        </header>

        <div className="w-full flex-1 p-4 md:p-8 md:overflow-y-auto">
          <AnimatePresence mode="wait">
            
            {/* HOME VIEW (DASHBOARD) */}
            {view === "home" && (
              <motion.div 
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full flex flex-col gap-8"
              >
                {/* User Profile Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl shadow-blue-200">
                  <div className="absolute top-0 right-0 p-8 opacity-20">
                    <Crown className="w-32 h-32" />
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-blue-100 text-sm font-medium mb-1">Hai, Semangat Belajar!</h2>
                    <h3 className="font-display font-bold text-2xl md:text-3xl mb-6">{user.name}</h3>
                    
                    <div className="flex flex-wrap gap-4">
                       <div className="bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-3">
                         <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                            <Star className="w-5 h-5 text-white fill-current" />
                         </div>
                         <div>
                           <p className="text-white/80 text-xs font-medium">Total Poin</p>
                           <p className="font-bold text-lg">{user.points} XP</p>
                         </div>
                       </div>
                       
                       <div className="bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-3">
                         <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white fill-current" />
                         </div>
                         <div>
                           <p className="text-white/80 text-xs font-medium">Level</p>
                           <p className="font-bold text-lg">Lv. {user.level}</p>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions / Featured */}
                <div>
                  <h3 className="font-display font-bold text-xl text-slate-800 mb-4 px-1">Lanjutkan Belajarmu</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setView("learn")}
                      className="bg-white border-2 border-slate-100 hover:border-blue-400 p-5 rounded-3xl flex items-center gap-5 transition-all text-left shadow-sm group"
                    >
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                        <BookOpen className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-700 transition-colors">Ruang Belajar</h4>
                        <p className="text-slate-500 text-sm mt-1">Materi kependudukan</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setView("quiz")}
                      className="bg-white border-2 border-slate-100 hover:border-amber-400 p-5 rounded-3xl flex items-center gap-5 transition-all text-left shadow-sm group"
                    >
                      <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
                        <PenTool className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg text-slate-900 group-hover:text-amber-700 transition-colors">Latihan Soal</h4>
                        <p className="text-slate-500 text-sm mt-1">Uji pemahaman harian</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setView("leaderboard")}
                      className="bg-white border-2 border-slate-100 hover:border-orange-400 p-5 rounded-3xl flex items-center gap-5 transition-all text-left shadow-sm group"
                    >
                      <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 group-hover:scale-105 transition-transform">
                        <Trophy className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg text-slate-900 group-hover:text-orange-700 transition-colors">Papan Peringkat</h4>
                        <p className="text-slate-500 text-sm mt-1">Cek XP dan prestasimu</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Ask Sandra Banner */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 md:p-8 flex items-center justify-between text-white shadow-lg shadow-emerald-200">
                  <div>
                    <h3 className="font-display font-bold text-xl mb-2">Bingung dengan Materi?</h3>
                    <p className="text-emerald-50 text-sm max-w-sm mb-4 leading-relaxed">
                      Tanya Asisten Sandra! Guru pintar AI yang siap menjawab semua pertanyaanmu 24/7.
                    </p>
                    <button 
                      onClick={() => setView("chat")}
                      className="bg-white text-emerald-700 px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-emerald-50 transition-colors"
                    >
                      Tanya Sekarang
                    </button>
                  </div>
                  <div className="hidden md:flex w-24 h-24 bg-white/20 rounded-full items-center justify-center backdrop-blur-sm">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* LEARN MENU VIEW */}
            {view === "learn" && (
              <motion.div
                key="learn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full flex flex-col gap-6"
              >
                <div className="px-1 mb-2 border-b-2 border-slate-100 pb-4">
                  <h2 className="font-display font-bold text-3xl text-slate-900">Ruang Belajar</h2>
                  <p className="text-slate-500 mt-2 font-medium">Pilih tingkat kelas yang ingin dipelajari hari ini.</p>
                </div>
                <Menu 
                  items={modules} 
                  completedItems={[]} // Let's simplify and just not show completion on Grades
                  actionLabel="Buka Kelas"
                  completedLabel="Buka Kelas"
                  onSelect={(id) => {
                    setActiveModuleId(id);
                    setView("subjects");
                  }} 
                />
              </motion.div>
            )}

            {/* SUBJECTS VIEW */}
            {view === "subjects" && activeModule && (
              <motion.div
                key="subjects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full flex flex-col gap-6"
              >
                <div className="px-1 mb-2 flex flex-col items-start gap-4 border-b-2 border-slate-100 pb-4">
                  <button onClick={() => setView("learn")} className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-lg border-2 border-slate-100">
                    ← Kembali ke Daftar Kelas
                  </button>
                  <div>
                    <h2 className="font-display font-bold text-3xl text-slate-900">Mata Pelajaran {activeModule.title}</h2>
                    <p className="text-slate-500 mt-2 font-medium">Pilih mata pelajaran untuk melihat LIVE kelas interaktif.</p>
                  </div>
                </div>
                <Menu 
                  items={activeModule.subjects} 
                  completedItems={user.completedModules}
                  onSelect={(id) => {
                    setActiveSubjectId(id);
                    setView("tutorial");
                  }} 
                />
              </motion.div>
            )}

            {/* TUTORIAL VIEW */}
            {view === "tutorial" && activeSubject && (
              <motion.div
                key="tutorial"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <Tutorial 
                  module={activeSubject} 
                  onBack={() => setView("subjects")}
                  onFinish={() => {
                     if (!user.completedModules.includes(activeSubject.id)) {
                       setUser(prev => ({ ...prev, points: prev.points + 100, completedModules: [...prev.completedModules, activeSubject.id] }));
                     }
                     setView("subjects");
                  }} 
                />
              </motion.div>
            )}

            {/* QUIZ VIEW */}
            {view === "quiz" && (
               <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
             >
               <Quiz 
                questions={quizzes} 
                onFinish={handleFinishQuiz} 
               />
             </motion.div>
            )}

            {/* CHAT VIEW */}
            {view === "chat" && (
               <motion.div
                key="chat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full h-full pb-4"
               >
                 <Chat onBack={() => setView("home")} />
               </motion.div>
            )}

            {/* LEADERBOARD VIEW */}
            {view === "leaderboard" && (
               <motion.div
                key="leaderboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full h-full pb-4"
               >
                 <Leaderboard 
                   userPoints={user.points} 
                   userName={user.name} 
                 />
               </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-30 shadow-[0_-5px_20px_-15px_rgba(0,0,0,0.1)]">
        <div className="flex justify-around items-center h-16 px-2">
          <MobileNavItem icon={<Home />} label="Beranda" active={view === "home"} onClick={() => setView("home")} />
          <MobileNavItem icon={<BookOpen />} label="Belajar" active={view === "learn" || view === "tutorial"} onClick={() => setView("learn")} />
          <MobileNavItem icon={<PenTool />} label="Latihan" active={view === "quiz"} onClick={() => setView("quiz")} />
          <MobileNavItem icon={<Trophy />} label="Peringkat" active={view === "leaderboard"} onClick={() => setView("leaderboard")} />
          <MobileNavItem icon={<MessageCircle />} label="Tanya" active={view === "chat"} onClick={() => setView("chat")} />
        </div>
      </nav>

    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-medium text-left ${
        active 
          ? "bg-blue-50 text-blue-700" 
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <div className={`[&>svg]:w-5 [&>svg]:h-5 ${active ? "[&>svg]:text-blue-600" : "[&>svg]:text-slate-400"}`}>
        {icon}
      </div>
      {label}
    </button>
  );
}

function MobileNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
        active ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
      }`}
    >
      <div className={`[&>svg]:w-5 [&>svg]:h-5 transition-transform ${active ? "scale-110" : ""}`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
