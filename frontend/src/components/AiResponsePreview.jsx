import React, { useState } from 'react';
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

const AiResponsePreview = ({ content }) => {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  if (!content) return null;

  return (
    <div className="prose prose-sm md:prose-base max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : 'text';
            const codeContent = String(children).trim();
            const index = node?.position?.start?.line || Math.random();

            if (inline) {
              return (
                <code className="bg-gray-100 text-pink-700 px-1 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }

            return (
              <div className="relative group my-6 border border-gray-200 rounded-md overflow-hidden shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between bg-gray-100 px-3 py-2 border-b border-gray-200 text-gray-600 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <LuCode size={16} />
                    <span className='text-xs font-semibold text-gray-600 uppercase tracking-wide'>
                      {language || "Code"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(codeContent, index)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 transition"
                  >
                    {copiedCode === index ? <LuCheck size={14} /> : <LuCopy size={14} />}
                    {copiedCode === index ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* Code block */}
                <SyntaxHighlighter
                  style={vs}
                  language={language}
                  PreTag="div"
                  className="text-sm font-mono overflow-x-auto p-4 bg-[#f5f5f5]"
                  {...props}
                >
                  {codeContent}
                </SyntaxHighlighter>
              </div>
            );
          },

          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {children}
              </a>
            );
          },

          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
                {children}
              </blockquote>
            );
          },

          li({ children }) {
            return <li className="ml-4 list-disc">{children}</li>;
          },

          h1({ children }) {
            return <h1 className="text-2xl font-bold">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-xl font-semibold">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-lg font-semibold">{children}</h3>;
          },
          h4({ children }) {
            return <h4 className="text-md font-semibold">{children}</h4>;
          },

          // ✅ Robust & crash-proof <p> renderer
          p({ node, children }) {
            const childrenArray = React.Children.toArray(children);

            const isValidParagraph = childrenArray.every(child =>
              typeof child === 'string' ||
              (React.isValidElement(child) &&
                typeof child.type === 'string' &&
                !['div', 'pre', 'table', 'code'].includes(child.type))
            );

            return isValidParagraph
              ? <p className="text-gray-700 leading-relaxed">{childrenArray}</p>
              : <div className="text-gray-700 leading-relaxed">{childrenArray}</div>;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default AiResponsePreview;
