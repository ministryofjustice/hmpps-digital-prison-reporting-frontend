/* eslint-disable no-new */

import { Autocomplete } from './components/autocomplete-text-input/clientClass.mjs'
import { CardGroup } from './components/card-group/clientClass.mjs'

/**
 * Initialise all components
 *
 * Use the `data-dpr-module` attributes to find, instantiate and initialise all the
 * components provided as part of DPR Frontend.
 *
 */
export function initAll() {

  const components = ([
    Autocomplete,
    CardGroup,
  ])

  components.forEach((Component) => {
    const $elements = document.querySelectorAll(
      `[data-dpr-module="${Component.getModuleName()}"]`
    )

    $elements.forEach(($element) => {
      try {
        new Component($element).initialise()
      } catch (error) {
        console.log(error)
      }
    })
  })
}
