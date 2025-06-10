'use client';

import { use, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, BookOpen, Clock, Target, Tag } from 'lucide-react';
import Link from 'next/link';
import { RichContent, ContentType } from '@/components/content/RichContent';
import { findPillBySlug, MockPill } from '@/lib/mockData';

export default function PillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [pill, setPill] = useState<MockPill | null>(null);
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
        const foundPill = findPillBySlug(slug);
        if (foundPill) {
          setPill(foundPill);
        } else {
          setError('Pílula não encontrada');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchPill();
  }, [slug]);

  const handleNextSection = () => {
    if (pill && Array.isArray(pill.content) && currentSection < pill.content.length - 1) {
      setCurrentSection(currentSection + 1);
    } else if (pill && pill.quizzes.length > 0) {
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
          <Link href="/formacoes">
            <Button>Voltar às Formações</Button>
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
              href={pill.module ? `/modulos/${pill.module.slug}` : "/formacoes"}
              className="text-[#0071e3] hover:text-[#0077ED] font-medium text-sm transition-colors duration-200"
            >
              ← {pill.module ? pill.module.title : 'Voltar'}
            </Link>
            {pill.subject && (
              <div className="flex items-center space-x-2">
                <div 
                  className="w-6 h-6 rounded-lg"
                  style={{ backgroundColor: pill.subject.color }}
                ></div>
                <span className="text-sm text-[#86868b]">{pill.subject.title}</span>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-[#1d1d1f] mb-4">{pill.title}</h1>
          
          {/* Metadados da Pílula */}
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center space-x-2 text-sm text-[#86868b]">
              <Clock className="w-4 h-4" />
              <span>{pill.estimatedTime} min</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-[#86868b]">
              <Target className="w-4 h-4" />
              <span>{pill.difficulty}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-[#86868b]">
              <Tag className="w-4 h-4" />
              <span>{pill.tags.join(', ')}</span>
            </div>
          </div>
          
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
                  {currentSection === contentSections.length - 1 
                    ? (quiz ? 'Iniciar Quiz' : 'Concluir') 
                    : 'Próximo'}
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
                      <Link href={pill.module ? `/modulos/${pill.module.slug}` : "/formacoes"}>
                        <Button variant="outline" className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{pill.module ? 'Voltar ao Módulo' : 'Voltar às Formações'}</span>
                        </Button>
                      </Link>
                      <Link href="/formacoes">
                        <Button className="bg-[#0071e3] hover:bg-[#0077ED]">
                          Explorar Outras Formações
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