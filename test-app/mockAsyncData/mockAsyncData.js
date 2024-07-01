const createMockData = (amount) => {
  return Array(amount)
    .fill(0)
    .map((_) => {
      return mockDataItem
    })
}

const mockDataItem = {
  field1: 'Value 1',
  field2: 'Value 2',
  field3: '2003-02-01T01:00',
  field4: 'Value 4',
  field5: 'Value 5',
  field6: '<a href="#" target="_blank">Value 6</a>',
}

module.exports = createMockData
