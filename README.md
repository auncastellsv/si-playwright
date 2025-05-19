# si-playwright

Automated end-to-end testing using [Playwright](https://playwright.dev/).

## About the Tests

The main test file is located at `tests/event-tickets.spec.js`. This test automates the following validations for a sample event page:

- Navigates to the event page and waits for it to load
- Switches to the event iframe and validates:
  - The event title is displayed
  - The event date and location details are correct
  - The number of unique ticket types (by `data-id`) is exactly 5
  - The event description matches the expected text
  
  Extra steps added: 

- Selects a ticket and quantity, simulates a purchase flow, and verifies:
  - The correct ticket type is selected
  - The checkout process displays the cart totals
- Takes a screenshot of the final state for debugging or documentation


## Prerequisites
- Node.js v18 or higher
- npm (comes with Node.js)
- Git (for cloning and version control)

## Setup
1. **Clone the repository:**
   ```bash
   git clone git@github.com:auncastellsv/si-playwright.git
   cd si-playwright
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## Running Tests

### Headless (default)
```bash
npx playwright test
```

### With UI (for debugging)
```bash
npx playwright test --ui
```

## Viewing Reports
After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Notes
- Make sure you are using Node.js 18+ (check with `node -v`).
- If you use `nvm`, switch with `nvm use 18`.
- The test results and reports are saved in `test-results/` and `playwright-report/`.

## Troubleshooting
- If you see browser or dependency errors, re-run:
  ```bash
  npx playwright install
  ```
