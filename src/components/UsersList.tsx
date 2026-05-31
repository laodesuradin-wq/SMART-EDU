import { Plus, User, Trash2 } from "lucide-react";
import { UserProgress } from "../types";
import { motion } from "motion/react";

interface UsersListProps {
  users: UserProgress[];
  currentUserId: string;
  onSelectUser: (id: string) => void;
  onCreateUser: (name: string) => void;
  onDeleteUser: (id: string) => void;
}

export function UsersList({ users, currentUserId, onSelectUser, onCreateUser, onDeleteUser }: UsersListProps) {
  const handleCreate = () => {
    const defaultName = `Pengguna ${users.length + 1}`;
    const name = window.prompt("Nama Pengguna Baru:", defaultName);
    if (name && name.trim()) {
      onCreateUser(name.trim());
    }
  };

  return (
    <div className="w-full min-h-[100dvh] flex flex-col justify-center max-w-5xl mx-auto md:p-8 relative">
      
      {/* Background Ornaments */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 bg-slate-50">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-200/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-emerald-200/50 rounded-full blur-[100px]" />
      </div>

      <div className="text-center pt-8 md:pt-0  pb-12 px-4 z-10">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <img src="/vitery.png" alt="Siak Mobile" className="h-16 mx-auto mb-8 hidden" />
          <h2 className="font-display font-black text-4xl md:text-5xl text-slate-900 tracking-tight mb-4">Siapa yang sedang belajar?</h2>
          <p className="text-slate-500 font-medium text-lg md:text-xl max-w-xl mx-auto">Pilih profil untuk melanjutkan perjalanan belajarmu hari ini.</p>
        </motion.div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10 z-10 p-4">
        {users.map((user, idx) => {
          const isActive = user.id === currentUserId;
          const colors = [
            'from-indigo-400 to-indigo-600', 
            'from-emerald-400 to-emerald-600', 
            'from-amber-400 to-orange-500', 
            'from-rose-400 to-rose-600', 
            'from-cyan-400 to-cyan-600'
          ];
          const avatarColor = colors[idx % colors.length];

          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 200, damping: 20 }}
              key={user.id}
              className="flex flex-col items-center gap-5 relative group"
            >
              <button
                onClick={() => onSelectUser(user.id)}
                className={`w-36 h-36 md:w-44 md:h-44 rounded-[2.5rem] flex items-center justify-center text-white transition-all duration-300 shadow-xl group-hover:scale-105 group-hover:-translate-y-2
                  bg-gradient-to-br ${avatarColor}
                  border-4 ${isActive ? 'border-white ring-8 ring-indigo-200/60 shadow-indigo-200/50 shadow-2xl' : 'border-transparent hover:border-white/50'}
                `}
              >
                <User className="w-20 h-20 md:w-24 md:h-24 opacity-90 drop-shadow-md" />
              </button>
              <div className="text-center">
                 <p className={`font-display font-bold text-xl md:text-2xl ${isActive ? 'text-indigo-800' : 'text-slate-700'}`}>
                   {user.name}
                 </p>
                 <p className="text-slate-500 font-bold bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full mt-2 border border-slate-200 shadow-sm inline-block">
                   Lv {user.level} <span className="opacity-40 mx-1">•</span> {user.points} XP
                 </p>
              </div>

              {/* Delete Button */}
              {users.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Hapus pengguna ${user.name}?`)) {
                       onDeleteUser(user.id);
                    }
                  }}
                  className="absolute -top-3 -right-3 md:-right-3 md:-top-3 bg-white text-rose-500 border-2 border-slate-100 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg hover:bg-rose-50 hover:text-rose-600 focus:opacity-100 scale-90 group-hover:scale-100 hover:border-rose-200 z-20"
                  title="Hapus Pengguna"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </motion.div>
          );
        })}

        {/* Add User Button */}
        {users.length < 5 && (
          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: users.length * 0.1, type: "spring" }}
             className="flex flex-col items-center gap-5 mt-2 md:mt-0"
          >
            <button
              onClick={handleCreate}
              className="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] border-4 border-dashed border-slate-300 text-slate-400 bg-white/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50/50 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl"
            >
              <Plus className="w-16 h-16 md:w-20 md:h-20 stroke-[1.5]" />
            </button>
            <div className="text-center pt-2">
               <p className="font-display font-bold text-xl md:text-2xl text-slate-500">
                 Tambah Baru
               </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
