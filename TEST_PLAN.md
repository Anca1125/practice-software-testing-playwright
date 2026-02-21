🧪 Test Plan – Practice Software Testing Automation Project
Project Name: Practice Software Testing
Test Type: Functional UI Automation
Automation Tool: Playwright + TypeScript
Author: Anca Nechita – Junior QA Automation Engineer
Planned Completion Date: 30 March 2026

1. Introduction

   This document defines the testing strategy, scope, approach, and quality criteria for the UI automation project developed for the Practice Software Testing e-commerce application.
   The objective of this project is to validate core business functionalities of the application through automated UI testing while ensuring execution stability in a Continuous Integration (CI) environment.

   This document describes:

- Scope of testing

- Excluded areas

- Test approach and methodology

- Applied test design techniques

- Risks and mitigation strategies

- Entry and exit criteria

- Deliverables

2. Application Overview

   Practice Software Testing is a demo e-commerce web application designed for automation and manual testing practice.
   The platform simulates a real-world shopping experience and allows users to:

- Browse products

- Apply filters and search

- View product details

- Add products to cart

- Register a new account

- Complete checkout as guest

- Confirm orders

The application represents a standard e-commerce workflow suitable for UI automation validation.

3. Scope

   3.1 In Scope
   The automation suite covers the following modules and functionalities:

🔐 Authentication Module (Limited Scope)

- User registration (positive scenarios)

- Registration field validation (negative scenarios)

⚠️ Note:
Due to demo environment instability and non-deterministic authentication behavior (database refresh and session inconsistency), login-dependent flows are intentionally excluded to maintain execution reliability and CI stability.

🛍 Product Catalog Module

- Product listing

- Product details page

- Category filtering

- Price filtering

- Sorting (ascending / descending)

- Pagination

- Homepage main elements

- Language selection

🔎 Search Module

- Exact match search

- Partial match search

- Case-insensitive search

- No results scenario

🛒 Cart Module

- Add product to cart

- Remove product from cart

- Update product quantity

- Quantity boundary values (0, negative, large values)

- Cart persistence

- Total price calculation

💳 Checkout Module (Guest Flow)

- Guest checkout

- Required fields validation

- Invalid input validation

- Order confirmation

- Cart reset after successful order

⚙️ Automation Infrastructure

- Page Object Model (POM) architecture

- Test isolation

- CI execution

- Screenshot and trace generation on failure

- HTML reporting

  3.2 Out of Scope

The following areas are excluded from automation:

- Login functionality

- Authenticated user flows

- Session persistence validation

- Password change functionality

- Performance testing

- Load testing

- Security testing

- Full accessibility audit

- Mobile testing

- Cross-browser exhaustive validation

- Direct database validation

- Third-party payment gateway validation

4. Test Strategy

   4.1 Test Approach

   The project follows a Functional End-to-End UI Testing approach using:

- Playwright framework

- TypeScript

- Page Object Model (POM) design pattern

- Test isolation principles

- Data-driven testing where applicable

- Network observation using Playwright tools

The focus is on validating user-visible behavior and critical guest-based business flows.

4.2 Types of Testing Included

- Smoke Testing

- Regression Testing

- Negative Testing

- Boundary Value Analysis

- Equivalence Partitioning

- State-based testing (cart persistence)

  4.3 Test Levels

System Testing (UI Level)

End-to-end validation of complete user journeys such as:

Add to Cart → Checkout → Confirmation

Backend services are not directly tested; validation is performed through UI behavior and observable network responses.

5. Test Coverage Strategy

   Test coverage ensures validation of both critical and extended functionalities.

   Smoke Suite

   Covers core guest business flows:
   - Register

   - Add to Cart

   - Guest Checkout

Regression Suite

Covers:

- Filters

- Sorting

- Search scenarios

- Negative cases

- Boundary cases

The objective is to ensure stable CI execution and deterministic results.

6. Test Design Techniques
   The following techniques are applied:

- Boundary Value Analysis

- Equivalence Partitioning

- Positive and Negative Testing

- Risk-based prioritization

- State-based testing

7. Test Environment

   Runtime: Node.js (LTS)
   Framework: Playwright (latest stable version)
   Language: TypeScript

   Browsers

   Local execution:
   - Chromium
   - Firefox (optional validation)

CI execution:

- Chromium (for consistency)

Execution Modes

- Local: Headed mode

- CI: Headless mode

8. CI/CD Strategy
   Continuous Integration is implemented using GitHub Actions.
   The CI pipeline includes:

- Automatic execution on Push

- Automatic execution on Pull Request

- Retry mechanism (maximum 2 retries)

- Screenshot capture on failure

- Playwright Trace generation

- HTML report generation

9. Test Data Management

   Due to database refresh behavior of the demo application:

- Authentication-dependent test data is not relied upon.

- Dynamic test data generation is used where applicable.

- Test data is stored in structured JSON files to separate logic from data.

10. Naming Conventions
    Test Files

- register.spec.ts

- cart.spec.ts

- checkout.spec.ts

Test Case Naming Format
[Module] - [Action] - [Expected Result]
Example:
Register – Valid Data – Should redirect to Login page

Coding Standards

- camelCase naming convention

- Prefer Playwright locators (getByRole, getByLabel, getByTestId)

- Centralized selectors via Page Objects

11. Risks and Mitigation

    Identified Risk Mitigation Strategy

Demo environment instability Limit scope to deterministic flows
Dynamic selectors Use stable Playwright locators
Flaky tests Use auto-wait and limited retries
UI changes Centralized selectors via POM
Data dependency Use dynamic data generation
Network latency Use proper waiting strategies

12. Entry Criteria

Before executing the automation suite:

    - Application is accessible

    - Environment is stable

    - Playwright is installed

    - Browsers are downloaded

    - CI pipeline is configured

13. Exit Criteria

Testing is considered complete when:

    - All Smoke tests pass

    - At least 95% stability is achieved in three consecutive CI runs

    - No critical guest or product-related flow is failing

    - All detected defects are documented

    - Final HTML report is generated

14. Deliverables

- Automation framework structured using POM

- Public GitHub repository

- Test Plan document

- README file

- CI workflow configuration

- HTML execution reports

- Screenshots and traces for failed tests

- Documented defects (GitHub Issues)
