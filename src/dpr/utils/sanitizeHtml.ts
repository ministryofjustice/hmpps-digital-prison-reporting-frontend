import sanitizeHtml from 'sanitize-html'

export const sanitiseHtml = (text: string) => {
  return sanitizeHtml(text, {
    allowedTags: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'br', 'div', 'h1', 'h2', 'h3', 'h4'],

    allowedAttributes: {
      '*': ['class'],
      a: ['href', 'target', 'rel'],
    },

    allowedSchemes: ['https', 'mailto'],

    allowProtocolRelative: false,

    transformTags: {
      a: (tagName, attribs) => {
        const newAttribs = { ...attribs }

        if (newAttribs['target'] && !['_blank', '_self'].includes(newAttribs['target'])) {
          delete newAttribs['target']
        }

        if (newAttribs['target'] === '_blank') {
          const rel = new Set((newAttribs['rel'] ?? '').split(/\s+/).filter(Boolean))

          rel.add('noopener')
          rel.add('noreferrer')

          newAttribs['rel'] = [...rel].join(' ')
        }

        return {
          tagName,
          attribs: newAttribs,
        }
      },
    },
  })
}
