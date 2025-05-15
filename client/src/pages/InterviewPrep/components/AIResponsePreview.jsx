// import React, { useState } from 'react';
// import { LuCopy, LuCheck, LuCode } from 'react-icons/lu';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// const AIResponsePreview = ({ content }) => {
//   if (!content) return null;

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="text-[14px] prose prose-sm prose-slate dark:prose-invert max-w-none">
//         <ReactMarkdown
//           remarkPlugins={[remarkGfm]}
//           components={{
//             code({ node, className, children, ...props }) {
//               const match = /language-(\w+)/.exec(className || '');
//               const language = match ? match[1] : '';
//               const isInline = !className;
//               return !isInline ? (
//                 <CodeBlock code={String(children).replace(/\n$/, '')} language={language} />
//               ) : (
//                 <code className="px-1 py-0.5 rounded text-sm" {...props}>
//                   {children}
//                 </code>
//               );
//             },
//             p({ children }) {
//               return <p className="mb-4 leading-5">{children}</p>;
//             },
//             strong({ children }) {
//               return <strong>{children}</strong>;
//             },
//             em({ children }) {
//               return <em>{children}</em>;
//             },
//             ul({ children }) {
//               return <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>;
//             },
//             ol({ children }) {
//               return <ol className="list-decimal pl-6 space-y-2 my-4">{children}</ol>;
//             },
//             li({ children }) {
//               return <li className="mb-1">{children}</li>;
//             },
//             blockquote({ children }) {
//               return (
//                 <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4">
//                   {children}
//                 </blockquote>
//               );
//             },
//             h1({ children }) {
//               return <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>;
//             },
//             h2({ children }) {
//               return <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>;
//             },
//             h3({ children }) {
//               return <h3 className="text-lg font-bold mt-5 mb-2">{children}</h3>;
//             },
//             h4({ children }) {
//               return <h4 className="text-base font-bold mt-4 mb-2">{children}</h4>;
//             },
//             a({ children, href }) {
//               return (
//                 <a href={href} className="text-blue-500 hover:underline">
//                   {children}
//                 </a>
//               );
//             },
//             table({ children }) {
//               return (
//                 <div className="overflow-x-auto my-4">
//                   <table className="min-w-full divide-y divide-gray-200">{children}</table>
//                 </div>
//               );
//             },
//             thead({ children }) {
//               return <thead className="bg-gray-50">{children}</thead>;
//             },
//             tbody({ children }) {
//               return <tbody className="divide-y divide-gray-200">{children}</tbody>;
//             },
//             tr({ children }) {
//               return <tr>{children}</tr>;
//             },
//             th({ children }) {
//               return (
//                 <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {children}
//                 </th>
//               );
//             },
//             td({ children }) {
//               return <td className="px-3 py-2 whitespace-nowrap text-sm">{children}</td>;
//             },
//             hr() {
//               return <hr className="my-4 border-gray-200" />;
//             },
//             img({ src, alt }) {
//               return <img src={src} alt={alt} className="my-4 max-w-full rounded" />;
//             },
//           }}
//         >
//           {content}
//         </ReactMarkdown>
//       </div>
//     </div>
//   );
// };

// function CodeBlock({ code, language }) {
//   const [copied, setCopied] = useState(false);

//   const copyCode = () => {
//     navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => {
//       setCopied(false);
//     }, 2000);
//   };

//   return (
//     <div className="relative bg-gray-50 rounded-lg border border-gray-200 mb-4 overflow-hidden">
//       <div className="flex items-center justify-between px-2 py-1 bg-gray-200 rounded-t">
//         <div className="flex items-center space-x-2 text-gray-600 text-sm">
//           <LuCode size={16} />
//           <span>{language || 'code'}</span>
//         </div>
//         <button onClick={copyCode} className="ml-2 p-1 rounded hover:bg-gray-300">
//           {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
//           {copied && <span className="text-green-500 text-xs ml-1">Copied</span>}
//         </button>
//       </div>
//       <SyntaxHighlighter language={language} style={oneLight} customStyle={{ margin: 0, padding: '1rem', fontSize:12.5, background:'transparent' }}>
//         {code}
//       </SyntaxHighlighter>
//     </div>
//   );
// }

// export default AIResponsePreview;



import React, { useState } from 'react';
import { LuCopy, LuCheck, LuCode } from 'react-icons/lu';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-4">
      <div className="text-[14px] prose prose-slate prose-sm dark:prose-invert max-w-none leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              const isInline = !className;
              return !isInline ? (
                <CodeBlock code={String(children).replace(/\n$/, '')} language={language} />
              ) : (
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              );
            },
            p: ({ children }) => <p className="mb-4 text-[15px] text-gray-700">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold text-gray-800">{children}</strong>,
            em: ({ children }) => <em className="text-gray-600">{children}</em>,
            ul: ({ children }) => <ul className="list-disc pl-6 space-y-2 my-4 text-gray-700">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2 my-4 text-gray-700">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 bg-gray-50 py-2 rounded">
                {children}
              </blockquote>
            ),
            h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-3 text-gray-900">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-900">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-medium mt-5 mb-2 text-gray-800">{children}</h3>,
            h4: ({ children }) => <h4 className="text-base font-medium mt-4 mb-2 text-gray-700">{children}</h4>,
            a: ({ children, href }) => (
              <a href={href} className="text-blue-600 hover:underline underline-offset-2">
                {children}
              </a>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left">{children}</table>
              </div>
            ),
            thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
            tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
            tr: ({ children }) => <tr>{children}</tr>,
            th: ({ children }) => (
              <th className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {children}
              </th>
            ),
            td: ({ children }) => <td className="px-3 py-2 whitespace-nowrap">{children}</td>,
            hr: () => <hr className="my-6 border-gray-300" />,
            img: ({ src, alt }) => <img src={src} alt={alt} className="my-4 max-w-full rounded-md shadow-sm" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative bg-gray-50 rounded-lg border border-gray-200 mb-5 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-200 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <LuCode size={16} />
          <span>{language || 'code'}</span>
        </div>
        <button
          onClick={copyCode}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-green-600 hover:bg-gray-200 rounded transition-colors"
        >
          {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
          {copied && <span className="text-green-500 text-xs">Copied</span>}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: 13,
          background: 'transparent',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default AIResponsePreview;
