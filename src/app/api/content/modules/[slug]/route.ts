import { NextResponse } from 'next/server';

// Dados simulados para desenvolvimento
const mockModules = [
  {
    id: '1',
    title: 'Introdução ao Direito',
    slug: 'introducao-ao-direito',
    description: 'Conceitos fundamentais do Direito e sua importância na sociedade.',
    order: 1,
    imageUrl: null,
    pills: [
      {
        id: '1',
        title: 'Conceitos Básicos',
        slug: 'conceitos-basicos',
        order: 1,
        videoUrl: null,
      },
      {
        id: '2',
        title: 'Fontes do Direito',
        slug: 'fontes-do-direito',
        order: 2,
        videoUrl: null,
      },
      {
        id: '3',
        title: 'Aplicação das Normas',
        slug: 'aplicacao-das-normas',
        order: 3,
        videoUrl: null,
      },
      {
        id: '4',
        title: 'Interpretação Jurídica',
        slug: 'interpretacao-juridica',
        order: 4,
        videoUrl: null,
      },
      {
        id: '5',
        title: 'Quiz de Revisão',
        slug: 'quiz-revisao',
        order: 5,
        videoUrl: null,
      }
    ]
  },
  {
    id: '2',
    title: 'Direito Constitucional',
    slug: 'direito-constitucional',
    description: 'Estudo da Constituição Federal e seus princípios fundamentais.',
    order: 2,
    imageUrl: null,
    pills: [
      {
        id: '6',
        title: 'Princípios Constitucionais',
        slug: 'principios-constitucionais',
        order: 1,
        videoUrl: null,
      },
      {
        id: '7',
        title: 'Direitos Fundamentais',
        slug: 'direitos-fundamentais',
        order: 2,
        videoUrl: null,
      },
      {
        id: '8',
        title: 'Organização do Estado',
        slug: 'organizacao-do-estado',
        order: 3,
        videoUrl: null,
      },
      {
        id: '9',
        title: 'Controle de Constitucionalidade',
        slug: 'controle-constitucionalidade',
        order: 4,
        videoUrl: null,
      },
      {
        id: '10',
        title: 'Processo Legislativo',
        slug: 'processo-legislativo',
        order: 5,
        videoUrl: null,
      },
      {
        id: '11',
        title: 'Poder Judiciário',
        slug: 'poder-judiciario',
        order: 6,
        videoUrl: null,
      },
      {
        id: '12',
        title: 'Poder Executivo',
        slug: 'poder-executivo',
        order: 7,
        videoUrl: null,
      },
      {
        id: '13',
        title: 'Quiz Final',
        slug: 'quiz-final',
        order: 8,
        videoUrl: null,
      }
    ]
  },
  {
    id: '3',
    title: 'Direito Civil',
    slug: 'direito-civil',
    description: 'Relações jurídicas entre particulares e seus direitos.',
    order: 3,
    imageUrl: null,
    pills: [
      {
        id: '14',
        title: 'Pessoas Naturais',
        slug: 'pessoas-naturais',
        order: 1,
        videoUrl: null,
      },
      {
        id: '15',
        title: 'Pessoas Jurídicas',
        slug: 'pessoas-juridicas',
        order: 2,
        videoUrl: null,
      },
      {
        id: '16',
        title: 'Bens e Patrimônio',
        slug: 'bens-patrimonio',
        order: 3,
        videoUrl: null,
      },
      {
        id: '17',
        title: 'Fatos Jurídicos',
        slug: 'fatos-juridicos',
        order: 4,
        videoUrl: null,
      },
      {
        id: '18',
        title: 'Negócios Jurídicos',
        slug: 'negocios-juridicos',
        order: 5,
        videoUrl: null,
      },
      {
        id: '19',
        title: 'Contratos',
        slug: 'contratos',
        order: 6,
        videoUrl: null,
      },
      {
        id: '20',
        title: 'Responsabilidade Civil',
        slug: 'responsabilidade-civil',
        order: 7,
        videoUrl: null,
      },
      {
        id: '21',
        title: 'Direitos Reais',
        slug: 'direitos-reais',
        order: 8,
        videoUrl: null,
      },
      {
        id: '22',
        title: 'Direito de Família',
        slug: 'direito-familia',
        order: 9,
        videoUrl: null,
      },
      {
        id: '23',
        title: 'Direito das Sucessões',
        slug: 'direito-sucessoes',
        order: 10,
        videoUrl: null,
      },
      {
        id: '24',
        title: 'Casos Práticos',
        slug: 'casos-praticos',
        order: 11,
        videoUrl: null,
      },
      {
        id: '25',
        title: 'Avaliação Final',
        slug: 'avaliacao-final',
        order: 12,
        videoUrl: null,
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
    
    const moduleData = mockModules.find(module => module.slug === params.slug);

    if (!moduleData) {
      return NextResponse.json(
        { error: 'Módulo não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(moduleData);
  } catch (error) {
    console.error('Erro ao buscar módulo:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar módulo' },
      { status: 500 }
    );
  }
}