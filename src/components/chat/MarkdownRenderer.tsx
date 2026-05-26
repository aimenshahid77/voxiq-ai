interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  const renderItalics = (text: string): React.ReactNode[] => {
    const italicParts = text.split(/(\*[^*]+\*)/g);
    return italicParts.map((part, idx) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={idx} className="italic font-semibold text-[#2A6666] dark:text-[#FEF0AF]">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  const renderInlineStyles = (text: string): React.ReactNode => {
    const boldParts = text.split(/(\*\*[^*]+\*\*)/g);

    return (
      <>
        {boldParts.map((part, idx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            const boldText = part.slice(2, -2);
            return (
              <strong
                key={idx}
                className="rounded bg-[#2A6666]/8 px-1 py-0.5 font-black text-[#2A6666] dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]"
              >
                {renderItalics(boldText)}
              </strong>
            );
          }
          return renderItalics(part);
        })}
      </>
    );
  };

  const parseMarkdown = (text: string) => {
    const blocks = text.split(/\n\n+/);

    return blocks.map((block, blockIdx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith("### ")) {
        return (
          <h4
            key={blockIdx}
            className="mb-2 mt-4 border-l-2 border-[#2A6666]/30 pl-2 text-xs font-black uppercase tracking-widest text-[#2A6666] first:mt-0 dark:border-[#FEF0AF]/35 dark:text-[#FEF0AF]"
          >
            {renderInlineStyles(trimmed.slice(4))}
          </h4>
        );
      }

      if (trimmed.startsWith("## ")) {
        return (
          <h3
            key={blockIdx}
            className="mb-2.5 mt-5 border-l-3 border-[#2A6666] pl-2.5 text-sm font-black uppercase tracking-wider text-[#2A6666] first:mt-0 dark:border-[#FEF0AF] dark:text-[#FEF0AF]"
          >
            {renderInlineStyles(trimmed.slice(3))}
          </h3>
        );
      }

      if (trimmed.startsWith("# ")) {
        return (
          <h2
            key={blockIdx}
            className="mb-3 mt-6 flex items-center gap-2 border-b border-[#E9ECEF] pb-1.5 text-base font-black tracking-tight text-[#1a1a1a] first:mt-0 dark:border-white/10 dark:text-white"
          >
            <span className="h-3.5 w-1.5 rounded-sm bg-[#2A6666] dark:bg-[#FEF0AF]" />
            {renderInlineStyles(trimmed.slice(2))}
          </h2>
        );
      }

      if (
        trimmed.startsWith("- ") ||
        trimmed.startsWith("* ") ||
        /^\d+\.\s/.test(trimmed)
      ) {
        const lines = trimmed.split("\n");
        return (
          <ul
            key={blockIdx}
            className="my-3 flex flex-col gap-2 pl-1 font-medium leading-relaxed text-[#5C4A3A]/75 dark:text-white/65"
          >
            {lines.map((line, lineIdx) => {
              const isNumbered = /^\d+\.\s/.test(line);
              const cleanLine = line.replace(/^[-*]\s+|\d+\.\s+/, "");

              return (
                <li key={lineIdx} className="flex items-start gap-2.5">
                  {isNumbered ? (
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2A6666] text-[10px] font-black text-white dark:bg-[#FEF0AF] dark:text-[#2A6666]">
                      {lineIdx + 1}
                    </span>
                  ) : (
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2A6666] dark:bg-[#FEF0AF]" />
                  )}
                  <span className="flex-1">{renderInlineStyles(cleanLine)}</span>
                </li>
              );
            })}
          </ul>
        );
      }

      const lines = trimmed.split("\n");
      return (
        <p
          key={blockIdx}
          className="my-2.5 font-medium leading-relaxed text-[#5C4A3A]/75 first:mt-0 last:mb-0 dark:text-white/65"
        >
          {lines.map((line, lineIdx) => (
            <span key={lineIdx} className="mt-1 block first:mt-0">
              {renderInlineStyles(line)}
            </span>
          ))}
        </p>
      );
    });
  };

  return <div className="flex flex-col gap-1">{parseMarkdown(content)}</div>;
};

export default MarkdownRenderer;
