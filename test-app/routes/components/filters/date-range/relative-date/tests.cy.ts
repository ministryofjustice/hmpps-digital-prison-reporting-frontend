import { setRedisState } from '../../../../integrationTests/redisStateTestUtils'

context('Inputs: Relative date range', () => {
  const path = '/components/filters/date-range/relative-date-range#relative-date-range-relative-range'
  const platformPath = '/embedded/platform/dpr/request-report/report/filter-inputs/variantId-15/filters'

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Setting the relative date range', () => {
    beforeEach(() => {
      cy.visit(path)
    })

    const expectDatePickerValues = () => {
      cy.findByRole('tab', { name: 'Date range' }).click()
      cy.findByRole('textbox', { name: 'From' }).should('not.have.value', '')
      cy.findByRole('textbox', { name: 'To' }).should('not.have.value', '')
      cy.findByRole('textbox', { name: 'From' })
        .invoke('val')
        .then((dateValue) => {
          expect(dateValue).to.match(/\d{2}\/\d{2}\/\d{4}/)
        })

      cy.findByRole('textbox', { name: 'To' })
        .invoke('val')
        .then((dateValue) => {
          expect(dateValue).to.match(/\d{2}\/\d{2}\/\d{4}/)
        })

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Relative Date-range start')
              break
            case 1:
              cy.wrap(filter).contains('Relative Date-range end')
              break
            default:
              break
          }
        })
      })
    }

    it('should set the relative date to none', () => {
      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'None' }).check()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.relative-date-range.relative-duration=none`)
      })
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('None')
              break
            default:
              break
          }
        })
      })

      cy.findByRole('tab', { name: 'Date range' }).click()
      cy.findByRole('textbox', { name: 'From' }).should('have.value', '')
      cy.findByRole('textbox', { name: 'To' }).should('have.value', '')
    })

    it('should set the relative date to yesterday', () => {
      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'Yesterday' }).check()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.relative-date-range.relative-duration=yesterday`)
      })
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Yesterday')
              break
            default:
              break
          }
        })
      })

      expectDatePickerValues()
    })

    it('should set the relative date to tommorrow', () => {
      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'Tomorrow' }).check()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.relative-date-range.relative-duration=tomorrow`)
      })
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Tomorrow')
              break
            default:
              break
          }
        })
      })

      expectDatePickerValues()
    })

    it('should set the relative date to last week', () => {
      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'Last week' }).check()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.relative-date-range.relative-duration=last-week`)
      })
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Last week')
              break
            default:
              break
          }
        })
      })

      expectDatePickerValues()
    })

    it('should set the relative date to next week', () => {
      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'Next week' }).check()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.relative-date-range.relative-duration=next-week`)
      })
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Next week')
              break
            default:
              break
          }
        })
      })

      expectDatePickerValues()
    })

    it('should set the relative date to last month', () => {
      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'Last month' }).check()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.relative-date-range.relative-duration=last-month`)
      })
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Last month')
              break
            default:
              break
          }
        })
      })

      expectDatePickerValues()
    })

    it('should set the relative date to next month', () => {
      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'Next month' }).check()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.relative-date-range.relative-duration=next-month`)
      })
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Next month')
              break
            default:
              break
          }
        })
      })

      expectDatePickerValues()
    })
  })

  describe('User defined defaults', () => {
    beforeEach(() => {
      cy.task('resetStubs')
      cy.task('resetRedis')
      cy.task('stubDefinitions')
      cy.task('stubFilterInputsVariant15Def')
      cy.visit(platformPath)
    })

    it('should save relative date range', () => {
      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'Yesterday' }).check()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1.relative-duration=yesterday`)
      })
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Yesterday')
              break
            default:
              break
          }
        })
      })

      cy.findByRole('button', { name: 'Save current filter values as defaults for this report' }).click()

      cy.location().should((location) => {
        expect(location.search).to.contain('defaultsSaved=true')
      })

      cy.findByRole('button', { name: 'Update defaults' }).should('exist')
      cy.findByRole('button', { name: 'Delete defaults' }).should('exist')

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Yesterday')
              break
            default:
              break
          }
        })
      })
    })

    it('should pre-fill the filter values with the saved defaults next visit', () => {
      setRedisState({
        requestedReports: [],
        recentlyViewedReports: [],
        bookmarks: [],
        downloadPermissions: [],
        defaultFilters: [
          {
            reportId: 'filter-inputs',
            id: 'variantId-15',
            values: [
              {
                name: 'field1',
                value: { start: '', end: '', relative: 'yesterday' },
              },
            ],
          },
        ],
      })
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1.relative-duration=yesterday`)
        expect(location.search).not.to.contain(`defaultsSaved=true`)
      })

      cy.findByRole('button', { name: 'Update defaults' }).should('exist')
      cy.findByRole('button', { name: 'Delete defaults' }).should('exist')

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Yesterday')
              break
            default:
              break
          }
        })
      })

      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'Yesterday' }).should('be.checked')
    })

    it('should update the saved defaults', () => {
      setRedisState({
        requestedReports: [],
        recentlyViewedReports: [],
        bookmarks: [],
        downloadPermissions: [],
        defaultFilters: [
          {
            reportId: 'filter-inputs',
            id: 'variantId-15',
            values: [
              {
                name: 'field1',
                value: { start: '', end: '', relative: 'yesterday' },
              },
            ],
          },
        ],
      })
      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'Last week' }).check()

      cy.findByRole('button', { name: 'Update defaults' }).click()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1.relative-duration=last-week`)
      })

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Last week')
              break
            default:
              break
          }
        })
      })

      cy.reload()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1.relative-duration=last-week`)
      })
    })

    it('should remove the save defaults', () => {
      setRedisState({
        requestedReports: [],
        recentlyViewedReports: [],
        bookmarks: [],
        downloadPermissions: [],
        defaultFilters: [
          {
            reportId: 'filter-inputs',
            id: 'variantId-15',
            values: [
              {
                name: 'field1',
                value: { start: '', end: '', relative: 'yesterday' },
              },
            ],
          },
        ],
      })
      cy.findByRole('button', { name: 'Delete defaults' }).click()

      cy.location().should((location) => {
        expect(location.search).not.to.contain(`filters.field1.relative-duration=`)
        expect(location.search).not.to.contain(`filters.field1.start=`)
        expect(location.search).not.to.contain(`filters.field1.end=`)
      })
    })
  })

  describe('validation', () => {
    beforeEach(() => {
      cy.visit(platformPath)
    })

    it('should display validation messages', () => {
      cy.findByRole('alert').should('not.exist')
      cy.findAllByRole('paragraph').contains('Relative date-range start is required').should('not.exist')
      cy.findAllByRole('paragraph').contains('Relative date-range end is required').should('not.exist')
      cy.findByRole('textbox', { name: 'From' }).clear().blur()
      cy.findByRole('textbox', { name: 'To' }).clear().blur()
      cy.findByRole('button', { name: 'Request report' }).click()
      cy.findByRole('alert').should('exist')
      cy.findAllByRole('paragraph').contains('Relative date-range start is required').should('exist')
      cy.findAllByRole('paragraph').contains('Relative date-range end is required').should('exist')
    })
  })
})
