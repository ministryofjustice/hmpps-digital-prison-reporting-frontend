# Selected filters

## Interactive filters

### Initialising selected filters

- Selected filters are initialised from the utils.ts file server side before page render
- Selected filters data is passed to the render as an argument.
- Updating interactive filters updates the url search params with NO reload.
- Applying the filters using the apply filters button reloads the page where the req.query will be set with the updated filters. 

### Removing filters

- Button events are initialised
- Clicking a selected filter button removes it from the url search params and reloads the page. 

## Async request filters

### Initialising selected filters

- Selected filters are inititialised from the the urls search query
- Uses the clientClass to populate the selected filters.
- async-filter-form clientClass inherits from filters-selected client class

### Removing filters
