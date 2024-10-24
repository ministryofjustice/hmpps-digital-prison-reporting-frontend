export default {
  createTagHtml: (text: string, classes?: string) => {
    return `<p class="govuk-body dpr-tag ${classes}">
    ${text}
  </p>`
  },
}
