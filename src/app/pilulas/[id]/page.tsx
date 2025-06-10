'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { RichContent, ContentType } from '@/components/content/RichContent';

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
  content: ContentType[];
  videoUrl: string | null;
  quizzes: Quiz[];
  module: {
    id: string;
    title: string;
    slug: string;
  };
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
    if (pill && Array.isArray(pill.content) && currentSection < pill.content.length - 1) {
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
    if (!pill || !pill.quizzes[0]) return;

    const correctAnswers = pill.quizzes[0].questions.reduce((acc, question) => {
      const correctOption = question.options.find(opt => opt.isCorrect);
      return acc + (selectedAnswers[question.id] === correctOption?.text ? 1 : 0);
    }, 0);

    const score = Math.round((correctAnswers / pill.quizzes[0].questions.length) * 100);
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
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0071e3]"></div>
      </div>
    );
  }

  if (error || !pill) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">
            Erro ao carregar pílula: {error || 'Pílula não encontrada'}
          </div>
          <Link href="/modulos">
            <Button>Voltar para Módulos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const contentSections = Array.isArray(pill.content) ? pill.content : [pill.content];
  const quiz = pill.quizzes[0];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Link 
              href={`/modulos/${pill.module.slug}`}
              className="text-[#0071e3] hover:text-[#0077ED] font-medium text-sm transition-colors duration-200"
            >
              ← {pill.module.title}
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2">{pill.title}</h1>
          
          {!showQuiz ? (
            <div className="mb-4">
              <Progress 
                value={(currentSection / contentSections.length) * 100} 
                className="mb-2"
              />
              <p className="text-sm text-[#86868b]">
                Seção {currentSection + 1} de {contentSections.length}
              </p>
            </div>
          ) : (
            quiz && (
              <div className="mb-4">
                <Progress 
                  value={(currentQuestion / quiz.questions.length) * 100} 
                  className="mb-2"
                />
                <p className="text-sm text-[#86868b]">
                  Questão {currentQuestion + 1} de {quiz.questions.length}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showQuiz ? (
          <>
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="prose max-w-none">
                  <RichContent content={contentSections[currentSection]} />
                </div>
              </CardContent>
            </Card>

            {pill.videoUrl && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={pill.videoUrl}
                      className="w-full h-full"
                      allowFullScreen
                      title="Vídeo da pílula"
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
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </Button>
              <Button 
                onClick={handleNextSection}
                className="flex items-center space-x-2 bg-[#0071e3] hover:bg-[#0077ED]"
              >
                <span>
                  {currentSection === contentSections.length - 1 ? 'Iniciar Quiz' : 'Próximo'}
                </span>
                {currentSection !== contentSections.length - 1 && <ChevronRight className="w-4 h-4" />}
              </Button>
            </div>
          </>
        ) : (
          <>
            {!quizCompleted && quiz ? (
              <>
                <Card className="mb-8">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">
                      {quiz.questions[currentQuestion].text}
                    </h2>
                    <div className="space-y-4">
                      {quiz.questions[currentQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            selectedAnswers[quiz.questions[currentQuestion].id] === option.text
                              ? 'default'
                              : 'outline'
                          }
                          className="w-full justify-start text-left p-4 h-auto"
                          onClick={() => handleAnswerSelect(
                            quiz.questions[currentQuestion].id,
                            option.text
                          )}
                        >
                          <span className="text-wrap">{option.text}</span>
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
                    className="flex items-center space-x-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </Button>
                  <Button
                    onClick={() => {
                      if (currentQuestion === quiz.questions.length - 1) {
                        handleQuizSubmit();
                      } else {
                        setCurrentQuestion(prev => prev + 1);
                      }
                    }}
                    disabled={!selectedAnswers[quiz.questions[currentQuestion].id]}
                    className="flex items-center space-x-2 bg-[#0071e3] hover:bg-[#0077ED]"
                  >
                    <span>
                      {currentQuestion === quiz.questions.length - 1 ? 'Finalizar Quiz' : 'Próximo'}
                    </span>
                    {currentQuestion !== quiz.questions.length - 1 && <ChevronRight className="w-4 h-4" />}
                  </Button>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="flex justify-center mb-6">
                      {quizScore && quizScore >= 70 ? (
                        <CheckCircle className="h-20 w-20 text-green-500" />
                      ) : (
                        <XCircle className="h-20 w-20 text-yellow-500" />
                      )}
                    </div>
                    <h2 className="text-3xl font-bold text-[#1d1d1f] mb-4">
                      {quizScore && quizScore >= 70 ? 'Parabéns!' : 'Quiz Concluído!'}
                    </h2>
                    <p className="text-2xl font-semibold text-[#0071e3] mb-4">
                      Sua pontuação: {quizScore}%
                    </p>
                    <p className="text-[#86868b] mb-8 text-lg">
                      {quizScore && quizScore >= 70
                        ? 'Você demonstrou excelente compreensão do conteúdo!'
                        : 'Continue estudando para melhorar sua pontuação.'}
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Link href={`/modulos/${pill.module.slug}`}>
                        <Button variant="outline" className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4" />
                          <span>Voltar ao Módulo</span>
                        </Button>
                      </Link>
                      <Link href="/modulos">
                        <Button className="bg-[#0071e3] hover:bg-[#0077ED]">
                          Explorar Outros Módulos
                        </Button>
                      </Link>
                    </div>
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