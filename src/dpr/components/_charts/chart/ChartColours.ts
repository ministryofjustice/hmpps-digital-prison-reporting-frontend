export default class ChartColoursHelper {
  pallette = [
    {
      name: 'blue',
      hex: '#5694ca',
    },
    {
      name: 'purple',
      hex: '#912b88',
    },
    {
      name: 'green',
      hex: '#00703c',
    },
    {
      name: 'dark_blue',
      hex: '#003078',
    },
    {
      name: 'orange',
      hex: '#f47738',
    },
    {
      name: 'orange',
      hex: '#28a197',
    },
  ]

  getColourPallette = () => {
    return this.pallette
  }

  getHexPallette = () => {
    return this.pallette.map((p) => p.hex)
  }

  setColourStyles = (datasetIndex: number) => {
    const hexColours = this.getHexPallette()
    const colour = hexColours[datasetIndex % hexColours.length]
    return {
      backgroundColor: colour,
      borderColor: colour,
    }
  }
}
