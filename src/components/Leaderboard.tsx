import { motion } from "motion/react";
import { Trophy, TrendingUp, Medal, Star } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { leaderboardData } from "../data";

interface LeaderboardProps {
  userPoints: number;
  userName: string;
}

export function Leaderboard({ userPoints, userName }: LeaderboardProps) {
  // Update current user points dynamically
  const dynamicData = leaderboardData.map(user => {
    if (user.isCurrentUser) {
      return { ...user, points: userPoints, name: userName };
    }
    return user;
  });

  const sortedData = [...dynamicData].sort((a, b) => b.points - a.points);
  
  // Update ranks based on sorting
  const rankedData = sortedData.map((user, index) => ({
    ...user,
    rank: index + 1
  }));

  const chartData = rankedData.slice(0, 5); // Top 5 for the chart

  return (
    <div className="w-full flex flex-col gap-8 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-xl shadow-amber-200/50">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Trophy className="w-40 h-40" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
           <div className="w-20 h-20 bg-white/20 rounded-full flex justify-center items-center backdrop-blur-sm border-2 border-white/40">
              <Trophy className="w-10 h-10 text-white" />
           </div>
           <div>
             <h2 className="font-display font-bold text-3xl md:text-4xl">Papan Peringkat</h2>
             <p className="text-amber-50 font-medium mt-2 text-sm md:text-base max-w-md">
               Kumpulkan XP dengan menyelesaikan materi dan kuis. Bersaing sehat dan jadilah yang terbaik di SiakEdu!
             </p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Col: Chart & Stats */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
               <TrendingUp className="w-6 h-6 text-blue-600" />
               <h3 className="font-display font-bold text-xl text-slate-800">Top 5 Pelajar</h3>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="points" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.isCurrentUser ? '#f59e0b' : '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Col: Ranking List */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display font-bold text-xl text-slate-800 mb-2 px-1">Peringkat Global</h3>
          
          <div className="flex flex-col gap-3">
             {rankedData.map((user, index) => (
               <motion.div 
                 key={user.name}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.05 }}
                 className={`flex items-center p-3 sm:p-4 rounded-2xl border-2 transition-all ${
                   user.isCurrentUser 
                     ? 'bg-amber-50 border-amber-200 shadow-sm shadow-amber-100' 
                     : 'bg-white border-slate-100 hover:border-slate-200'
                 }`}
               >
                 <div className="w-8 flex-shrink-0 font-display font-bold text-slate-400 text-lg text-center">
                    {index === 0 && <Medal className="w-7 h-7 text-amber-500 mx-auto" />}
                    {index === 1 && <Medal className="w-7 h-7 text-slate-400 mx-auto" />}
                    {index === 2 && <Medal className="w-7 h-7 text-amber-700 mx-auto" />}
                    {index > 2 && `#${user.rank}`}
                 </div>
                 
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ml-3 flex-shrink-0 ${
                   user.isCurrentUser ? 'bg-amber-500 text-white' : 'bg-blue-100 text-blue-700'
                 }`}>
                   {user.avatar}
                 </div>
                 
                 <div className="ml-4 flex-1 truncate">
                    <p className={`font-bold truncate ${user.isCurrentUser ? 'text-amber-900' : 'text-slate-700'}`}>
                      {user.name}
                    </p>
                    {user.isCurrentUser && <span className="text-xs font-semibold text-amber-600">Kamu</span>}
                 </div>
                 
                 <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-slate-700 text-sm">{user.points}</span>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}
