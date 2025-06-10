'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

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

interface Quiz {
  id: string;
  questions: Question[];
}

interface Pill {
  id: string;
  title: string;
  content: {
    sections: {
      title: string;
      content: string;
    }[];
  };
  videoUrl: string | null;
  quiz: Quiz;
}

export default function PillPage({ params }: { params: { id: string } }) {
  const [pill, setPill] = useState<Pill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchPill = async () => {
      try {
        const response = await fetch(`/api/content/pills/${params.id}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar pílula');
        }
        const data = await response.json();
        setPill(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchPill();
  }, [params.id]);

  const handleNextSection = () => {
    if (pill && currentSection < pill.content.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleQuizSubmit = async () => {
    if (!pill) return;

    const correctAnswers = pill.quiz.questions.reduce((acc, question) => {
      const correctOption = question.options.find(opt => opt.isCorrect);
      return acc + (selectedAnswers[question.id] === correctOption?.text ? 1 : 0);
    }, 0);

    const score = Math.round((correctAnswers / pill.quiz.questions.length) * 100);
    setQuizScore(score);
    setQuizCompleted(true);

    // Registrar progresso
    try {
      await fetch('/api/user/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pillId: pill.id,
          score
        })
      });
    } catch (err) {
      console.error('Erro ao registrar progresso:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !pill) {
    return (
      <div className="p-4 text-red-500">
        Erro ao carregar pílula: {error || 'Pílula não encontrada'}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{pill.title}</h1>
        
        {!showQuiz ? (
          <>
            <div className="mb-6">
              <Progress 
                value={(currentSection / pill.content.sections.length) * 100} 
                className="mb-2"
              />
              <p className="text-sm text-muted-foreground">
                Seção {currentSection + 1} de {pill.content.sections.length}
              </p>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {pill.content.sections[currentSection].title}
                </h2>
                <div className="prose max-w-none">
                  {pill.content.sections[currentSection].content}
                </div>
              </CardContent>
            </Card>

            {pill.videoUrl && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="aspect-video">
                    <iframe
                      src={pill.videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousSection}
                disabled={currentSection === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button onClick={handleNextSection}>
                {currentSection === pill.content.sections.length - 1 ? (
                  'Iniciar Quiz'
                ) : (
                  <>
                    Próximo
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            {!quizCompleted ? (
              <>
                <div className="mb-6">
                  <Progress 
                    value={(currentQuestion / pill.quiz.questions.length) * 100} 
                    className="mb-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Questão {currentQuestion + 1} de {pill.quiz.questions.length}
                  </p>
                </div>

                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      {pill.quiz.questions[currentQuestion].text}
                    </h2>
                    <div className="space-y-4">
                      {pill.quiz.questions[currentQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            selectedAnswers[pill.quiz.questions[currentQuestion].id] === option.text
                              ? 'default'
                              : 'outline'
                          }
                          className="w-full justify-start"
                          onClick={() => handleAnswerSelect(
                            pill.quiz.questions[currentQuestion].id,
                            option.text
                          )}
                        >
                          {option.text}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(prev => prev - 1)}
                    disabled={currentQuestion === 0}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Anterior
                  </Button>
                  <Button
                    onClick={() => {
                      if (currentQuestion === pill.quiz.questions.length - 1) {
                        handleQuizSubmit();
                      } else {
                        setCurrentQuestion(prev => prev + 1);
                      }
                    }}
                  >
                    {currentQuestion === pill.quiz.questions.length - 1 ? (
                      'Finalizar Quiz'
                    ) : (
                      <>
                        Próximo
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
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
                    <Link href="/modulos">
                      <Button>
                        Voltar para Módulos
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}