import { NextResponse } from 'next/server';

// Dados simulados para desenvolvimento
const mockPills = [
  {
    id: '1',
    title: 'Conceitos Básicos',
    slug: 'conceitos-basicos',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'O que é Direito?'
      },
      {
        type: 'paragraph',
        text: 'O Direito é um conjunto de normas que regulam a vida em sociedade, estabelecendo direitos e deveres para os indivíduos e organizações.'
      },
      {
        type: 'paragraph',
        text: 'Essas normas têm como objetivo principal manter a ordem social, garantir a justiça e proteger os direitos fundamentais de todos os cidadãos.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Características do Direito'
      },
      {
        type: 'list',
        ordered: false,
        items: [
          'Bilateralidade: estabelece direitos e deveres',
          'Imperatividade: suas normas são obrigatórias',
          'Coercibilidade: pode ser imposto pela força',
          'Heteronomia: vem de uma autoridade externa'
        ]
      }
    ],
    videoUrl: null,
    module: {
      id: '1',
      title: 'Introdução ao Direito',
      slug: 'introducao-ao-direito'
    },
    quizzes: [
      {
        id: '1',
        questions: [
          {
            id: '1',
            text: 'O que é Direito?',
            type: 'MULTIPLE_CHOICE',
            options: [
              { text: 'Um conjunto de normas que regulam a vida em sociedade', isCorrect: true },
              { text: 'Apenas leis escritas pelo governo', isCorrect: false },
              { text: 'Regras criadas pelos juízes', isCorrect: false },
              { text: 'Costumes antigos da sociedade', isCorrect: false }
            ],
            explanation: 'O Direito é um conjunto de normas que regulam a vida em sociedade, estabelecendo direitos e deveres.'
          },
          {
            id: '2',
            text: 'Qual das seguintes é uma característica do Direito?',
            type: 'MULTIPLE_CHOICE',
            options: [
              { text: 'Opcional', isCorrect: false },
              { text: 'Imperativo', isCorrect: true },
              { text: 'Sugestivo', isCorrect: false },
              { text: 'Temporário', isCorrect: false }
            ],
            explanation: 'A imperatividade é uma característica fundamental do Direito, tornando suas normas obrigatórias.'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Fontes do Direito',
    slug: 'fontes-do-direito',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Fontes do Direito'
      },
      {
        type: 'paragraph',
        text: 'As fontes do Direito são os meios pelos quais as normas jurídicas se manifestam e se tornam conhecidas na sociedade.'
      },
      {
        type: 'heading',
        level: 3,
        text: 'Fontes Formais'
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Lei: norma escrita emanada do Poder Legislativo',
          'Costume: prática reiterada aceita como obrigatória',
          'Jurisprudência: decisões reiteradas dos tribunais',
          'Doutrina: opinião dos estudiosos do Direito'
        ]
      }
    ],
    videoUrl: null,
    module: {
      id: '1',
      title: 'Introdução ao Direito',
      slug: 'introducao-ao-direito'
    },
    quizzes: [
      {
        id: '2',
        questions: [
          {
            id: '3',
            text: 'Qual é a principal fonte formal do Direito no Brasil?',
            type: 'MULTIPLE_CHOICE',
            options: [
              { text: 'Costume', isCorrect: false },
              { text: 'Lei', isCorrect: true },
              { text: 'Jurisprudência', isCorrect: false },
              { text: 'Doutrina', isCorrect: false }
            ],
            explanation: 'A lei é a principal fonte formal do Direito no Brasil, sendo norma escrita emanada do Poder Legislativo.'
          }
        ]
      }
    ]
  }
];

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Simular um pequeno delay para parecer real
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const pill = mockPills.find(p => p.slug === params.slug);

    if (!pill) {
      return NextResponse.json(
        { error: 'Pílula não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(pill);
  } catch (error) {
    console.error('Erro ao buscar pílula:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar pílula' },
      { status: 500 }
    );
  }
}