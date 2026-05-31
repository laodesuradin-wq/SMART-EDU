import { useState, useEffect } from "react";
import { ViewState, UserProgress } from "./types";
import { modules, quizzes, leaderboardData } from "./data";
import { Menu } from "./components/Menu";
import { Tutorial } from "./components/Tutorial";
import { Quiz } from "./components/Quiz";
import { Chat } from "./components/Chat";
import { Leaderboard } from "./components/Leaderboard";
import { Profile } from "./components/Profile";
import { UsersList } from "./components/UsersList";
import { Classroom } from "./components/Classroom";
import { motion, AnimatePresence } from "motion/react";
import { Home, BookOpen, PenTool, MessageCircle, Star, Crown, Zap, Trophy, Sparkles, User, Users } from "lucide-react";

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);

  const [users, setUsers] = useState<UserProgress[]>(() => {
    const saved = localStorage.getItem("siak_users");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    const legacy = localStorage.getItem("siak_user");
    if (legacy) {
      try {
        const parsed = JSON.parse(legacy);
        parsed.id = "user_1";
        parsed.dailyGoal = parsed.dailyGoal || 500;
        parsed.dailyProgress = parsed.dailyProgress || 0;
        return [parsed];
      } catch(e) {}
    }
    return [{
      id: "user_1",
      name: "Pelajar Hebat",
      points: 1250,
      level: 5,
      completedModules: [],
      dailyGoal: 500,
      dailyProgress: 0
    }];
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    return localStorage.getItem("siak_current_user_id") || "user_1";
  });

  const [view, setView] = useState<ViewState>(() => {
    return localStorage.getItem("siak_current_user_id") ? "home" : "users";
  });

  const user = users.find(u => u.id === currentUserId) || users[0];

  const setUser = (updater: UserProgress | ((prev: UserProgress) => UserProgress)) => {
    setUsers(prev => {
      const idx = prev.findIndex(u => u.id === currentUserId);
      if (idx === -1) return prev;
      const nextUser = typeof updater === 'function' ? updater(prev[idx]) : updater;
      const newUsers = [...prev];
      newUsers[idx] = nextUser;
      return newUsers;
    });
  };

  useEffect(() => {
    localStorage.setItem("siak_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("siak_current_user_id", currentUserId);
  }, [currentUserId]);

  const activeModule = modules.find(m => m.id === activeModuleId) || modules[0];
  const activeSubject = activeModule?.subjects.find(s => s.id === activeSubjectId) || null;

  let displayQuizzes = quizzes;
  if (activeSubject) {
     const matched = quizzes.filter(q => q.subjectTitle === activeSubject.title);
     if (matched.length > 0) displayQuizzes = matched;
  }
  displayQuizzes = displayQuizzes.slice(0, 5);

  const handleFinishTutorial = (id: string) => {
    if (!user.completedModules.includes(id)) {
      setUser(prev => ({ ...prev, points: prev.points + 100, dailyProgress: prev.dailyProgress + 100, completedModules: [...prev.completedModules, id] }));
    }
    setView("learn");
  };

  const handleFinishQuiz = (score: number) => {
    setUser(prev => ({ ...prev, points: prev.points + score * 50, dailyProgress: prev.dailyProgress + score * 50 }));
    setView("home");
  };

  if (view === "users") {
    return (
      <div className="min-h-screen bg-slate-50 overflow-y-auto font-sans antialiased text-slate-800">
        <UsersList 
          users={users} 
          currentUserId={currentUserId}
          onSelectUser={(id) => {
            setCurrentUserId(id);
            setView("home");
          }}
          onCreateUser={(name) => {
            const newUser = {
              id: `user_${Date.now()}`,
              name,
              points: 0,
              level: 1,
              completedModules: [],
              dailyGoal: 500,
              dailyProgress: 0
            };
            setUsers([...users, newUser]);
          }}
          onDeleteUser={(id) => {
            const nextUsers = users.filter((u) => u.id !== id);
            setUsers(nextUsers);
            if (id === currentUserId) {
              setCurrentUserId(nextUsers[0].id);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 flex flex-col md:flex-row">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-4 sticky top-0 h-screen">
        <div className="flex items-center gap-3 px-2 mb-10 mt-4">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white font-display font-black text-xl">S</span>
          </div>
          <h1 className="font-display font-black text-2xl text-slate-800 tracking-tight">
            Siak <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg text-lg ml-0.5 relative -top-0.5">Mobile</span>
          </h1>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <NavItem icon={<Home />} label="Beranda" active={view === "home"} onClick={() => setView("home")} />
          <NavItem icon={<BookOpen />} label="Ruang Belajar" active={view === "learn" || view === "tutorial"} onClick={() => setView("learn")} />
          <NavItem icon={<PenTool />} label="Latihan" active={view === "quiz"} onClick={() => setView("quiz")} />
          <NavItem icon={<Users />} label="Kelasku" active={view === "classroom"} onClick={() => setView("classroom")} />
          <NavItem icon={<MessageCircle />} label="Tanya Sandra" active={view === "chat"} onClick={() => setView("chat")} />
          <NavItem icon={<Trophy />} label="Peringkat" active={view === "leaderboard"} onClick={() => setView("leaderboard")} />
          <NavItem icon={<User />} label="Profil" active={view === "profile"} onClick={() => setView("profile")} />
          <div className="mt-auto pt-4 border-t border-slate-100">
            <button 
              onClick={() => setView("users")}
              className="flex w-full items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-semibold text-left text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              <div className="[&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-slate-400">
                <User />
              </div>
              Ganti Akun
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col items-center pb-20 md:pb-0 relative min-h-screen">
        
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 sticky top-0 z-20 w-full px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-display font-black text-lg">S</span>
            </div>
            <h1 className="font-display font-black text-xl text-slate-800 tracking-tight">
              Siak <span className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-lg text-[15px] ml-0.5 relative -top-0.5">Mobile</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-1 bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-sm font-bold">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            {user.points}
          </div>
          <button onClick={() => setView("profile")} className="w-8 h-8 ml-2 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <User className="w-4 h-4" />
          </button>
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
                <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-8 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full" />
                  <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-500/20 blur-3xl rounded-full" />
                  <div className="absolute top-8 right-8 opacity-10">
                    <Crown className="w-32 h-32 text-indigo-200" />
                  </div>
                  <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-indigo-100 text-xs font-semibold mb-4 border border-white/10 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Pelajar Premium
                      </div>
                      <h2 className="text-indigo-200/80 text-sm font-medium mb-1">Selamat Datang,</h2>
                      <h3 className="font-display font-bold text-3xl md:text-5xl mb-6 tracking-tight text-white/95">{user.name}</h3>
                      
                      <div className="flex flex-col gap-5 mt-2">
                        <div className="flex flex-wrap gap-4">
                           <div className="bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl flex items-center gap-4 border border-white/10 shadow-inner">
                             <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Star className="w-6 h-6 text-white fill-current" />
                             </div>
                             <div>
                               <p className="text-indigo-200/80 text-[10px] uppercase tracking-wider font-semibold">Total Poin</p>
                               <p className="font-bold text-xl tracking-tight">{user.points} <span className="text-base text-indigo-300 font-medium">XP</span></p>
                             </div>
                           </div>
                           
                           <div className="bg-white/5 backdrop-blur-md px-5 py-3 rounded-2xl flex items-center gap-4 border border-white/10 shadow-inner">
                             <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Zap className="w-6 h-6 text-white fill-current" />
                             </div>
                             <div>
                               <p className="text-indigo-200/80 text-[10px] uppercase tracking-wider font-semibold">Level</p>
                               <p className="font-bold text-xl tracking-tight">Lv {user.level}</p>
                             </div>
                           </div>
                        </div>

                        {/* Daily Progress */}
                        <div className="bg-white/5 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10 shadow-inner w-full sm:max-w-md">
                           <div className="flex justify-between items-end mb-2">
                              <p className="text-indigo-200/80 text-xs font-semibold">Target Belajar Harian</p>
                              <p className="font-bold text-sm text-lime-400">{user.dailyProgress} / {user.dailyGoal} XP</p>
                           </div>
                           <div className="w-full h-2 bg-indigo-950/80 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: `${Math.min(100, Math.round((user.dailyProgress / user.dailyGoal) * 100))}%` }}
                                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                              />
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Promotional Poster Banner */}
                <div className="relative mt-2 overflow-hidden rounded-[2.5rem] p-8 md:p-10 shadow-lg group cursor-pointer hover:shadow-xl transition-shadow w-full focus:outline-none focus:ring-4 focus:ring-rose-300">
                  {/* Background with abstract shapes */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 transition-transform duration-700 group-hover:scale-110 group-hover:bg-white/30" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-300/30 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 group-hover:scale-125 transition-transform duration-700" />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-start gap-4 w-full md:w-2/3">
                    <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase border border-white/30 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Spesial Bulan Ini
                    </div>
                    <h3 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight leading-tight">
                      Olimpiade <span className="text-yellow-200 drop-shadow-sm">Sains Siak</span>
                    </h3>
                    <p className="text-white/95 text-sm md:text-base font-medium mb-2 leading-relaxed">
                      Tantang dirimu dan bersaing dengan pelajar terbaik di Siak. Menangkan beasiswa penuh dan hadiah jutaan!
                    </p>
                    <button className="bg-white text-rose-600 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto hover:bg-rose-50 focus:outline-none">
                      Daftar Sekarang &rarr;
                    </button>
                  </div>
                  
                  {/* Floating Graphic Element */}
                  <div className="absolute -right-8 -bottom-8 md:right-8 md:bottom-8 opacity-40 md:opacity-100 pointer-events-none group-hover:-translate-y-4 group-hover:-rotate-6 transition-all duration-700 ease-out">
                     <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-yellow-300 to-amber-500 shadow-[0_0_40px_rgba(251,191,36,0.4)] flex items-center justify-center border-4 border-white/30 backdrop-blur-sm relative">
                       <Trophy className="w-24 h-24 md:w-28 md:h-28 text-white drop-shadow-xl" />
                       <Sparkles className="absolute top-8 right-8 text-white w-8 h-8 animate-pulse" />
                     </div>
                  </div>
                </div>

                {/* Quick Actions / Featured */}
                <div className="mt-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button
                      onClick={() => setView("learn")}
                      className="bg-white border text-left border-slate-200 hover:border-indigo-300 p-6 rounded-[2rem] flex flex-col gap-6 transition-all shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                      <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-110 shadow-inner">
                        <BookOpen className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-xl text-slate-800 group-hover:text-indigo-700 transition-colors mb-2">Ruang Belajar</h4>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">Akses modul pembelajaran interaktif dan kelas live.</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setView("quiz")}
                      className="bg-white border text-left border-slate-200 hover:border-amber-300 p-6 rounded-[2rem] flex flex-col gap-6 transition-all shadow-sm hover:shadow-xl hover:shadow-amber-500/10 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                      <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 transition-transform group-hover:scale-110 shadow-inner">
                        <PenTool className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-xl text-slate-800 group-hover:text-amber-700 transition-colors mb-2">Latihan Soal</h4>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">Uji pemahamanmu dan raih poin XP lebih banyak.</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setView("leaderboard")}
                      className="bg-white border text-left border-slate-200 hover:border-orange-300 p-6 rounded-[2rem] flex flex-col gap-6 transition-all shadow-sm hover:shadow-xl hover:shadow-orange-500/10 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                      <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 transition-transform group-hover:scale-110 shadow-inner">
                        <Trophy className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-xl text-slate-800 group-hover:text-orange-700 transition-colors mb-2">Papan Peringkat</h4>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">Lihat posisimu di antara teman-teman lainnya.</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Ask Sandra Banner */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl relative overflow-hidden mt-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-500/20 mix-blend-overlay" />
                  <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-emerald-500/30 blur-[4rem] rounded-full -translate-y-1/2 pointer-events-none" />
                  <div className="absolute bottom-0 right-10 w-48 h-48 bg-teal-500/30 blur-[3rem] rounded-full pointer-events-none" />
                  
                  <div className="relative z-10 md:pr-12 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold mb-4 border border-emerald-500/30 uppercase tracking-widest">
                       <Sparkles className="w-3.5 h-3.5" /> AI Tutor
                    </div>
                    <h3 className="font-display font-bold text-3xl md:text-4xl mb-4 tracking-tight">Perlu Bantuan Belajar?</h3>
                    <p className="text-slate-300 text-sm md:text-base max-w-lg mb-8 leading-relaxed font-medium">
                      Sandra adalah asisten cerdas Siak Mobile. Siap membantu menjelaskan materi dan menjawab semua pertanyaanmu kapan saja.
                    </p>
                    <button 
                      onClick={() => setView("chat")}
                      className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.5)] hover:scale-105 transition-all w-full md:w-auto"
                    >
                      Mulai Obrolan Sekarang
                    </button>
                  </div>
                  <div className="hidden md:flex relative z-10 w-40 h-40">
                     <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl rotate-6 opacity-50 blur-lg" />
                     <div className="relative w-full h-full bg-slate-800 border-4 border-slate-700/50 rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-md">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80" />
                        <span className="text-emerald-400 font-display font-bold text-6xl shadow-emerald-500 drop-shadow-lg z-10">S</span>
                     </div>
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
                       setUser(prev => ({ ...prev, points: prev.points + 100, dailyProgress: prev.dailyProgress + 100, completedModules: [...prev.completedModules, activeSubject.id] }));
                     }
                     setView("subjects");
                  }}
                  onGoToQuiz={() => {
                     if (!user.completedModules.includes(activeSubject.id)) {
                       setUser(prev => ({ ...prev, points: prev.points + 100, dailyProgress: prev.dailyProgress + 100, completedModules: [...prev.completedModules, activeSubject.id] }));
                     }
                     setView("quiz");
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
                questions={displayQuizzes} 
                onFinish={handleFinishQuiz} 
               />
             </motion.div>
            )}

            {/* CLASSROOM VIEW */}
            {view === "classroom" && (
               <motion.div
                key="classroom"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full"
               >
                 <Classroom user={user} />
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
            
            {/* PROFILE VIEW */}
            {view === "profile" && (
               <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full h-full pb-4"
               >
                 <Profile 
                   user={user} 
                   onUpdateUser={setUser}
                   onSwitchUser={() => setView("users")}
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
          <MobileNavItem icon={<Users />} label="Kelasku" active={view === "classroom"} onClick={() => setView("classroom")} />
          <MobileNavItem icon={<Trophy />} label="Peringkat" active={view === "leaderboard"} onClick={() => setView("leaderboard")} />
          <MobileNavItem icon={<MessageCircle />} label="Tanya" active={view === "chat"} onClick={() => setView("chat")} />
          <MobileNavItem icon={<User />} label="Profil" active={view === "profile"} onClick={() => setView("profile")} />
        </div>
      </nav>

    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-semibold text-left ${
        active 
          ? "bg-indigo-50 text-indigo-700" 
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <div className={`[&>svg]:w-5 [&>svg]:h-5 ${active ? "[&>svg]:text-indigo-600" : "[&>svg]:text-slate-400"}`}>
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
        active ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
      }`}
    >
      <div className={`[&>svg]:w-[22px] [&>svg]:h-[22px] transition-transform ${active ? "scale-110" : ""}`}>
        {icon}
      </div>
      <span className={`text-[11px] tracking-tight leading-none ${active ? "font-bold" : "font-medium"}`}>{label}</span>
    </button>
  );
}
