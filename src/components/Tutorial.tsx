import { useState, useEffect } from "react";
import { Subject } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Star, FileText, Users, Monitor, Volume2, VolumeX, Clock } from "lucide-react";

interface TutorialProps {
  module: Subject;
  onBack: () => void;
  onFinish: () => void;
  onGoToQuiz?: () => void;
}

export function Tutorial({ module, onBack, onFinish, onGoToQuiz }: TutorialProps) {
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

                  {currentStep.imageUrl && (
                    <div className="mb-6 rounded-2xl overflow-hidden border-4 border-white shadow-lg aspect-video w-full bg-slate-100">
                      <img 
                        src={currentStep.imageUrl} 
                        alt={currentStep.title} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                  )}

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
                <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
                  {onGoToQuiz ? (
                    <>
                      <button
                        onClick={onGoToQuiz}
                        className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 transition-all text-lg flex items-center justify-center gap-2"
                      >
                        Mulai Latihan
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      <button
                        onClick={onFinish}
                        className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold shadow-sm transition-all text-base"
                      >
                        Kembali ke Materi
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={onFinish}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all text-lg"
                    >
                      Kembali ke Materi
                    </button>
                  )}
                </div>
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
