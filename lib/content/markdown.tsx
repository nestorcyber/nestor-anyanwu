import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function sanitizeArticleHtml(html: string): string {
  if (!html) return ''
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/\s*on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/href\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*')/gi, 'href="#"')
}

function formatMarkdownSpacing(rawContent: string): string {
  if (!rawContent) return ''
  return rawContent.replace(/\n{3,}/g, (match) => {
    const extraLines = match.length - 2
    return '\n\n' + '&nbsp;\n\n'.repeat(extraLines)
  })
}

export function Markdown({ content }: { content: string }) {
  if (!content) return null

  const isHtml = content.trim().startsWith('<') && content.trim().endsWith('>')

  if (isHtml) {
    const cleanHtml = sanitizeArticleHtml(content)

    return (
      <div
        className="article-content text-foreground/90 font-light text-base md:text-lg leading-relaxed md:leading-loose space-y-6"
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    )
  }

  const formattedContent = formatMarkdownSpacing(content)

  return (
    <div className="article-content prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-extrabold prose-headings:mt-10 prose-headings:mb-4 prose-p:my-6 prose-p:leading-relaxed md:prose-p:leading-loose prose-a:text-[#0070f3] prose-[#0070f3]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => {
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

