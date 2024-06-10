/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/user/caseload/active': {
    /** @description Gets a user's active caseloads */
    get: operations['definitions']
  }
  '/reports/{reportId}/{reportVariantId}': {
    /** @description Returns the dataset for the given report ID and report variant ID filtered by the filters provided in the query. */
    get: operations['configuredApiDataset']
  }
  '/reports/{reportId}/{reportVariantId}/{fieldId}': {
    /** @description Returns the dataset for the given report ID and report variant ID filtered by the filters provided in the query. */
    get: operations['configuredApiDynamicFilter']
  }
  '/reports/{reportId}/{reportVariantId}/count': {
    /** @description Returns the number of records for the given report ID and report variant ID filtered by the filters provided in the query. */
    get: operations['configuredApiCount']
  }
  '/definitions': {
    /** @description Gets summaries of all report definitions */
    get: operations['definitions_1']
  }
  '/definitions/{reportId}/{variantId}': {
    /** @description Gets report definition containing a single variant. */
    get: operations['definition']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    ErrorResponse: {
      /** Format: int32 */
      status: number
      /** Format: int32 */
      errorCode?: number
      userMessage?: string
      developerMessage?: string
      moreInfo?: string
    }
    Count: {
      /**
       * Format: int64
       * @description The total number of records
       * @example 501
       */
      count: number
    }
    ReportDefinitionSummary: {
      id: string
      name: string
      description?: string
      variants: components['schemas']['VariantDefinitionSummary'][]
    }
    VariantDefinitionSummary: {
      id: string
      name: string
      description?: string
    }
    DynamicFilterOption: {
      /** Format: int32 */
      minimumLength?: number
      returnAsStaticOptions: boolean
      /** Format: int64 */
      maximumOptions?: number
    }
    FieldDefinition: {
      name: string
      display: string
      /** @enum {string} */
      wordWrap?: 'none' | 'normal' | 'break-words'
      filter?: components['schemas']['FilterDefinition']
      sortable: boolean
      defaultsort: boolean
      /** @enum {string} */
      type: 'boolean' | 'date' | 'double' | 'HTML' | 'long' | 'string' | 'time'
      mandatory: boolean
      visible: boolean
      calculated: boolean
    }
    FilterDefinition: {
      /** @enum {string} */
      type: 'Radio' | 'Select' | 'daterange' | 'autocomplete'
      staticOptions?: components['schemas']['FilterOption'][]
      dynamicOptions?: components['schemas']['DynamicFilterOption']
      defaultValue?: string
      min?: string
      max?: string
    }
    FilterOption: {
      name: string
      display: string
    }
    SingleVariantReportDefinition: {
      id: string
      name: string
      description?: string
      variant: components['schemas']['VariantDefinition']
    }
    Specification: {
      template: string
      fields: components['schemas']['FieldDefinition'][]
    }
    VariantDefinition: {
      id: string
      name: string
      resourceName: string
      description?: string
      specification?: components['schemas']['Specification']
      classification?: string
      printable?: boolean
    }
  }
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}

export type $defs = Record<string, never>

export type external = Record<string, never>

export interface operations {
  /** @description Gets a user's active caseloads */
  definitions: {
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': string[]
        }
      }
      /** @description Bad Request */
      400: {
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
    }
  }
  /** @description Returns the dataset for the given report ID and report variant ID filtered by the filters provided in the query. */
  configuredApiDataset: {
    parameters: {
      query: {
        selectedPage?: number
        pageSize?: number
        sortColumn?: string
        sortedAsc?: boolean
        /**
         * @description The filter query parameters have to start with the prefix "filters." followed by the name of the filter.
         *       |For range filters, like date for instance, these need to be followed by a .start or .end suffix accordingly.
         *
         * @example {
         *   "filters.date.start": "2023-04-25",
         *   "filters.date.end": "2023-05-30"
         * }
         */
        filters: {
          [key: string]: string
        }
        /**
         * @description This optional parameter sets the path of the directory of the data product definition files your application will use.
         *       "This query parameter is intended to be used in conjunction with the `dpr.lib.dataProductDefinitions.host` property to retrieve definition files from another application by using a web client.
         * @example definitions/prisons/orphanage
         */
        dataProductDefinitionsPath?: string
      }
      path: {
        reportId: string
        reportVariantId: string
      }
    }
    responses: {
      /** @description Bad Request */
      400: {
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description default response */
      default: {
        headers: {
          /** @description Provides additional information about why no data has been returned. */
          'x-no-data-warning'?: string
        }
        content: {
          'application/json': {
            [key: string]: Record<string, never>
          }[]
        }
      }
    }
  }
  /** @description Returns the dataset for the given report ID and report variant ID filtered by the filters provided in the query. */
  configuredApiDynamicFilter: {
    parameters: {
      query: {
        pageSize?: number
        sortedAsc?: boolean
        /**
         * @description The filter query parameters have to start with the prefix "filters." followed by the name of the filter.
         *       |For range filters, like date for instance, these need to be followed by a .start or .end suffix accordingly.
         *
         * @example {
         *   "filters.date.start": "2023-04-25",
         *   "filters.date.end": "2023-05-30"
         * }
         */
        filters: {
          [key: string]: string
        }
        /**
         * @description The value to match the start of the fieldId
         * @example Lond
         */
        prefix: string
        /**
         * @description This optional parameter sets the path of the directory of the data product definition files your application will use.
         *       "This query parameter is intended to be used in conjunction with the `dpr.lib.dataProductDefinitions.host` property to retrieve definition files from another application by using a web client.
         * @example definitions/prisons/orphanage
         */
        dataProductDefinitionsPath?: string
      }
      path: {
        reportId: string
        reportVariantId: string
        /**
         * @description The name of the schema field which will be used as a dynamic filter.
         * @example name
         */
        fieldId: string
      }
    }
    responses: {
      /** @description Bad Request */
      400: {
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description default response */
      default: {
        headers: {
          /** @description Provides additional information about why no data has been returned. */
          'x-no-data-warning'?: string
        }
        content: {
          'application/json': string[]
        }
      }
    }
  }
  /** @description Returns the number of records for the given report ID and report variant ID filtered by the filters provided in the query. */
  configuredApiCount: {
    parameters: {
      query: {
        /**
         * @description The filter query parameters have to start with the prefix "filters." followed by the name of the filter.
         *       |For range filters, like date for instance, these need to be followed by a .start or .end suffix accordingly.
         *
         * @example {
         *   "filters.date.start": "2023-04-25",
         *   "filters.date.end": "2023-05-30"
         * }
         */
        filters: {
          [key: string]: string
        }
        /**
         * @description This optional parameter sets the path of the directory of the data product definition files your application will use.
         *       "This query parameter is intended to be used in conjunction with the `dpr.lib.dataProductDefinitions.host` property to retrieve definition files from another application by using a web client.
         * @example definitions/prisons/orphanage
         */
        dataProductDefinitionsPath?: string
      }
      path: {
        reportId: string
        reportVariantId: string
      }
    }
    responses: {
      /** @description Bad Request */
      400: {
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description default response */
      default: {
        headers: {
          /** @description Provides additional information about why no data has been returned. */
          'x-no-data-warning'?: string
        }
        content: {
          'application/json': components['schemas']['Count']
        }
      }
    }
  }
  /** @description Gets summaries of all report definitions */
  definitions_1: {
    parameters: {
      query?: {
        /**
         * @description Set this parameter to filter the list to only include reports for the given rendering method.
         * @example HTML
         */
        renderMethod?: 'HTML' | 'PDF' | 'SVG'
        /**
         * @description This optional parameter sets the path of the directory of the data product definition files your application will use.
         *       "This query parameter is intended to be used in conjunction with the `dpr.lib.dataProductDefinitions.host` property to retrieve definition files from another application by using a web client.
         * @example definitions/prisons/orphanage
         */
        dataProductDefinitionsPath?: string
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['ReportDefinitionSummary'][]
        }
      }
      /** @description Bad Request */
      400: {
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
    }
  }
  /** @description Gets report definition containing a single variant. */
  definition: {
    parameters: {
      query?: {
        /**
         * @description This optional parameter sets the path of the directory of the data product definition files your application will use.
         *       "This query parameter is intended to be used in conjunction with the `dpr.lib.dataProductDefinitions.host` property to retrieve definition files from another application by using a web client.
         * @example definitions/prisons/orphanage
         */
        dataProductDefinitionsPath?: string
      }
      path: {
        /**
         * @description The ID of the report definition.
         * @example external-movements
         */
        reportId: string
        /**
         * @description The ID of the variant definition.
         * @example list
         */
        variantId: string
      }
    }
    responses: {
      /** @description OK */
      200: {
        content: {
          'application/json': components['schemas']['SingleVariantReportDefinition']
        }
      }
      /** @description Bad Request */
      400: {
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Internal Server Error */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
    }
  }
}
