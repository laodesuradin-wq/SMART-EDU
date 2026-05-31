import { PlayCircle, CheckCircle2, GraduationCap, Book, Flag, BookOpen, Calculator, Globe, Activity, Palette, MessageSquare, FlaskConical, Monitor, Zap, Leaf, Users, TrendingUp, Hourglass } from "lucide-react";
import { motion } from "motion/react";

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-6 h-6 text-blue-600" />,
  Book: <Book className="w-6 h-6 text-emerald-600" />,
  Flag: <Flag className="w-6 h-6 text-red-600" />,
  BookOpen: <BookOpen className="w-6 h-6 text-cyan-600" />,
  Calculator: <Calculator className="w-6 h-6 text-purple-600" />,
  Globe: <Globe className="w-6 h-6 text-blue-500" />,
  Activity: <Activity className="w-6 h-6 text-orange-600" />,
  Palette: <Palette className="w-6 h-6 text-pink-600" />,
  MessageSquare: <MessageSquare className="w-6 h-6 text-indigo-600" />,
  FlaskConical: <FlaskConical className="w-6 h-6 text-teal-600" />,
  Monitor: <Monitor className="w-6 h-6 text-slate-600" />,
  Zap: <Zap className="w-6 h-6 text-amber-500" />,
  Leaf: <Leaf className="w-6 h-6 text-green-600" />,
  Users: <Users className="w-6 h-6 text-indigo-500" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-emerald-500" />,
  Hourglass: <Hourglass className="w-6 h-6 text-amber-700" />,
};

const bgMap: Record<string, string> = {
  GraduationCap: "bg-blue-100",
  Book: "bg-emerald-100",
  Flag: "bg-red-100",
  BookOpen: "bg-cyan-100",
  Calculator: "bg-purple-100",
  Globe: "bg-blue-50",
  Activity: "bg-orange-100",
  Palette: "bg-pink-100",
  MessageSquare: "bg-indigo-100",
  FlaskConical: "bg-teal-100",
  Monitor: "bg-slate-100",
  Zap: "bg-amber-100",
  Leaf: "bg-green-100",
  Users: "bg-indigo-50",
  TrendingUp: "bg-emerald-50",
  Hourglass: "bg-amber-100",
};

interface MenuCardItem {
  id: string;
  title: string;
  icon: string;
  description: string;
}

interface MenuProps {
  items: MenuCardItem[];
  completedItems: string[];
  onSelect: (id: string) => void;
  actionLabel?: string;
  completedLabel?: string;
}

export function Menu({ items, completedItems, onSelect, actionLabel = "Mulai Belajar", completedLabel = "Pelajari Ulang" }: MenuProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full w-full max-w-5xl mx-auto">
      {items.map((item, index) => {
        const isCompleted = completedItems.includes(item.id);
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (index % 10) * 0.05, duration: 0.3 }}
            className={`group flex flex-col p-5 bg-white rounded-3xl border-2 transition-all shadow-sm ${
              isCompleted ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-100 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-4">
              <div className={`p-3 rounded-2xl ${bgMap[item.icon] || 'bg-slate-100'}`}>
                {iconMap[item.icon]}
              </div>
              
              {isCompleted ? (
                <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  Selesai
                </div>
              ) : (
                <div className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  Belum
                </div>
              )}
            </div>
            
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
              {item.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
              {item.description}
            </p>
            
            <button
               onClick={() => onSelect(item.id)}
               className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                 isCompleted 
                   ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800' 
                   : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200'
               }`}
            >
              <PlayCircle className="w-5 h-5" />
              {isCompleted ? completedLabel : actionLabel}
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}
