export default {
  createShowMoreHtml: (text: string, length?: number) => {
    const sanitizedString = text ? text.replace(/"/g, "'") : ''
    const stringLength = length || 100

    return `<div class="dpr-show-more" data-content="${sanitizedString}" data-dpr-module="show-more" data-length="${stringLength}">
      <p class='dpr-show-more-content govuk-body-s'>${sanitizedString}</p><a class="dpr-show-hide-button govuk-link--no-visited-state" href="#">show more</a>
  </div>`
  },
}
