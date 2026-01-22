import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Module2QuizProps {
  onComplete: (score: number) => void;
}

const Module2Quiz = ({ onComplete }: Module2QuizProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 'q1',
      question: 'Active feedback means...',
      options: [
        { id: 'a', text: 'Feedback you collect passively from reviews' },
        { id: 'b', text: 'Feedback you actively solicit by asking customers directly' },
        { id: 'c', text: 'Feedback from your most active customers' },
        { id: 'd', text: 'Feedback that requires immediate action' },
      ],
      correct: 'b',
      correctFeedback: "You nailed it! Active feedback is when YOU initiate — surveys, interviews, exit questionnaires.",
      incorrectFeedback: "Not quite. Active feedback means you ask directly (surveys, interviews). Passive feedback is what customers share without you asking.",
    },
    {
      id: 'q2',
      question: 'True or False: Omnichannel listening is important because different customers use different channels to share feedback.',
      options: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
      correct: 'true',
      correctFeedback: "Exactly! Your happiest customers might leave reviews while frustrated ones vent on social media.",
      incorrectFeedback: "Actually, this is TRUE. Different customers prefer different channels. Missing a channel means missing voices.",
    },
    {
      id: 'q3',
      question: 'Closing the loop means telling customers you _____ their feedback and what you _____ about it.',
      options: [
        { id: 'a', text: 'received / ignored' },
        { id: 'b', text: 'heard / did' },
        { id: 'c', text: 'collected / stored' },
        { id: 'd', text: 'read / filed' },
      ],
      correct: 'b',
      correctFeedback: "Perfect! Closing the loop = acknowledging + taking action + telling them what changed.",
      incorrectFeedback: "Close! The answer is: you HEARD their feedback and what you DID about it.",
    },
  ];

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) newScore++;
    });
    setScore(newScore);
    setShowResults(true);
    onComplete(newScore);
  };

  const allAnswered = questions.every(q => answers[q.id]);

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="h-8 w-8 text-[hsl(var(--biz-blue))]" />
            <h2 className="text-2xl font-bold text-foreground">Quick Check: Do You Get the Components?</h2>
          </div>

          <div className="space-y-6">
            {questions.map((q, qIndex) => (
              <div key={q.id} className="bg-card border rounded-xl p-6">
                <p className="font-semibold text-foreground mb-4">
                  {qIndex + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        answers[q.id] === option.id
                          ? 'bg-[hsl(var(--biz-blue))]/10 border-[hsl(var(--biz-blue))]'
                          : 'hover:bg-muted/50 border-border'
                      } ${showResults && option.id === q.correct ? 'bg-[hsl(var(--biz-green))]/10 border-[hsl(var(--biz-green))]' : ''}`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={answers[q.id] === option.id}
                        onChange={() => handleAnswer(q.id, option.id)}
                        disabled={showResults}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        answers[q.id] === option.id ? 'border-[hsl(var(--biz-blue))] bg-[hsl(var(--biz-blue))]' : 'border-muted-foreground'
                      }`}>
                        {answers[q.id] === option.id && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className="text-sm text-foreground">{option.text}</span>
                    </label>
                  ))}
                </div>
                {showResults && (
                  <div className={`mt-4 p-3 rounded-lg ${answers[q.id] === q.correct ? 'bg-[hsl(var(--biz-green))]/10' : 'bg-red-50 dark:bg-red-950/30'}`}>
                    <div className="flex items-start gap-2">
                      {answers[q.id] === q.correct ? (
                        <CheckCircle className="h-5 w-5 text-[hsl(var(--biz-green))] flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      )}
                      <p className={`text-sm ${answers[q.id] === q.correct ? 'text-[hsl(var(--biz-green))]' : 'text-red-600 dark:text-red-400'}`}>
                        {answers[q.id] === q.correct ? q.correctFeedback : q.incorrectFeedback}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!showResults ? (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="w-full mt-6 bg-[hsl(var(--biz-blue))] hover:bg-[hsl(var(--biz-blue))]/90"
            >
              Check My Answers
            </Button>
          ) : (
            <div className={`mt-6 p-4 rounded-xl text-center ${score >= 2 ? 'bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/20' : 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800'}`}>
              <p className={`text-xl font-bold ${score >= 2 ? 'text-[hsl(var(--biz-green))]' : 'text-amber-700 dark:text-amber-300'}`}>
                {score}/3 — {score === 3 ? "Perfect! You nailed it!" : score >= 2 ? "Great job!" : "Keep learning!"}
              </p>
              {score >= 2 && <p className="text-sm text-muted-foreground mt-1">Module 3 is now unlocked!</p>}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Module2Quiz;
