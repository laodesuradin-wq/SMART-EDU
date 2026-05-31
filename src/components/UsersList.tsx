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
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 md:p-8">
      <div className="text-center pt-8 md:pt-12 pb-6">
        <h2 className="font-display font-bold text-4xl text-slate-900 tracking-tight">Siapa yang sedang belajar?</h2>
        <p className="text-slate-500 mt-3 font-medium text-lg">Pilih profilmu untuk melanjutkan perjalanan belajarmu.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {users.map((user, idx) => {
          const isActive = user.id === currentUserId;
          const colors = ['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500', 'bg-fuchsia-500'];
          const avatarColor = colors[idx % colors.length];

          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              key={user.id}
              className="flex flex-col items-center gap-4 relative group"
            >
              <button
                onClick={() => onSelectUser(user.id)}
                className={`w-32 h-32 md:w-40 md:h-40 rounded-[2rem] flex items-center justify-center text-white transition-all duration-300 shadow-lg group-hover:scale-105 group-hover:-translate-y-2
                  ${avatarColor}
                  ${isActive ? 'ring-8 ring-indigo-200 outline-none shadow-indigo-200 shadow-2xl' : 'hover:shadow-xl'}
                `}
              >
                <User className="w-16 h-16 md:w-20 md:h-20 opacity-90" />
              </button>
              <div className="text-center">
                 <p className={`font-bold text-lg md:text-xl ${isActive ? 'text-indigo-700' : 'text-slate-700'}`}>
                   {user.name}
                 </p>
                 <p className="text-slate-500 text-sm font-semibold">Level {user.level} • {user.points} XP</p>
              </div>

              {/* Delete Button (don't allow deleting the last user) */}
              {users.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Hapus pengguna ${user.name}?`)) {
                       onDeleteUser(user.id);
                    }
                  }}
                  className="absolute -top-3 -right-3 bg-white text-rose-500 border-2 border-slate-100 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-rose-50 focus:opacity-100"
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
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: users.length * 0.1 }}
             className="flex flex-col items-center gap-4"
          >
            <button
              onClick={handleCreate}
              className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] border-4 border-dashed border-slate-300 text-slate-400 bg-slate-50 flex items-center justify-center transition-all duration-300 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50 hover:scale-105"
            >
              <Plus className="w-16 h-16 md:w-20 md:h-20" />
            </button>
            <div className="text-center">
               <p className="font-bold text-lg md:text-xl text-slate-600">
                 Tambah Profil
               </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
