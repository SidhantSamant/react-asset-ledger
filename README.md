# Asset Ledger

A high-performance asset management system to handle massive datasets efficiently using virtualization and modern state management.

## Tech Stack

This project is built using the following modern web technologies:

- **React 19 + TypeScript**: Core framework and language for building the user interface.
- **TanStack Query (React Query)**: Handles efficient data fetching, caching, synchronization, and infinite scrolling management.
- **TanStack Virtual (React Virtual)**: Enables high-performance rendering of large lists (1 Million+ items) by rendering only the rows currently visible in the viewport.
- **Tailwind CSS**: A utility-first CSS framework for rapid, responsive styling.

## Features

- **Massive Dataset Handling**: Capable of scrolling through 1 Million mock assets seamlessly.
- **Virtualization**: Uses `useVirtualizer` to keep the DOM lightweight.
- **Infinite Scroll**: Automatically loads new batches of data as you scroll down.
- **Smart Search**: Debounced search input with request cancellation (`AbortController`) to handle fast typing.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

Follow these steps to set up and run the application locally.

```bash
git clone react-asset-ledger
cd react-asset-ledger
npm install
npm run dev
```

The application will be available at http://localhost:5173
