import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function formatMarkdownSpacing(rawContent: string): string {
  if (!rawContent) return ''
  // Preserve empty lines by converting 3+ newlines into explicit spaced line breaks
  return rawContent.replace(/\n{3,}/g, (match) => {
    const extraLines = match.length - 2
    return '\n\n' + '&nbsp;\n\n'.repeat(extraLines)
  })
}

export function Markdown({ content }: { content: string }) {
  if (!content) return null

  const formattedContent = formatMarkdownSpacing(content)

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-extrabold prose-headings:mt-10 prose-headings:mb-4 prose-p:my-6 prose-p:leading-relaxed md:prose-p:leading-loose prose-a:text-[#0070f3] prose-[#0070f3]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => {
            // If paragraph is an empty line or non-breaking space, render an explicit line spacing block
            const isBlank =
              !children ||
              children === '&nbsp;' ||
              (Array.isArray(children) && children.length === 1 && children[0] === '&nbsp;')

            if (isBlank) {
              return <div className="h-6 sm:h-8 w-full my-4" aria-hidden="true" />
            }

            return <p className="my-6 leading-relaxed md:leading-loose">{children}</p>
          },
        }}
      >
        {formattedContent}
      </ReactMarkdown>
    </div>
  )
}
