# Weather App Frontend

A modern, responsive weather application built with React, TypeScript, and Vite. This frontend application provides a user-friendly interface for checking weather information.

## 🚀 Features

- Modern UI with Tailwind CSS
- Type-safe development with TypeScript
- Responsive design
- Toast notifications for user feedback
- Loading spinners for better UX
- React Router for navigation
- Axios for API requests
- Comprehensive test suite with Jest and React Testing Library

## 🛠️ Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Icons
- React Spinners
- React Toastify
- Jest
- React Testing Library
- ts-jest

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` by default.

## 📝 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally
- `npm test` - Run the test suite
- `npm test -- --watch` - Run tests in watch mode
- `npm test -- --coverage` - Run tests with coverage report

## 🧪 Testing

The application includes a comprehensive test suite using Jest and React Testing Library. Tests are located in `__tests__` directories alongside their respective components.

### Test Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── __tests__/
│   │   │   └── LoginPage.test.tsx
│   │   └── LoginPage.tsx
│   └── WeatherLookup/
│       ├── __tests__/
│       │   ├── WeatherLookup.test.tsx
│       │   ├── WeatherDisplay.test.tsx
│       │   ├── CityInput.test.tsx
│       │   └── SuggestionsDropdown.test.tsx
│       └── ...
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage

The test suite covers:
- Component rendering
- User interactions
- API integration
- Error handling
- Loading states
- Navigation
- Local storage operations

## 🏗️ Project Structure

```
weather-frontend/
├── src/           # Source files
├── public/        # Static assets
├── dist/          # Production build
└── ...
```

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration
- `postcss.config.js` - PostCSS configuration
- `jest.config.js` - Jest configuration
- `tsconfig.jest.json` - TypeScript configuration for Jest
