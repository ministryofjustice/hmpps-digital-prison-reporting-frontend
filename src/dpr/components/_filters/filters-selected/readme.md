# Selected filters - how they work

Selected filters works slightly differently for interactive and request filtering.

## Interactive filters

### Initialising selected filters

- Selected filter data is initialised from the `utils.ts` file server side before page render
- Selected filters data is passed to the render funtion as a page template argument.

### Updating slected filters

- Updating an interactive filter will update the corresponding url search param with NO page reload.
- Applying the filters using the apply filters button reloads the page where the `req.query` will be contain the updated query.
- The `req.query` is then used to initialise the selected filter data and around we go

### Removing filters

- Button events are initialised in the selected filters `clientClass.ts`: `initInteractiveFilterButtons`
- Clicking a selected filter button removes it from the url search params and reloads the page. 

## Async request filters

### Initialising selected filters

- Selected filters are inititialised from the page urls search query
- The selected filters `clientClass.ts` populates the selected filters based on the search query

### Updating selected filters

- Updating an request filter will update the corresponding url search param with NO page reload.
- The input `change` event triggers a selected filter reload which builds a fresh selected filters list.

### Removing filters

- Button events are initialised in the selected filters `clientClass.ts`: `initSelectedFiltersButtons`
- Clicking a selected filter button updates the corresponding input to a null value, which updates the search query.
- The selected filters are then re-built from the updated search query. 
