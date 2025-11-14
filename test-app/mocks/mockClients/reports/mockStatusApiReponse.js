// @ts-nocheck
const mockStatusApiResponse = {
  status: 'FINISHED',
  duration: 3154450321,
  queryString:
    '          CREATE EXTERNAL TABLE reports._0c976067_51da_4ed9_8a28_f16958b95ce3 \n' +
    '          STORED AS parquet \n' +
    "          LOCATION 's3://dpr-working-development/reports/_0c976067_51da_4ed9_8a28_f16958b95ce3/' \n" +
    '          AS ( \n' +
    "          WITH dataset_ AS (SELECT prisoners.number AS prisonNumber,CONCAT(CONCAT(prisoners.lastname, ', '), substring(prisoners.firstname, 1, 1)) AS name,movements.time AS date,movements.direction,movements.type,movements.origin,movements.origin_code,movements.destination,movements.destination_code,movements.reason\n" +
    'FROM datamart.domain.movement_movement as movements\n' +
    'JOIN datamart.domain.prisoner_prisoner as prisoners\n' +
    "ON movements.prisoner = prisoners.id),policy_ AS (SELECT * FROM dataset_ WHERE (origin_code='KMI' AND lower(direction)='out') OR (destination_code='KMI' AND lower(direction)='in')),filter_ AS (SELECT * FROM policy_ WHERE date >= CAST('2024-05-21' AS timestamp) AND date < (CAST('2024-06-21' AS timestamp) + INTERVAL '1' day))\n" +
    'SELECT *\n' +
    '          FROM filter_ ORDER BY date desc\n' +
    '          );',
  resultRows: 0,
  resultSize: 0,
}

module.exports = mockStatusApiResponse
