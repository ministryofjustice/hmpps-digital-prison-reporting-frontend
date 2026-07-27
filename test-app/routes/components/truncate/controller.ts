import { RequestHandler } from 'express'
import { initialiseTruncation } from 'src/dpr/components/truncate/utils'

export default class TruncateController {
  GET: RequestHandler = async (_req, res) => {
    // Simple string
    const example1String =
      'The awesome yellow planet of Tatooine emerges from a total eclipse, her two moons glowing against the darkness. her two moons glowing against the darkness. A tiny silver spacecraft, a Rebel Blockade Runner, races away from the looming shadow of the Imperial Star Destroyer into the void.'
    const example1 = initialiseTruncation({ stringValue: example1String })
    const example2 = initialiseTruncation({ stringValue: example1String, charLength: 30 })
    const example3 = initialiseTruncation({ stringValue: example1String, showMore: true })
    const example4 = initialiseTruncation({ stringValue: example1String, showMore: false })
    const example5 = initialiseTruncation({
      stringValue: example1String,
      showMore: false,
      classes: 'govuk-body-s',
    })
    const example6 = initialiseTruncation({
      stringValue: example1String,
      showMore: true,
      classes: 'govuk-body-s',
    })

    // Simple HTML
    const htmlExample1 =
      '<p>The awesome <strong>yellow planet of Tatooine</strong> emerges from a total eclipse, <i>her two moons</i> glowing against the darkness.</p> <p>her two moons glowing against the darkness. A tiny silver spacecraft, a <b>Rebel Blockade Runner</b>, races away from the looming shadow of the Imperial Star Destroyer into the void.</p>'
    const example7 = initialiseTruncation({ stringValue: htmlExample1 })
    const example8 = initialiseTruncation({ stringValue: htmlExample1, charLength: 30 })
    const example9 = initialiseTruncation({ stringValue: htmlExample1, showMore: true })
    const example10 = initialiseTruncation({ stringValue: htmlExample1, showMore: false })
    const example11 = initialiseTruncation({
      stringValue: htmlExample1,
      showMore: false,
      classes: 'govuk-body-s',
    })
    const example12 = initialiseTruncation({
      stringValue: htmlExample1,
      showMore: true,
      classes: 'govuk-body-s',
    })

    // Complex HTML
    const htmlExample2 = `<ul>
      <li>List item <strong>one</strong></li>
      <li>List item <strong>two</strong></li>
      <li>List item <strong>three</strong></li>
      <li>List item <strong>four</strong></li>
      <li>List item <strong>five</strong></li>
      <li>List item <strong>six</strong></li>
      <li>List item <strong>seven</strong></li>
    </ul>`
    const example13 = initialiseTruncation({ stringValue: htmlExample2 })
    const example14 = initialiseTruncation({ stringValue: htmlExample2, charLength: 30 })
    const example15 = initialiseTruncation({ stringValue: htmlExample2, charLength: 30, showMore: true })
    const example16 = initialiseTruncation({ stringValue: htmlExample2, charLength: 30, showMore: false })
    const example17 = initialiseTruncation({
      stringValue: htmlExample2,
      showMore: false,
      classes: 'govuk-body-s',
    })
    const example18 = initialiseTruncation({
      stringValue: htmlExample2,
      showMore: true,
      classes: 'govuk-body-s',
    })

    res.render('views/pages/components/truncate/view.njk', {
      title: 'Truncate',
      example1,
      example2,
      example3,
      example4,
      example5,
      example6,
      example7,
      example8,
      example9,
      example10,
      example11,
      example12,
      example13,
      example14,
      example15,
      example16,
      example17,
      example18,
    })
  }
}
