const createMockData = (amount) => {
  return Array(amount)
    .fill(0)
    .map((_, index) => {
      return {
        ...mockDataItem,
        section1: index % 2 ? 'Two' : 'One',
        section2: index % 3 ? 'B' : 'A',
      }
    })
}

const mockDataItem = {
  field1: 'Value 1',
  field2: 'Value 2',
  field3: '2003-02-01T01:00',
  field4: 'Value 4',
  field5: 'Value 5',
  field6: '<a href="#" target="_blank">Value 6</a>',
  field7: '2003-02-01T01:00',
  section1: 'One',
  section2: 'A',
}

module.exports = createMockData
