🧪 Practice Software Testing – Automation Project
👩‍💻 Author

Anca Nechita – Junior QA Automation Engineer

📌 Project Overview

This project is a UI automation test suite built for the Practice Software Testing demo e-commerce application.

It demonstrates structured automation practices using:

- Playwright

- TypeScript

- Page Object Model (POM)

- GitHub Actions (CI)

The goal is to validate core e-commerce workflows while maintaining clean test architecture and stability.

🎯 Project Goals

- Validate core user-facing functionality

- Apply structured test design techniques

- Ensure full test isolation

- Maintain CI stability

- Demonstrate professional automation structure

🏗 Test Architecture

The framework follows:

- Page Object Model (POM)

- Clear separation of test logic and test data

- Reusable utility methods

- Modular test organization

📂 Folder Structure
pages/
tests/
test-data/
utils/

🔍 Modules Covered
🛍 Product Catalog

- Product listing

- Filtering (category, brand, eco badge)

- Sorting (A-Z, price asc/desc)

- Pagination

🔎 Search

- Exact match

- Partial match

- Case-insensitive search

- No-results scenario

🛒 Cart

- Add to cart

- Remove from cart

- Update quantity

- Boundary validation

- Total calculation

💳 Checkout

- Guest checkout

- Required field validation

- Order confirmation

- Cart reset validation

🔐 Authentication (Limited Scope)

- Login field validation

- Invalid credential handling

⚠️ Full authentication flows are excluded due to demo environment instability.

🧠 Test Design Techniques Applied

- Boundary Value Analysis

- Equivalence Partitioning

- Positive & Negative Testing

- Risk-Based Prioritization

🚀 CI / CD

- Continuous Integration is configured via GitHub Actions:

- Runs on push & pull request

- Headless Chromium execution

- Retries enabled

- Screenshot capture on failure

- Playwright trace enabled

- HTML report generation

⚠️ Known Limitations

The demo application includes:

- A database refresh endpoint

- Non-deterministic authentication behavior

- To ensure automation stability, tests avoid reliance on persistent sessions or shared state.

🛠 How to Run Locally
Install dependencies
npm install
Run tests
npx playwright test
Run in headed mode
npx playwright test --headed
View report
npx playwright show-report

📈 What This Project Demonstrates

- Clean Page Object implementation

- Stable UI sorting validation (with async handling)

- Pagination validation

- Isolation-safe test structure

- CI-ready automation setup
