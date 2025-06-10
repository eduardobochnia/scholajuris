import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type ContentType = 
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
  | { type: 'image'; url: string; alt?: string; width?: number; height?: number; caption?: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'code'; code: string }
  | { type: 'link'; url: string; text: string; external?: boolean };

type RichContentProps = {
  content: string | ContentType | ContentType[];
};

export function RichContent({ content }: RichContentProps) {
  if (!content) return null;

  // Se o conteúdo for uma string, renderiza como texto simples
  if (typeof content === 'string') {
    return <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{content}</p>;
  }

  // Se o conteúdo for um array, renderiza cada item
  if (Array.isArray(content)) {
    return (
      <div className="space-y-6">
        {content.map((item, index) => (
          <RichContent key={index} content={item} />
        ))}
      </div>
    );
  }

  // Se o conteúdo for um objeto, renderiza baseado no tipo
  if (typeof content === 'object') {
    switch (content.type) {
      case 'paragraph':
        return (
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {content.text}
          </p>
        );

      case 'heading':
        const HeadingTag = `h${content.level}` as keyof JSX.IntrinsicElements;
        const headingClasses = {
          1: 'text-4xl font-bold text-gray-900 dark:text-white mb-6',
          2: 'text-3xl font-bold text-gray-900 dark:text-white mb-5',
          3: 'text-2xl font-semibold text-gray-900 dark:text-white mb-4',
          4: 'text-xl font-semibold text-gray-900 dark:text-white mb-3',
          5: 'text-lg font-medium text-gray-900 dark:text-white mb-3',
          6: 'text-base font-medium text-gray-900 dark:text-white mb-2'
        };
        
        return (
          <HeadingTag className={headingClasses[content.level]}>
            {content.text}
          </HeadingTag>
        );

      case 'image':
        return (
          <div className="my-6">
            <Image
              src={content.url}
              alt={content.alt || ''}
              width={content.width || 800}
              height={content.height || 600}
              className="rounded-lg shadow-sm"
            />
            {content.caption && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center italic">
                {content.caption}
              </p>
            )}
          </div>
        );

      case 'list':
        const ListTag = content.ordered ? 'ol' : 'ul';
        const listClass = content.ordered 
          ? 'list-decimal pl-6 mb-4 space-y-2' 
          : 'list-disc pl-6 mb-4 space-y-2';
        
        return (
          <ListTag className={listClass}>
            {content.items.map((item: string, index: number) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {item}
              </li>
            ))}
          </ListTag>
        );

      case 'quote':
        return (
          <blockquote className="border-l-4 border-blue-500 pl-6 my-6 italic bg-blue-50 dark:bg-blue-900/20 py-4 rounded-r-lg">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              "{content.text}"
            </p>
            {content.author && (
              <footer className="text-sm text-gray-500 dark:text-gray-400 mt-3 font-medium">
                — {content.author}
              </footer>
            )}
          </blockquote>
        );

      case 'code':
        return (
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 border">
            <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
              {content.code}
            </code>
          </pre>
        );

      case 'link':
        return (
          <Link
            href={content.url}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            target={content.external ? '_blank' : undefined}
            rel={content.external ? 'noopener noreferrer' : undefined}
          >
            {content.text}
          </Link>
        );

      default:
        return null;
    }
  }

  return null;
}