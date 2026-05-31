import { motion } from "motion/react";
import { Users, BookOpen, Calendar, Clock, Bell, CircleCheck } from "lucide-react";
import { UserProgress } from "../types";

export function Classroom({ user }: { user: UserProgress }) {
  const schedule = [
    { time: "07:30 - 09:00", subject: "Matematika", teacher: "Budi Santoso, S.Pd", status: "completed" },
    { time: "09:30 - 11:00", subject: "Bahasa Indonesia", teacher: "Siti Aminah, M.Pd", status: "ongoing" },
    { time: "11:30 - 13:00", subject: "Ilmu Pengetahuan Alam", teacher: "Joko Widodo, S.Si", status: "upcoming" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-12">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <Users className="w-32 h-32" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-inner shrink-0">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Kelas 5A - Merdeka</h2>
            <p className="text-blue-100 font-medium">Wali Kelas: Ibu Ratna, S.Pd • 32 Siswa</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Jadwal Pelajaran Hari Ini</h3>
          </div>
          
          <div className="space-y-4">
            {schedule.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                  item.status === 'ongoing' ? 'border-amber-400 bg-amber-50' : 
                  item.status === 'completed' ? 'border-emerald-200 bg-emerald-50/50' : 
                  'border-slate-100 bg-slate-50'
                }`}
              >
                <div className={`flex items-center gap-2 font-bold px-3 py-1.5 rounded-lg shrink-0 ${
                  item.status === 'ongoing' ? 'text-amber-700 bg-amber-200/50' : 
                  item.status === 'completed' ? 'text-emerald-700 bg-emerald-200/50' : 
                  'text-slate-600 bg-slate-200/50'
                }`}>
                  <Clock className="w-4 h-4" />
                  {item.time}
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-bold text-lg leading-tight mb-1 ${
                    item.status === 'ongoing' ? 'text-amber-900' : 'text-slate-800'
                  }`}>{item.subject}</h4>
                  <p className="text-slate-500 font-medium text-sm">{item.teacher}</p>
                </div>

                {item.status === 'completed' && (
                  <div className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-100 px-3 py-2 rounded-xl shrink-0">
                    <CircleCheck className="w-5 h-5" />
                    Selesai
                  </div>
                )}
                {item.status === 'ongoing' && (
                  <div className="flex items-center gap-2 text-amber-600 font-bold bg-amber-100 px-3 py-2 rounded-xl shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div>
                    Berlangsung
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl shrink-0">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Pengumuman</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-900 text-sm font-medium">
              <strong className="block text-rose-700 mb-1 text-base">Besok Libur Nasional</strong>
              Besok hari Kamis tanggal merah, sekolah diliburkan. Jangan lupa tetap belajar di rumah!
            </div>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-blue-900 text-sm font-medium">
              <strong className="block text-blue-700 mb-1 text-base">Tugas Matematika</strong>
              Pengumpulan tugas matematika Bab 3 diperpanjang sampai hari Jumat.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
