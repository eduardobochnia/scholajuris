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
    return <p className="text-gray-700 dark:text-gray-300">{content}</p>;
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
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {content.text}
          </p>
        );

      case 'heading':
        return (
          <div className={`font-bold text-gray-900 dark:text-white mb-4`}>
            {content.text}
          </div>
        );

      case 'image':
        return (
          <div className="my-6">
            <Image
              src={content.url}
              alt={content.alt || ''}
              width={content.width || 800}
              height={content.height || 600}
              className="rounded-lg"
            />
            {content.caption && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                {content.caption}
              </p>
            )}
          </div>
        );

      case 'list':
        const ListTag = content.ordered ? 'ol' : 'ul';
        return (
          <ListTag className={`list-${content.ordered ? 'decimal' : 'disc'} pl-6 mb-4`}>
            {content.items.map((item: string, index: number) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 mb-2">
                {item}
              </li>
            ))}
          </ListTag>
        );

      case 'quote':
        return (
          <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-700 dark:text-gray-300">
            {content.text}
            {content.author && (
              <footer className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                — {content.author}
              </footer>
            )}
          </blockquote>
        );

      case 'code':
        return (
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
            <code className="text-sm font-mono">{content.code}</code>
          </pre>
        );

      case 'link':
        return (
          <Link
            href={content.url}
            className="text-blue-600 dark:text-blue-400 hover:underline"
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