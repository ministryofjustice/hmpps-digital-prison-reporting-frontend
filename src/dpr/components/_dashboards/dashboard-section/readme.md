# Dashboard Datasets

 * could have multiple rows
 * could have null values in rows

# Identifying a specific row:

## Identify a row that only contains values for the required columns

Table representation: 

| establishment_id | wing | age_range_1 | age_range_2 | total_prisoners | 
|------------------|------|-------------|-------------|-----------------| 
| MDI              | I    | 18-25       |             | 6               |
| MDI              | I    |             | 18-21       | 10              |

Dataset:

```js
[
  [
    {
      establishment_id: { raw: 'MDI' },
      wing: { raw: 'I' },
      age_range_1: { raw: '18-25' },
      age_range_2: { raw: '' },
      total_prisoners: { raw: '6' },
    },
    {
      establishment_id: { raw: 'MDI' },
      wing: { raw: 'I' },
      age_range_1: { raw: '' },
      age_range_2: { raw: '18-21' },
      total_prisoners: { raw: '10' },
    }
  ]
]
```

### Example: 
Get row that shows total prisoners between ages of `18-25` for `MDI` in wing `I`

#### Method: 

1. Identify required columns: 
    - Identify keys: `establishment_id` & `wing`
    - Identify measures: `age_range_1` & `total_prisoners`

2. Identify row:
    - check that values are present in keys and measure columns
    - check for null values in all remaining columns

#### Result

```js
{
  establishment_id: { raw: 'MDI' },
  wing: { raw: 'I' },
  age_range_1: { raw: '18-25' },
  age_range_2: { raw: '' },
  total_prisoners: { raw: '6' },
}
```

## Identify a row that contains extra values and some null values

### Table representation: 

| establishment_id | wing | ethnic_code | ethnic_description | nationality_code | age_range_18_25 |  total_prisoners |
|------------------|------|-------------|--------------------|------------------|-----------------|------------------| 
| MDI              | I    | W2          | W1-White: Eng./Wel |                  | 4               | 14               |
| MDI              | I    |             |                    | BRIT             |                 | 30               |

### Dataset:

```js
[
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    ethnic_code: { raw: 'W2' },
    ethnic_description: { raw: 'W1-White: Eng./Wel' },
    nationality_code: { raw: '' },
    age_range_18_25: { raw: '4' },
    total_prisoners: { raw: '14' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    ethnic_code: { raw: '' },
    ethnic_description: { raw: '' },
    nationality_code: { raw: 'BRIT' },
    age_range_18_25: { raw: '' },
    total_prisoners: { raw: '30' },
  },
]
```

### Example: 
Get row that shows total prisoners by `ethnic_description` for `MDI` in wing `I`

#### Method

1. Identify required columns: 
    - Identify keys: `establishment_id` & `wing`
    - Identify measures: `ethnic_description` & `total_prisoners`
    - Identify the columns to ignore: `ethnic_code` & `age_range_18_25`

2. Identify row:
    - filter out ignored rows

      ```js
      [
        {
          establishment_id: { raw: 'MDI' },
          wing: { raw: 'I' },
          ethnic_description: { raw: 'W1-White: Eng./Wel' },
          nationality_code: { raw: '' },
          total_prisoners: { raw: '14' },
        },
        {
          establishment_id: { raw: 'MDI' },
          wing: { raw: 'I' },
          ethnic_description: { raw: '' },
          nationality_code: { raw: 'BRIT' },
          total_prisoners: { raw: '30' },
        },
      ]
      ```

    - check that values are present in keys and measures
    - check that there are null values in all remaining columns

#### Result: 

```js
{
  establishment_id: { raw: 'MDI' },
  wing: { raw: 'I' },
  ethnic_description: { raw: 'W1-White: Eng./Wel' },
  nationality_code: { raw: '' },
  total_prisoners: { raw: '14' },
},
```

## Identify a row that contains specific required value, extra values and some null values

### Table representation: 

| establishment_id | wing | religion_code | cell    | age_range_18_25 | total_prisoners |
|------------------|------|---------------|---------|-----------------|-----------------| 
| MDI              | I    | ATHE          |         | 2               | 10              |
| MDI              | I    | ATHE          | I-1-018 | 1               | 1               |
| MDI              | I    | BUDD          |         | 2               | 5               |

### Dataset:

```js
[
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    religion_code: { raw: 'ATHE' },
    cell: { raw: '' },
    age_range_1_18_25: { raw: '2' },
    total_prisoners: { raw: '10' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    religion_code: { raw: 'ATHE' },
    cell: { raw: 'I-1-018' },
    age_range_1_18_25: { raw: '1' },
    total_prisoners: { raw: '1' },
  },
  {
    establishment_id: { raw: 'MDI' },
    wing: { raw: 'I' },
    religion_code: { raw: 'BUDD' },
    cell: { raw: '' },
    age_range_1_18_25: { raw: '2' },
    total_prisoners: { raw: '5' },
  },
]
```

### Example: 
Get row that shows total prisoners who are have religion code of `ATHE` for `MDI` in wing `I`

#### Method

1. Identify required columns: 
    - Identify keys: `establishment_id` & `wing`
    - Identify measures: `religion_code` & `total_prisoners`
    - Identify the columns to ignore: `age_range_18_25`

2. Identify row:
    - filter out ignored rows
      ```js
      [
        {
          establishment_id: { raw: 'MDI' },
          wing: { raw: 'I' },
          religion_code: { raw: 'ATHE' },
          cell: { raw: '' },
          total_prisoners: { raw: '10' },
        },
        {
          establishment_id: { raw: 'MDI' },
          wing: { raw: 'I' },
          religion_code: { raw: 'ATHE' },
          cell: { raw: 'I-1-018' },
          total_prisoners: { raw: '1' },
        },
        {
          establishment_id: { raw: 'MDI' },
          wing: { raw: 'I' },
          religion_code: { raw: 'BUDD' },
          cell: { raw: '' },
          total_prisoners: { raw: '5' },
        }
      ]
      ```
    - find rows where columm `religion_code` === `ATHE`
      ```js
      [
        {
          establishment_id: { raw: 'MDI' },
          wing: { raw: 'I' },
          religion_code: { raw: 'ATHE' },
          cell: { raw: '' },
          total_prisoners: { raw: '10' },
        },
        {
          establishment_id: { raw: 'MDI' },
          wing: { raw: 'I' },
          religion_code: { raw: 'ATHE' },
          cell: { raw: 'I-1-018' },
          total_prisoners: { raw: '1' },
        },
      ]
      ```
    - check that values are present in keys and measures
    - check that there are null values in all remaining columns

#### Result: 

```js
{
  establishment_id: { raw: 'MDI' },
  wing: { raw: 'I' },
  religion_code: { raw: 'ATHE' },
  cell: { raw: '' },
  total_prisoners: { raw: '10' },
},
```


## Identify a row where dataset  contains no null values

### Table representation: 

| establishment_id | count | has_ethnicity | ethnicity_is_missing | has_nationality | nationality_is_missing |
|------------------|-------|---------------|----------------------|-----------------|------------------------| 
| MDI              | 1182  | 845           | 337                  | 668             | 514                    |
| LTI              | 1221  | 1221          | 0                    | 1216            | 5                      |
| SLI              | 1055  | 1055          | 0                    | 1055            | 0                      |

### Dataset:

```js
[
    {
    establishment_id: 'MDI',
    count: 1182,
    has_ethnicity: 845,
    ethnicity_is_missing: 337,
    has_nationality: 668,
    nationality_is_missing: 514
  },
  {
    establishment_id: 'LTI',
    count: 1221,
    has_ethnicity: 1221,
    ethnicity_is_missing: 0,
    has_nationality: 1216,
    nationality_is_missing: 5
  },
  {
    establishment_id: 'SLI',
    count: 1055,
    has_ethnicity: 1055,
    ethnicity_is_missing: 0,
    has_nationality: 1055,
    nationality_is_missing: 0
  },
]
```

### Example: 
Get row(s) that shows total prisoners for `has_ethnicity` & `ethnicity_is_missing` by `establishment_id`

#### Method

1. Identify required columns: 
    - Identify keys: `establishment_id`
    - Identify measures: `has_ethnicity` & `ethnicity_is_missing`
    - Identify the columns to ignore: [ `count`, `has_nationality`, `nationality_is_missing` ] 

2. Identify row:
    - filter out ignored rows
      ```js
      [
        {
          establishment_id: 'MDI',
          has_ethnicity: 845,
          ethnicity_is_missing: 337,
        },
        {
          establishment_id: 'LTI',
          has_ethnicity: 1221,
          ethnicity_is_missing: 0,
        },
        {
          establishment_id: 'SLI',
          has_ethnicity: 1055,
          ethnicity_is_missing: 0,
        },
      ]
      ```
    - check that values are present in keys and measures
    - check that there are null values in all remaining columns - will do nothing

#### Result: 

```js
[
  {
    establishment_id: 'MDI',
    has_ethnicity: 845,
    ethnicity_is_missing: 337,
  },
  {
    establishment_id: 'LTI',
    has_ethnicity: 1221,
    ethnicity_is_missing: 0,
  },
  {
    establishment_id: 'SLI',
    has_ethnicity: 1055,
    ethnicity_is_missing: 0,
  },
]
```
