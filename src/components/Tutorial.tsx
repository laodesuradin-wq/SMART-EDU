import { useState, useEffect } from "react";
import { Subject } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Star, FileText, Users, Monitor, Volume2, VolumeX, Clock } from "lucide-react";

interface TutorialProps {
  module: Subject;
  onBack: () => void;
  onFinish: () => void;
}

export function Tutorial({ module, onBack, onFinish }: TutorialProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const isFinished = currentStepIndex >= module.steps.length;

  const currentStep = module.steps[currentStepIndex];

  useEffect(() => {
    return () => {
       if ('speechSynthesis' in window) {
         window.speechSynthesis.cancel();
       }
    };
  }, []);

  useEffect(() => {
    if ('speechSynthesis' in window) {
       window.speechSynthesis.cancel();
       setIsPlayingAudio(false);
    }
    setTimeLeft(30 * 60);
  }, [currentStepIndex]);

  useEffect(() => {
    let interval: any;
    if (isPlayingAudio && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleAudio = (text: string) => {
     if (!('speechSynthesis' in window)) {
        alert("Browser tidak mendukung fitur suara.");
        return;
     }
     
     if (isPlayingAudio) {
       window.speechSynthesis.cancel();
       setIsPlayingAudio(false);
     } else {
       window.speechSynthesis.cancel(); // Clear any pending speech
       
       const utterance = new SpeechSynthesisUtterance(text);
       utterance.lang = 'id-ID';
       utterance.rate = 0.9;
       utterance.volume = 1;
       
       // Handle voice selection
       const voices = window.speechSynthesis.getVoices();
       if (voices.length > 0) {
          const indoVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'));
          if (indoVoice) utterance.voice = indoVoice;
       }
       
       utterance.onstart = () => setIsPlayingAudio(true);
       utterance.onend = () => setIsPlayingAudio(false);
       utterance.onerror = (e) => {
         console.error("Speech error", e);
         setIsPlayingAudio(false);
       };
       
       // Prevent garbage collection bug in some browsers (like Chrome/Safari)
       // by attaching it to the window object temporarily
       (window as any).currentUtterance = utterance;
       
       window.speechSynthesis.speak(utterance);
     }
  };

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
          <div className="relative w-full min-h-[500px] md:aspect-video bg-slate-950 border-b-2 border-slate-100 overflow-hidden flex flex-col md:flex-row items-center justify-between p-4 md:p-8 gap-6 md:gap-8">
             
             {/* Smart Board */}
             <div className="z-10 w-full md:flex-1 h-full min-h-[300px] bg-slate-900 border-2 border-slate-700/50 rounded-2xl p-5 md:p-8 flex flex-col shadow-2xl relative overflow-hidden backdrop-blur-md order-2 md:order-1 mt-4 md:mt-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />
                <div className="flex items-start justify-between gap-4 mb-4 md:mb-6">
                  <h1 className="font-display font-bold text-xl md:text-3xl text-slate-100 flex items-center gap-3">
                     <Monitor className="w-6 h-6 md:w-8 md:h-8 text-blue-400 shrink-0" />
                     {currentStep.title}
                  </h1>
                  <div className="flex items-center gap-2 md:gap-3 shrink-0">
                     <div className="bg-slate-800/80 text-emerald-400 font-medium px-2 py-1 md:px-3 md:py-1.5 rounded-lg border border-slate-700 flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-xs md:text-sm">
                        <span className="text-slate-300 hidden md:inline">Sesi Materi:</span>
                        <div className="flex items-center gap-1.5 font-mono font-bold bg-slate-900/50 px-2 py-0.5 rounded">
                           <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
                           {formatTime(timeLeft)}
                        </div>
                     </div>
                     <button 
                       onClick={() => toggleAudio(currentStep.detail)}
                       className={`shrink-0 p-2.5 md:p-3 rounded-full transition-colors flex items-center gap-2 ${isPlayingAudio ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
                       title={isPlayingAudio ? "Stop penyampaian materi" : "Mulai penyampaian materi"}
                     >
                       {isPlayingAudio ? <VolumeX className="w-5 h-5 md:w-6 md:h-6" /> : <Volume2 className="w-5 h-5 md:w-6 md:h-6" />}
                     </button>
                  </div>
                </div>
                <div className="text-emerald-50 text-base md:text-xl leading-relaxed md:leading-loose font-medium overflow-y-auto pr-2 pb-8 md:pb-0 z-10 relative">
                   {currentStep.detail}
                </div>

                {/* Simulated Progress Bar */}
                {isPlayingAudio && (
                  <div className="absolute bottom-0 left-0 w-full bg-slate-800 flex flex-col">
                     <div className="text-[10px] md:text-xs text-emerald-400/80 px-4 py-1 font-medium tracking-wider uppercase">
                       Sesi 30 Menit: Tutor Sandra sedang menyampaikan materi...
                     </div>
                     <div className="w-full h-1.5 md:h-2 bg-slate-700">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                          initial={{ width: "0%" }}
                          animate={{ width: `${((30 * 60 - timeLeft) / (30 * 60)) * 100}%` }}
                          transition={{ ease: "linear", duration: 1 }}
                        />
                     </div>
                  </div>
                )}
             </div>

             {/* Divider */}
             <div className="w-px h-3/4 bg-slate-800/50 hidden md:block order-2"></div>

             {/* AI Avatar */}
             <div className="z-10 flex flex-col items-center justify-center shrink-0 w-full md:w-1/4 order-1 md:order-3 pt-12 md:pt-0">
                <div className="relative flex items-center justify-center">
                   <motion.div 
                     className="absolute w-32 h-32 md:w-48 md:h-48 bg-blue-500/20 rounded-full blur-3xl"
                     animate={isPlayingAudio ? { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] } : { scale: 1, opacity: 0.1 }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   />
                   <motion.div 
                     className="absolute w-24 h-24 md:w-32 md:h-32 bg-emerald-500/20 rounded-full blur-2xl"
                     animate={isPlayingAudio ? { scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] } : { scale: 1, opacity: 0.1 }}
                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   />
                   <motion.div 
                      className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br flex items-center justify-center shadow-2xl border-4 ${isPlayingAudio ? 'from-emerald-400 to-teal-600 border-slate-700' : 'from-slate-600 to-slate-800 border-slate-900 grayscale'}`}
                      animate={isPlayingAudio ? { y: [0, -5, 0] } : { y: 0 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   >
                      <span className="text-white font-display font-bold text-5xl md:text-7xl">S</span>
                   </motion.div>
                </div>
                 
                 {/* Voice visualizer */}
                 <div className={`flex items-center gap-1.5 mt-6 md:mt-8 px-4 py-2 md:px-5 md:py-2.5 rounded-full backdrop-blur-sm border transition-colors ${isPlayingAudio ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-900 border-slate-800'}`}>
                    <motion.div className="w-1.5 md:w-2 bg-emerald-400 rounded-full" animate={isPlayingAudio ? { height: [8, 16, 8] } : { height: 4 }} transition={{ duration: 0.5, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-1.5 md:w-2 bg-emerald-400 rounded-full" animate={isPlayingAudio ? { height: [16, 6, 16] } : { height: 4 }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} />
                    <motion.div className="w-1.5 md:w-2 bg-emerald-400 rounded-full" animate={isPlayingAudio ? { height: [10, 20, 10] } : { height: 4 }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-1.5 md:w-2 bg-emerald-400 rounded-full" animate={isPlayingAudio ? { height: [18, 8, 18] } : { height: 4 }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }} />
                    <motion.div className="w-1.5 md:w-2 bg-emerald-400 rounded-full" animate={isPlayingAudio ? { height: [10, 14, 10] } : { height: 4 }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }} />
                 </div>
             </div>

            {/* Dark gradient overlay for bottom text */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent pointer-events-none" />
            
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none z-20">
               <div className="bg-rose-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl flex items-center gap-1.5 shadow-md">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white animate-pulse" />
                  LIVE AI TUTOR
               </div>
               <div className="bg-slate-800/80 backdrop-blur-md text-slate-200 text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl flex items-center gap-1 shadow-md border border-slate-700">
                  <Users className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  1.2K
               </div>
            </div>

            {module.sourceName && module.sourceUrl && (
               <a 
                 href={module.sourceUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md border border-white/20 transition-colors z-30 pointer-events-auto"
                 title="Buka sumber materi"
               >
                 <BookOpen className="w-3.5 h-3.5" />
                 Materi: {module.sourceName}
               </a>
            )}

            <div className="absolute bottom-3 md:bottom-5 left-4 md:left-6 right-4 md:right-6 text-white pointer-events-none z-20">
              <h3 className="font-display font-bold text-sm md:text-xl text-shadow mb-0.5 md:mb-1">Sesi Interaktif: {module.title}</h3>
              <p className="text-emerald-400 text-[10px] md:text-sm font-medium animate-pulse">{isPlayingAudio ? "Sesi 30 Menit: Tutor AI Sandra sedang menyampaikan materi..." : "Sesi 30 Menit: Tutor AI siap menyampaikan materi"}</p>
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
