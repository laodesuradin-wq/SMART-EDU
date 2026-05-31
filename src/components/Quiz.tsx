import { useState } from "react";
import { QuizQuestion } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, ArrowRight, RefreshCw, Trophy, Star, Zap } from "lucide-react";

interface QuizProps {
  questions: QuizQuestion[];
  onFinish: (score: number) => void;
}

export function Quiz({ questions, onFinish }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const isCompleted = currentIndex >= questions.length;
  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      {!isCompleted ? (
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-sm mb-2">
           <div className="flex gap-2 items-center">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-700">Soal {currentIndex + 1} / {questions.length}</span>
           </div>
           
           <div className="flex gap-1">
             {questions.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-2.5 w-6 rounded-full transition-colors ${
                    idx < currentIndex ? 'bg-emerald-500' : idx === currentIndex ? 'bg-amber-500' : 'bg-slate-200'
                  }`}
                />
             ))}
           </div>
        </div>
      ) : null}

      <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-sm p-6 md:p-10 relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!isCompleted && currentQuestion ? (
            <motion.div
              key={`question-${currentIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display font-medium text-2xl md:text-3xl text-slate-800 mb-8 leading-snug">
                {currentQuestion.question}
              </h2>

              <div className="flex flex-col gap-3 mb-8">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctAnswerIndex;
                  const showResult = isAnswered;
                  
                  let optStyle = "border-slate-200 hover:border-amber-400 hover:bg-amber-50";
                  
                  if (showResult) {
                    if (isCorrect) optStyle = "bg-emerald-50 border-emerald-500 text-emerald-900";
                    else if (isSelected && !isCorrect) optStyle = "bg-rose-50 border-rose-500 text-rose-900";
                    else optStyle = "opacity-50 border-slate-200";
                  } else if (isSelected) {
                    optStyle = "bg-amber-50 border-amber-500 text-amber-900";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`text-left p-4 md:p-5 rounded-2xl border-2 transition-all font-medium flex justify-between items-center ${optStyle}`}
                    >
                      <span className="text-lg">{option}</span>
                      {showResult && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 ml-2" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isAnswered && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="overflow-hidden"
                  >
                    <div className={`p-5 rounded-2xl mb-8 border-2 ${selectedOption === currentQuestion.correctAnswerIndex ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                      <h4 className={`font-bold mb-1 flex items-center gap-2 ${selectedOption === currentQuestion.correctAnswerIndex ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {selectedOption === currentQuestion.correctAnswerIndex ? 'Yeay! Jawaban Benar 🥳' : 'Yah, Kurang Tepat 😥'}
                      </h4>
                      <p className="text-slate-700 text-sm leading-relaxed mt-2 bg-white/60 p-3 rounded-xl border border-black/5">
                        <span className="font-bold text-slate-800">Penjelasan:</span><br/>
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-end">
                <button
                  disabled={!isAnswered}
                  onClick={handleNext}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold transition-all w-full md:w-auto justify-center ${
                    isAnswered 
                      ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-200 translate-y-0' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {currentIndex === questions.length - 1 ? 'Lihat Hasil' : 'Lanjut'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quiz-complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-10 text-center"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center mb-8 shadow-xl shadow-amber-200">
                <Trophy className="w-16 h-16 text-white" />
              </div>
              
              <h2 className="font-display font-bold text-4xl text-slate-900 mb-2">
                Skor Akhir
              </h2>
              <div className="flex items-center justify-center gap-2 mb-8">
                 <span className="text-6xl font-black text-amber-500">{score * 100}</span>
                 <span className="text-2xl font-bold text-slate-400 mt-4">XP</span>
              </div>
              
              <div className="bg-blue-50 text-blue-800 px-6 py-4 rounded-2xl font-medium flex items-center gap-3 mb-10 w-full max-w-xs">
                 <Star className="w-6 h-6 text-amber-500 fill-amber-500 flex-shrink-0" />
                 Kamu berhasil menyelesaikan {score} dari {questions.length} pertanyaan!
              </div>

              <div className="flex flex-col w-full gap-4 max-w-sm">
                <button
                  onClick={() => onFinish(score)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all font-display text-lg"
                >
                  Klaim XP & Selesai
                </button>
                <button
                  onClick={resetQuiz}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-slate-200 hover:bg-slate-50 text-slate-600 rounded-2xl font-bold transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                  Coba Lagi
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
