import { useState } from "react";
import { Subject } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Star, FileText, Users } from "lucide-react";

interface TutorialProps {
  module: Subject;
  onBack: () => void;
  onFinish: () => void;
}

export function Tutorial({ module, onBack, onFinish }: TutorialProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isFinished = currentStepIndex >= module.steps.length;

  const currentStep = module.steps[currentStepIndex];

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      
      {!isFinished ? (
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-l-2xl"></div>
          <button 
            onClick={onBack}
            className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-bold text-slate-800 text-sm">Sedang Belajar:</h2>
            <h1 className="font-display font-bold text-lg text-blue-700">{module.title}</h1>
          </div>
        </div>
      ) : null}

      <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden flex flex-col">
        {!isFinished && module.videoUrl && (
          <div className="relative w-full bg-slate-900 border-b-2 border-slate-100 aspect-video overflow-hidden flex items-center justify-center">
             {/* Animated AI Avatar Background */}
             <div className="absolute inset-0 flex items-center justify-center bg-slate-900 overflow-hidden">
                <motion.div 
                  className="absolute w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
             </div>
             
             {/* AI Avatar */}
             <div className="z-10 flex flex-col items-center">
                 <motion.div 
                    className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-2xl border-4 border-slate-800"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 >
                    <span className="text-white font-display font-bold text-5xl md:text-6xl">S</span>
                    <div className="absolute -bottom-2 -right-2 bg-slate-800 p-2 rounded-full border-2 border-slate-700">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    </div>
                 </motion.div>
                 
                 {/* Voice visualizer */}
                 <div className="flex items-center gap-1.5 mt-8 bg-slate-800/80 px-5 py-2.5 rounded-full backdrop-blur-sm border border-slate-700">
                    <motion.div className="w-1.5 bg-emerald-400 rounded-full" animate={{ height: [12, 24, 12] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-1.5 bg-emerald-400 rounded-full" animate={{ height: [24, 10, 24] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} />
                    <motion.div className="w-1.5 bg-emerald-400 rounded-full" animate={{ height: [16, 32, 16] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-1.5 bg-emerald-400 rounded-full" animate={{ height: [28, 12, 28] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }} />
                    <motion.div className="w-1.5 bg-emerald-400 rounded-full" animate={{ height: [14, 22, 14] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }} />
                 </div>
             </div>

            {/* Dark gradient overlay for bottom text */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            
            <div className="absolute top-4 left-4 flex gap-2">
               <div className="bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-md">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  LIVE AI TUTOR
               </div>
               <div className="bg-slate-800/80 backdrop-blur-md text-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md border border-slate-700">
                  <Users className="w-3.5 h-3.5" />
                  1.2K
               </div>
            </div>

            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 text-white">
              <h3 className="font-display font-bold text-lg md:text-2xl text-shadow mb-1">Sesi Interaktif: {module.title}</h3>
              <p className="text-emerald-400 text-xs md:text-sm font-medium">Tutor AI Sandra sedang menjelaskan langkah {currentStepIndex + 1}</p>
            </div>
          </div>
        )}

        {!isFinished && (
           <div className="p-6 md:p-8 border-b-2 border-slate-100 bg-slate-50 flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                 <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-slate-600 font-medium text-sm leading-relaxed mt-1">
                 Perhatikan langkah-langkah di bawah ini dengan seksama. Pahami prosedurnya agar memudahkan proses administrasi Anda!
              </p>
           </div>
        )}

        {/* Progress bar */}
        {!isFinished && (
           <div className="w-full h-2 bg-slate-100">
             <motion.div 
               className="h-full bg-blue-500"
               initial={{ width: 0 }}
               animate={{ width: `${((currentStepIndex) / module.steps.length) * 100}%` }}
               transition={{ duration: 0.3 }}
             />
           </div>
        )}

        <div className="p-6 md:p-10 min-h-[300px] flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            {!isFinished && currentStep && (
              <motion.div
                key={`step-${currentStepIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex flex-shrink-0 w-20 h-20 rounded-full bg-blue-100 text-blue-700 font-display font-bold text-3xl items-center justify-center mb-6 shadow-sm">
                  {currentStepIndex + 1}
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl text-slate-900 mb-4">
                    {currentStep.title}
                  </h2>
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-4 inline-block text-left w-full shadow-inner">
                     <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-700 text-lg leading-relaxed">
                          {currentStep.detail}
                        </p>
                     </div>
                  </div>
                </div>
              </motion.div>
            )}

            {isFinished && (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-8"
              >
                <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                </div>
                <h2 className="font-display font-bold text-3xl text-slate-900 mb-2">
                  Materi Selesai!
                </h2>
                <div className="flex items-center gap-2 mb-6">
                   <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                   <span className="font-bold text-emerald-600">+100 XP</span>
                </div>
                
                <p className="text-slate-600 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
                  Kamu telah mempelajari seluruh tahapan <strong>{module.title}</strong>. 
                  Hebat! Terus kumpulkan XP belajarmu.
                </p>
                <button
                  onClick={onFinish}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all w-full max-w-xs text-lg"
                >
                  Kembali ke Materi
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isFinished && (
          <div className="p-6 md:p-8 border-t-2 border-slate-100 bg-white flex justify-between items-center">
            <span className="font-bold text-slate-400">
               {currentStepIndex + 1} dari {module.steps.length}
            </span>
            <button
              onClick={() => setCurrentStepIndex(p => p + 1)}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-200 transition-all text-lg"
            >
              Lanjut
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
