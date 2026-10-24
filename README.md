# Next.js Currency Bank Application

A modern currency exchange and conversion web application built with **Next.js (App Router)** and **Zustand** for state management. This project was developed as a comprehensive practical assignment, mimicking real-world IT company interview tasks and business requirements.

## 🚀 Core Features

- **Automated Currency Detection:** Upon the first launch, the application requests the user's geolocation via `navigator.geolocation` and detects their local currency code using the **OpenCage Data API**. If permission is denied, it gracefully falls back to `USD`.
- **Smart Converter (Home Page):** Features a single conversational input field. Users can type natural language exchange queries (e.g., `15 USD in UAH`). The string is validated with a strict RegEx pattern before being parsed and sent to the API.
- **Live Exchange Rates (Rates Page):** Displays up-to-date currency exchange rates relative to the user's active base currency (e.g., `1 USD = 42.00 UAH`). The rendering logic filters out the base currency relative to itself to maintain clean data.
- **Interactive Base Currency Selector:** Integrated a custom dropdown component inside the `<Header />` powered by the `react-select` library. Changing the base currency instantly triggers a re-fetch and updates the live rates list.
- **Real-time Filter & Search:** Includes a "live search" input field on the Rates page, allowing users to look up currencies by their ISO codes or names on the fly.
- **Performance & Optimization:** Implements **Lazy Loading** for specific chunks and components to ensure fast initial page loads and a smooth user experience.

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router, Client Components)
- **Language:** TypeScript (Strict interfaces for state, props, and API objects)
- **State Management:** Zustand
- **Data Persistence:** Zustand Persist Middleware (`localStorage` synchronization with safe `hasHydrated` lifecycle state management)
- **Styling:** CSS Modules + custom styling overrides for third-party libraries
- **Icons & Animations:** `react-icons`, `react-animated-text`
- **API Integrations:** Axios, OpenCage Geocoding API, Exchange Rates Data API

## 📋 Architectural Steps Covered

1. **Routing Architecture:** Established `/` and `/rates` endpoints. Set up an automatic global redirect to the homepage for non-existent routes using `app/not-found.tsx`.
2. **Geolocation Checker:** Developed the `GeolocationChecker` component to handle raw client-side coordinates and securely fetch the user's specific ISO currency code.
3. **Zustand Store Infrastructure:** Built a centralized store in `stores/currencyStore.ts`. Configured `partialize` to selectively sync only the `baseCurrency` to `localStorage`, leaving short-lived variables (like `filter`, `isLoading`, and `exchangeInfo`) intact.
4. **Hydration Guarding:** Leveraged the `hasHydrated` state flag coupled with `onRehydrateStorage` to prevent server-client state mismatch (hydration errors) common during Next.js SSR processes.
5. **Validation & String Parsing:** Handled form submission validation using the requested `^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$` RegEx pattern, splitting valid strings into structured `to`, `from`, and `amount` properties.
6. **Reactive Computation:** Bound sorting, case-insensitive string filtering (`.includes()`), and currency unit conversion math `(1 / value).toFixed(2)` entirely to the global reactive state.

## 💻 Local Setup & Installation

1. Clone the repository to your local machine.
2. Install the project dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and append your API keys:
   ```env
   NEXT_PUBLIC_OPENCAGE_API_KEY=d4683b09d0c94ec0aebf0b2e043decbf
   NEXT_PUBLIC_API_LAYER_API_KEY=your_exchangerates_data_api_key
   ```
4. Spin up the local development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your web browser.
