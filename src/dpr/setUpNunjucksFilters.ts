import nunjucks from 'nunjucks'
import nunjucksDate from 'nunjucks-date'
import sanitizeHtml from 'sanitize-html'

import { FilterOption } from './components/_filters/filter-input/types'

export const setUpNunjucksFilters = (env: nunjucks.Environment) => {
  env.addFilter('addRequiredAttributeToAll', addRequiredAttributeToAll)
  env.addFilter('json', stringifyJson)
  env.addFilter('capitaliseSentence', capitaliseSentence)

  // Namespace our own filters
  env.addFilter('dpr.findError', findError)
  env.addFilter('dpr.spacesToDash', spacesToDash)
  env.addFilter('dpr.safe', safe)

  nunjucksDate.setDefaultFormat('DD/MM/YYYY')
  nunjucksDate.install(env, 'dprDate')
}

const findError = (errs: { text: string; href: string }[] | undefined, errToFind: string) => {
  const error = errs?.find(err => err.href.slice(1) === errToFind)?.text
  return error ? { text: error } : null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringifyJson = (jsonObj: any) => {
  return JSON.stringify(jsonObj, null, 2)
}

const capitaliseSentence = (text: string) => {
  return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
}

const addRequiredAttributeToAll = (items: Array<FilterOption>) => {
  return items.map(i => ({
    ...i,
    attributes: {
      required: true,
    },
  }))
}

const spacesToDash = (text: string) => {
  return text?.replace(/ /g, '-') ?? ''
}

const safe = (text: string) => {
  const sanitized = sanitizeHtml(text, {
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

  return new nunjucks.runtime.SafeString(sanitized)
}

export default setUpNunjucksFilters
