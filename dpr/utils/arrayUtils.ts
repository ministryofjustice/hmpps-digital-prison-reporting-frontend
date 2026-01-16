/* eslint-disable import/prefer-default-export */

export const distinct = (values: string[], value: string) => (values.includes(value) ? values : values.concat(value))
