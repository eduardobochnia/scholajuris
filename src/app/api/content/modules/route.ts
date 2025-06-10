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
      },
      {
        id: '2',
        title: 'Fontes do Direito',
        slug: 'fontes-do-direito',
        order: 2,
      },
      {
        id: '3',
        title: 'Aplicação das Normas',
        slug: 'aplicacao-das-normas',
        order: 3,
      },
      {
        id: '4',
        title: 'Interpretação Jurídica',
        slug: 'interpretacao-juridica',
        order: 4,
      },
      {
        id: '5',
        title: 'Quiz de Revisão',
        slug: 'quiz-revisao',
        order: 5,
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
      },
      {
        id: '7',
        title: 'Direitos Fundamentais',
        slug: 'direitos-fundamentais',
        order: 2,
      },
      {
        id: '8',
        title: 'Organização do Estado',
        slug: 'organizacao-do-estado',
        order: 3,
      },
      {
        id: '9',
        title: 'Controle de Constitucionalidade',
        slug: 'controle-constitucionalidade',
        order: 4,
      },
      {
        id: '10',
        title: 'Processo Legislativo',
        slug: 'processo-legislativo',
        order: 5,
      },
      {
        id: '11',
        title: 'Poder Judiciário',
        slug: 'poder-judiciario',
        order: 6,
      },
      {
        id: '12',
        title: 'Poder Executivo',
        slug: 'poder-executivo',
        order: 7,
      },
      {
        id: '13',
        title: 'Quiz Final',
        slug: 'quiz-final',
        order: 8,
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
      },
      {
        id: '15',
        title: 'Pessoas Jurídicas',
        slug: 'pessoas-juridicas',
        order: 2,
      },
      {
        id: '16',
        title: 'Bens e Patrimônio',
        slug: 'bens-patrimonio',
        order: 3,
      },
      {
        id: '17',
        title: 'Fatos Jurídicos',
        slug: 'fatos-juridicos',
        order: 4,
      },
      {
        id: '18',
        title: 'Negócios Jurídicos',
        slug: 'negocios-juridicos',
        order: 5,
      },
      {
        id: '19',
        title: 'Contratos',
        slug: 'contratos',
        order: 6,
      },
      {
        id: '20',
        title: 'Responsabilidade Civil',
        slug: 'responsabilidade-civil',
        order: 7,
      },
      {
        id: '21',
        title: 'Direitos Reais',
        slug: 'direitos-reais',
        order: 8,
      },
      {
        id: '22',
        title: 'Direito de Família',
        slug: 'direito-familia',
        order: 9,
      },
      {
        id: '23',
        title: 'Direito das Sucessões',
        slug: 'direito-sucessoes',
        order: 10,
      },
      {
        id: '24',
        title: 'Casos Práticos',
        slug: 'casos-praticos',
        order: 11,
      },
      {
        id: '25',
        title: 'Avaliação Final',
        slug: 'avaliacao-final',
        order: 12,
      }
    ]
  }
];

export async function GET() {
  try {
    // Simular um pequeno delay para parecer real
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return NextResponse.json(mockModules);
  } catch (error) {
    console.error('Erro ao buscar módulos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar módulos' },
      { status: 500 }
    );
  }
}