import React from 'react';
import { ExternalLink } from 'lucide-react';

interface StructuredMessageViewProps {
  content: string;
  isUser?: boolean;
}

// Formats inline elements: **bold**, *italic*, `code`, and [link](url)
const formatInlineText = (text: string): React.ReactNode[] => {
  // Regex splitting by markdown tokens
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const boldText = part.slice(2, -2);
      return (
        <strong key={index} className="font-extrabold text-gray-900 dark:text-white">
          {boldText}
        </strong>
      );
    }
    // Italic: *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2 && !part.startsWith('**')) {
      const italicText = part.slice(1, -1);
      return (
        <em key={index} className="italic text-gray-700 dark:text-gray-300">
          {italicText}
        </em>
      );
    }
    // Inline code: `text`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const codeText = part.slice(1, -1);
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 border border-gray-200 dark:border-gray-700"
        >
          {codeText}
        </code>
      );
    }
    // Markdown link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noreferrer"
          className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold inline-flex items-center gap-0.5"
        >
          <span>{linkMatch[1]}</span>
          <ExternalLink className="w-2.5 h-2.5 inline" />
        </a>
      );
    }
    // Regular plain text
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

export const StructuredMessageView: React.FC<StructuredMessageViewProps> = ({ content, isUser = false }) => {
  if (isUser) {
    return (
      <div className="whitespace-pre-wrap leading-relaxed font-semibold">
        {content}
      </div>
    );
  }

  const rawLines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let index = 0;

  while (index < rawLines.length) {
    const line = rawLines[index];
    const trimmed = line.trim();

    // 1. Skip pure empty lines
    if (!trimmed) {
      index++;
      continue;
    }

    // 2. Markdown Tables: lines starting and ending with |
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (index < rawLines.length && rawLines[index].trim().startsWith('|') && rawLines[index].trim().endsWith('|')) {
        tableLines.push(rawLines[index].trim());
        index++;
      }

      if (tableLines.length >= 2) {
        // Parse header
        const headerCols = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map(c => c.trim());

        // Skip line 1 if it's separator e.g. |:---|:---|
        const hasSeparator = tableLines[1].includes('---');
        const dataRows = (hasSeparator ? tableLines.slice(2) : tableLines.slice(1)).map(row =>
          row
            .split('|')
            .slice(1, -1)
            .map(c => c.trim())
        );

        blocks.push(
          <div key={`table-${index}`} className="my-3 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
            <table className="min-w-full text-[11px] sm:text-xs text-left">
              <thead className="bg-gray-100/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-extrabold">
                <tr>
                  {headerCols.map((col, cIdx) => (
                    <th key={cIdx} className="px-3 py-2">
                      {formatInlineText(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-[#1E222B]">
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-gray-50/50 dark:bg-white/[0.02]' : ''}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="px-3 py-2 text-gray-700 dark:text-gray-300">
                        {formatInlineText(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // 3. Headers: ### or ####
    if (trimmed.startsWith('### ')) {
      const headerText = trimmed.replace(/^###\s+/, '');
      blocks.push(
        <h3
          key={`h3-${index}`}
          className="text-sm sm:text-base font-black text-gray-900 dark:text-white pt-2.5 pb-1 border-b border-gray-100 dark:border-gray-800 flex items-center gap-1.5"
        >
          {formatInlineText(headerText)}
        </h3>
      );
      index++;
      continue;
    }

    if (trimmed.startsWith('#### ')) {
      const headerText = trimmed.replace(/^####\s+/, '');
      blocks.push(
        <h4
          key={`h4-${index}`}
          className="text-xs sm:text-sm font-extrabold text-[#00875A] dark:text-[#00D09C] pt-2 pb-0.5 flex items-center gap-1"
        >
          {formatInlineText(headerText)}
        </h4>
      );
      index++;
      continue;
    }

    // 4. Horizontal Rule: ---
    if (trimmed === '---' || trimmed === '***') {
      blocks.push(
        <hr key={`hr-${index}`} className="my-2.5 border-t border-gray-200 dark:border-gray-800" />
      );
      index++;
      continue;
    }

    // 5. Alert / Callout Cards (Starting with warning or lightbulb emojis)
    if (trimmed.startsWith('⚠️') || trimmed.startsWith('⛔') || trimmed.startsWith('🛑')) {
      blocks.push(
        <div
          key={`alert-${index}`}
          className="p-3 my-2 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs sm:text-[13px] leading-relaxed shadow-xs"
        >
          {formatInlineText(trimmed)}
        </div>
      );
      index++;
      continue;
    }

    if (trimmed.startsWith('💡') || trimmed.startsWith('✨')) {
      blocks.push(
        <div
          key={`tip-${index}`}
          className="p-3 my-2 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200 text-xs sm:text-[13px] leading-relaxed shadow-xs"
        >
          {formatInlineText(trimmed)}
        </div>
      );
      index++;
      continue;
    }

    // 6. Numbered List: e.g. "1. " or "2. "
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      const num = numMatch[1];
      const itemText = numMatch[2];
      blocks.push(
        <div key={`num-${index}`} className="flex items-start gap-2.5 my-1.5 text-xs sm:text-[13px] leading-relaxed">
          <span className="w-5 h-5 rounded-full bg-[#00D09C]/20 text-[#00875A] dark:text-[#00D09C] font-mono text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 border border-[#00D09C]/30 shadow-xs">
            {num}
          </span>
          <div className="flex-1 text-gray-800 dark:text-gray-200">
            {formatInlineText(itemText)}
          </div>
        </div>
      );
      index++;
      continue;
    }

    // 7. Bullet List: e.g. "* " or "- "
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const bulletText = trimmed.replace(/^[*\-]\s+/, '');
      const isGuardrail = bulletText.startsWith('🛡️');

      blocks.push(
        <div
          key={`bullet-${index}`}
          className={`flex items-start gap-2.5 my-1.5 text-xs sm:text-[13px] leading-relaxed ${
            isGuardrail
              ? 'p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-500/30'
              : ''
          }`}
        >
          {!isGuardrail && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D09C] mt-2 shrink-0 shadow-xs" />
          )}
          <div className="flex-1 text-gray-800 dark:text-gray-200">
            {formatInlineText(bulletText)}
          </div>
        </div>
      );
      index++;
      continue;
    }

    // 8. Greeting line e.g. "👋 **Welcome..."
    if (trimmed.startsWith('👋')) {
      blocks.push(
        <div
          key={`greeting-${index}`}
          className="text-sm sm:text-base font-black text-gray-900 dark:text-white pt-1 pb-1 flex items-center gap-1.5"
        >
          {formatInlineText(trimmed)}
        </div>
      );
      index++;
      continue;
    }

    // 9. Regular text paragraph
    blocks.push(
      <p key={`p-${index}`} className="my-1.5 text-xs sm:text-[13px] leading-relaxed text-gray-800 dark:text-gray-200">
        {formatInlineText(trimmed)}
      </p>
    );
    index++;
  }

  return <div className="space-y-1">{blocks}</div>;
};
