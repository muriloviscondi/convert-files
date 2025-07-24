# Convert Files

A modern web application for converting files between different formats (CSV, JSON, XLSX). Built with React, TypeScript, and Vite, featuring a clean UI powered by Chakra UI.

## Features

- **Multi-format file conversion** supporting:
  - CSV ↔ JSON
  - CSV ↔ XLSX
  - JSON ↔ XLSX
- **Drag & drop file upload** with visual feedback
- **Real-time conversion** with progress indicators
- **Error handling** with user-friendly messages
- **Modern UI** with Chakra UI components
- **Type-safe** TypeScript implementation
- **Responsive design** that works on all devices

## Supported Conversions

| From | To   | Status |
| ---- | ---- | ------ |
| CSV  | JSON | ✅     |
| CSV  | XLSX | ✅     |
| JSON | CSV  | ✅     |
| JSON | XLSX | ✅     |
| XLSX | CSV  | ✅     |
| XLSX | JSON | ✅     |

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Framework**: Chakra UI v3
- **Styling**: Emotion + Styled Components
- **Form Handling**: React Hook Form with Zod validation
- **File Processing**:
  - PapaParse for CSV handling
  - SheetJS (xlsx) for Excel files
  - FileSaver.js for downloads
- **Icons**: Lucide React + React Icons
- **Code Quality**: ESLint + Prettier
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/muriloviscondi/convert-files.git
cd convert-files
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production (includes linting, type checking, and optimized build)
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

### Code Quality Tools

- **ESLint**: Comprehensive linting with TypeScript support
- **Prettier**: Code formatting with custom configuration
- **TypeScript**: Strict type checking enabled
- **Import Sorting**: Automatic import organization

## Development Features

- **Path Aliases**: Configured for clean imports
  - `@lib` - Business logic and utilities
  - `@components` - UI components
  - `@convert-files` - Convert files feature module
  - `@pages` - Page components
- **Hot Module Replacement** with Vite
- **TypeScript** strict mode enabled
- **ESLint** with custom configuration
- **Prettier** for code formatting

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── features/       # Feature-specific components (Dropzone)
│   ├── icons/          # Icon components
│   ├── layout/         # Layout components (Box, Container, Flex, Stack)
│   ├── typography/     # Typography components
│   ├── ui/             # Base UI components (Button, Field, Select, etc.)
│   └── utilities/      # Utility components (Portal)
├── features/           # Feature modules
│   └── convert-files/  # File conversion feature
│       └── components/ # Feature-specific components
│           └── formComponent/ # Main conversion form
├── lib/                # Business logic and utilities
│   ├── chakra-ui/      # Chakra UI configuration
│   ├── file-converter/ # File conversion logic
│   └── styled-components/ # Styled components setup
├── pages/              # Page components
│   └── home/           # Home page with conversion interface
└── types/              # TypeScript type definitions
```

## How to Use

1. **Select conversion formats**: Choose the source format and target format using the dropdown selectors
2. **Upload file**: Drag and drop your file into the upload area or click to browse
3. **Convert**: Click the "Submit" button to start conversion
4. **Download**: The converted file will automatically download to your device

## File Format Requirements

- **CSV**: Standard comma-separated values format with headers
- **JSON**: Must contain an array of objects for CSV/XLSX conversion
- **XLSX**: Standard Excel format (.xlsx extension), uses first worksheet

## Error Handling

The application includes comprehensive error handling for:

- Invalid file formats
- Corrupted files
- Empty or malformed data
- Network issues during processing

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source. Please check the repository for license information.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/) for fast development
- UI components from [Chakra UI](https://chakra-ui.com/)
- File processing powered by [PapaParse](https://www.papaparse.com/) and [SheetJS](https://sheetjs.com/)
