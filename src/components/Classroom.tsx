import { motion } from "motion/react";
import { Users, BookOpen, Calendar, Clock, Bell, CircleCheck, ChevronRight, FileText, Sparkles } from "lucide-react";
import { UserProgress } from "../types";

export function Classroom({ user }: { user: UserProgress }) {
  const schedule = [
    { time: "07:30 - 09:00", subject: "Matematika", teacher: "Budi Santoso, S.Pd", status: "completed", topic: "Pecahan Campuran" },
    { time: "09:30 - 11:00", subject: "Bahasa Indonesia", teacher: "Siti Aminah, M.Pd", status: "ongoing", topic: "Menulis Puisi" },
    { time: "11:30 - 13:00", subject: "Ilmu Pengetahuan Alam", teacher: "Joko Widodo, S.Si", status: "upcoming", topic: "Sistem Tata Surya" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-16 px-4 md:px-8 mt-6">
      
      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-indigo-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group"
      >
        {/* Abstract Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-500/40 to-purple-500/0 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-110"></div>
        <div className="absolute -bottom-24 gap-4 -left-12 w-72 h-72 bg-gradient-to-tr from-cyan-500/30 to-blue-500/0 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-110"></div>
        
        <div className="absolute top-0 right-0 p-8 md:p-16 opacity-10">
          <BookOpen className="w-48 h-48 rotate-12 transition-transform duration-700 group-hover:rotate-[24deg]" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-white/10 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center border border-white/20 shadow-2xl shrink-0">
              <span className="text-4xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-indigo-200">5A</span>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-indigo-200 text-xs font-bold tracking-wider uppercase mb-3 border border-white/5">
                <Sparkles className="w-4 h-4 text-amber-300" /> Kelas Aktif
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-2 text-white drop-shadow-sm">Kelas Merdeka</h2>
              <p className="text-indigo-200/90 font-medium text-lg flex items-center gap-2">
                <Users className="w-5 h-5 opacity-70" /> 32 Siswa <span className="opacity-40">•</span> Wali Kelas: Ibu Ratna, S.Pd
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none justify-center px-6 py-3.5 bg-white text-indigo-900 rounded-2xl font-bold hover:bg-slate-50 transition-colors shadow-xl flex items-center gap-2">
              Masuk Kelas Virtual <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Schedule Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between mb-2 mt-4 md:mt-0">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 rounded-2xl shadow-sm">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-800 tracking-tight">Jadwal Hari Ini</h3>
            </div>
            <p className="text-slate-500 font-semibold tracking-wide">Senin, 15 Mei</p>
          </div>
          
          <div className="space-y-4 relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-slate-200 rounded-full hidden sm:block"></div>

            {schedule.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className={`relative flex flex-col sm:flex-row gap-4 p-5 rounded-[2rem] border-2 transition-all cursor-default shadow-sm hover:shadow-md z-10 ${
                  item.status === 'ongoing' ? 'border-amber-300 bg-amber-50/50' : 
                  item.status === 'completed' ? 'border-slate-100 bg-white/50 backdrop-blur-sm' : 
                  'border-slate-100 bg-white'
                }`}
              >
                {/* Timeline Dot (desktop only) */}
                <div className={`hidden sm:flex absolute -left-[1.3rem] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white ${
                  item.status === 'ongoing' ? 'bg-amber-500' : 
                  item.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-300'
                }`}></div>

                <div className="flex flex-col sm:w-36 shrink-0 justify-center">
                   <div className={`flex items-center gap-2 font-bold px-3 py-2 rounded-xl border ${
                    item.status === 'ongoing' ? 'text-amber-700 bg-amber-100 border-amber-200' : 
                    item.status === 'completed' ? 'text-slate-500 bg-slate-50 border-slate-200' : 
                    'text-indigo-600 bg-indigo-50 border-indigo-100'
                  }`}>
                    <Clock className="w-4 h-4 shrink-0" />
                    <span className="text-sm tracking-tight">{item.time}</span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className={`font-bold text-xl leading-tight mb-2 flex items-center gap-2 ${
                    item.status === 'ongoing' ? 'text-amber-900' : 'text-slate-800'
                  }`}>
                    {item.subject}
                    {item.status === 'ongoing' && (
                       <span className="flex h-3 w-3 relative ml-1">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                       </span>
                    )}
                  </h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <span className="text-slate-600 font-medium flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Users className="w-4 h-4 text-slate-400" /> {item.teacher}
                    </span>
                    <span className="text-slate-600 font-medium flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <BookOpen className="w-4 h-4 text-slate-400" /> {item.topic}
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-center shrink-0 min-w-[7rem]">
                   {item.status === 'completed' && (
                    <div className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
                      <CircleCheck className="w-5 h-5" /> Selesai
                    </div>
                  )}
                  {item.status === 'ongoing' && (
                    <button className="flex items-center gap-2 text-white font-bold bg-amber-500 hover:bg-amber-600 transition-colors px-5 py-3 rounded-xl shadow-lg shadow-amber-200 w-full justify-center">
                      Ikuti <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Announcements Card */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-rose-50 text-rose-500 rounded-xl">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Papan Info</h3>
            </div>

            <div className="space-y-4">
              <div className="group p-4 bg-rose-50/50 border border-rose-100/50 rounded-2xl hover:bg-rose-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-rose-400 shrink-0"></div>
                  <div>
                    <h4 className="text-rose-900 font-bold mb-1 leading-tight text-sm">Libur Nasional Kamis</h4>
                    <p className="text-rose-700/80 text-xs font-medium leading-relaxed">Sekolah diliburkan. Jangan lupa tetap menyempatkan waktu belajar mandiri di rumah.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assignments Card */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-blue-50 text-blue-500 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Tugas & PR</h3>
              <span className="ml-auto bg-rose-100 text-rose-600 font-bold text-xs px-2.5 py-1 rounded-full">2 Tertunda</span>
            </div>

            <div className="space-y-3">
              <div className="p-4 border-2 border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                   <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">PR Matematika Bab 3</h4>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 text-xs font-medium">Batas: Besok, 08:00</p>
                  <span className="text-blue-500 text-xs font-bold bg-blue-50 px-2 py-0.5 rounded-md">Belum</span>
                </div>
              </div>
              <div className="p-4 border-2 border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                   <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">Tugas Menulis Cerpen</h4>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 text-xs font-medium">Batas: Jumat, 10:00</p>
                  <span className="text-blue-500 text-xs font-bold bg-blue-50 px-2 py-0.5 rounded-md">Belum</span>
                </div>
              </div>
              
              <button className="w-full mt-2 py-3 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors border-2 border-dashed border-slate-200 rounded-2xl hover:bg-indigo-50 hover:border-indigo-200">
                Lihat Semua Tugas
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
