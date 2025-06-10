'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_IN_THE_BLANK';
  explanation: string | null;
}

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(false);
    } else {
      handleQuizSubmit();
    }
  };

  const handleQuizSubmit = () => {
    const correctAnswers = questions.reduce((acc, question) => {
      const correctOption = question.options.find(opt => opt.isCorrect);
      return acc + (selectedAnswers[question.id] === correctOption?.text ? 1 : 0);
    }, 0);

    const score = Math.round((correctAnswers / questions.length) * 100);
    setQuizScore(score);
    setQuizCompleted(true);
    onComplete(score);
  };

  if (quizCompleted) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              {quizScore === 100 ? 'Parabéns!' : 'Quiz Concluído!'}
            </h2>
            <div className="flex justify-center mb-4">
              {quizScore === 100 ? (
                <CheckCircle className="h-16 w-16 text-green-500" />
              ) : (
                <XCircle className="h-16 w-16 text-yellow-500" />
              )}
            </div>
            <p className="text-xl mb-4">
              Sua pontuação: {quizScore}%
            </p>
            <p className="text-muted-foreground mb-6">
              {quizScore === 100
                ? 'Você acertou todas as questões!'
                : 'Continue estudando para melhorar sua pontuação.'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQ.id];
  const correctAnswer = currentQ.options.find(opt => opt.isCorrect)?.text;

  return (
    <div className="space-y-6">
      <div>
        <Progress 
          value={(currentQuestion / questions.length) * 100} 
          className="mb-2"
        />
        <p className="text-sm text-muted-foreground">
          Questão {currentQuestion + 1} de {questions.length}
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {currentQ.text}
          </h2>
          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  showExplanation
                    ? option.isCorrect
                      ? 'default'
                      : selectedAnswer === option.text
                      ? 'destructive'
                      : 'outline'
                    : selectedAnswer === option.text
                    ? 'default'
                    : 'outline'
                }
                className="w-full justify-start"
                onClick={() => {
                  if (!showExplanation) {
                    handleAnswerSelect(currentQ.id, option.text);
                    setShowExplanation(true);
                  }
                }}
                disabled={showExplanation}
              >
                {option.text}
              </Button>
            ))}
          </div>

          {showExplanation && currentQ.explanation && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm">{currentQ.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleNextQuestion}>
                {currentQuestion === questions.length - 1
                  ? 'Finalizar Quiz'
                  : 'Próxima Questão'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 