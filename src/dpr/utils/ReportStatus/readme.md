# Report Status Utility

This file is responsible for checking, resolving, and updating the status of async reports in a single, consistent way.

It exists to solve a few problems we kept running into:

- The report status APIs behave inconsistently
- Status rules were being re‑implemented in multiple places
- Errors, timeouts, and child reports made the logic hard to reason about
- Polling pages and report lists needed the same behaviour, but with different outcomes

This utility pulls all of that logic into one place.

## What this utility does

At a high level, calling this utility will:

1. Fetch the latest status for a report (and any child reports)
2. Interpret the API responses safely (including some awkward edge cases)
3. Decide what the correct, authoritative status of the report should be
4. Update the stored report status if it has changed
5. Return the result so the caller can react (render, redirect, etc.)

The important thing is that all status rules live here, not in controllers or UI code.

## The one function you should use

There is only one public function exposed by this file:

```js
evaluateAndUpdateReportStatus(...)
```

This is the only function that callers should use.

Everything else in the file is an internal implementation detail and is deliberately kept private.

## How it works (conceptually)

Here’s how the flow looks when this function is called:

### 1.Fetch upstream status

- Calls the correct status API based on report type (Report vs Dashboard)
- Also fetches statuses for child reports if they exist

### 2. Normalise API responses

- String statuses like "SUBMITTED", "FINISHED", or "FAILED" are treated as valid execution states
- Numeric statuses (e.g. status: 0) are treated as API‑level errors
- Errors are formatted and simplified into a consistent structure

### 3. Resolve the real report status

Applies all business rules in one place:

- terminal states don’t change
- timeouts cause failures
- API errors cause failures
- "FAILED" is a valid execution result
- child reports affect the parent status

Produces a clear decision: no change or update required

### 4. Update the store

- If the status has changed, it updates the stored report
- If there was a failure, the failure info is stored alongside the status

## 5. Return the outcome

- The function returns what happened, and the updated report (if applicable)
- The caller decides what to do next (render, redirect, keep polling, etc.)
