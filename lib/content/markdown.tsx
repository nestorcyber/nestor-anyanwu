import DOMPurify from 'isomorphic-dompurify'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const SAFE_ARTICLE_HTML_CONFIG = {
  ALLOWED_TAGS: [
    'p',
    'br',
    'strong',
    'b',
    'em',
    'i',
    'u',
    's',
    'del',
    'blockquote',
    'code',
    'pre',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ul',
    'ol',
    'li',
    'a',
    'img',
    'hr',
    'span',
    'div',
    'figure',
    'figcaption',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
  ],
  ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel', 'width', 'height'],
  ALLOW_DATA_ATTR: false,
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|\/|#)/i,
}

function sanitizeArticleHtml(html: string): string {
  if (!html) return ''
  return DOMPurify.sanitize(html, SAFE_ARTICLE_HTML_CONFIG)
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
    <div className="article-content prose prose-slate dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-extrabold prose-headings:mt-10 prose-headings:mb-4 prose-p:my-6 prose-p:leading-relaxed md:prose-p:leading-loose prose-a:text-[#0056D2]">
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
