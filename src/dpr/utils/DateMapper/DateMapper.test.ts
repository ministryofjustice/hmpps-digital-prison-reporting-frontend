import DateMapper from './DateMapper'

const dateMapper = new DateMapper()

describe('getDateType', () => {
  it('Iso Date', () => {
    expect(dateMapper.getDateType('2001-02-03')).toEqual('iso')
  })

  it('Local Date', () => {
    expect(dateMapper.getDateType('01/02/2003')).toEqual('local-date')
  })

  it('Local Date Short Year', () => {
    expect(dateMapper.getDateType('01/02/03')).toEqual('local-date-short-year')
  })

  it('Local Date Time', () => {
    expect(dateMapper.getDateType('01/02/2003 04:05')).toEqual('local-datetime')
  })

  it('Local Date Time Short Year', () => {
    expect(dateMapper.getDateType('01/02/03 04:05')).toEqual('local-datetime-short-year')
  })

  it('No value', () => {
    expect(dateMapper.getDateType(null)).toEqual('none')
  })

  it('Non-date value', () => {
    expect(dateMapper.getDateType('Not a date')).toEqual('none')
  })

  it('Not a matchable string', () => {
    // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(dateMapper.getDateType(0)).toEqual('none')
  })
})

describe('getDateWrapper', () => {
  it('Iso Date', () => {
    expect(dateMapper.getDateWrapper('2001-02-03').format('YYYY-MM-DD')).toEqual('2001-02-03')
  })

  it('Local Date', () => {
    expect(dateMapper.getDateWrapper('01/02/2003').format('YYYY-MM-DD')).toEqual('2003-02-01')
  })

  it('Picker Local Date', () => {
    expect(dateMapper.getDateWrapper('1/2/2003').format('YYYY-MM-DD')).toEqual('2003-02-01')
  })

  it('Local Date Short YEar', () => {
    expect(dateMapper.getDateWrapper('01/02/03').format('YYYY-MM-DD')).toEqual('2003-02-01')
  })

  it('Local Date Time', () => {
    expect(dateMapper.getDateWrapper('01/02/2003 04:05').format('YYYY-MM-DD')).toEqual('2003-02-01')
  })

  it('Local Date Time Short Year', () => {
    expect(dateMapper.getDateWrapper('01/02/03 04:05').format('YYYY-MM-DD')).toEqual('2003-02-01')
  })

  it('No value', () => {
    expect(dateMapper.getDateWrapper(null)).toBeNull()
  })

  it('Non-date value', () => {
    expect(dateMapper.getDateWrapper('Not a date')).toBeNull()
  })
})

describe('isDate', () => {
  it('Iso Date', () => {
    expect(dateMapper.isDate('2001-02-03')).toEqual(true)
  })

  it('Local Date', () => {
    expect(dateMapper.isDate('01/02/2003')).toEqual(true)
  })

  it('Local Date Short Year', () => {
    expect(dateMapper.isDate('01/02/03')).toEqual(true)
  })

  it('Local Date Time', () => {
    expect(dateMapper.isDate('01/02/2003 04:05')).toEqual(true)
  })

  it('Local Date Time Short Year', () => {
    expect(dateMapper.isDate('01/02/03 04:05')).toEqual(true)
  })

  it('No value', () => {
    expect(dateMapper.isDate(null)).toEqual(false)
  })

  it('Non-date value', () => {
    expect(dateMapper.isDate('Not a date')).toEqual(false)
  })
})

describe('toDateString', () => {
  it('Iso Date', () => {
    expect(dateMapper.toDateString('2001-02-03', 'iso')).toEqual('2001-02-03')
  })

  it('Local Date', () => {
    expect(dateMapper.toDateString('2001-02-03', 'local-date')).toEqual('03/02/2001')
  })

  it('Local Date Short Year', () => {
    expect(dateMapper.toDateString('2001-02-03', 'local-date-short-year')).toEqual('03/02/01')
  })

  it('Local Date Time', () => {
    expect(dateMapper.toDateString('2001-02-03T04:05:06Z', 'local-datetime')).toEqual('03/02/2001 04:05')
  })

  it('Local Date Time Short Year', () => {
    expect(dateMapper.toDateString('2001-02-03T04:05:06Z', 'local-datetime-short-year')).toEqual('03/02/01 04:05')
  })

  it('No value', () => {
    expect(dateMapper.toDateString(null, 'iso')).toBeNull()
  })

  it('Non-date value', () => {
    expect(dateMapper.toDateString('Not a date', 'iso')).toBeNull()
  })
})
