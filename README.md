# Infinite Cat Gallery 🐈

This project is a React application that displays adorable cat images using **The Cat API**. It supports **infinite scrolling** — as the user scrolls to the bottom, more images are fetched and added seamlessly to the gallery.

## Features

- Infinite Scrolling: Automatically loads the next set of images as you scroll to the bottom.
- Error Handling: Displays an error message if data fetching fails.
- Loading State: Shows a loading message while fetching new data.
- Single Column Layout: Images are displayed as cards in a vertical layout.
- Responsive Design: Works smoothly across all screen sizes.

---

## Tech Stack

- React.js: Frontend framework.
- Tailwind CSS: For styling the user interface.
- The Cat API: To fetch adorable cat images.

---

## Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed. You can download them from:

```bash
https://nodejs.org/
```
### Installation
Clone the repository:

```bash

git clone <repository-link>
cd <repository-folder>
Install dependencies:
```
```bash

npm install
Run the development server:
```
``bash
Copy code
npm start
Open your browser and navigate to:

```bash

http://localhost:3000
Configuration
No API key configuration is needed for The Cat API — public access is available for basic endpoints.
```
### Project Structure
```bash
/src
 ├── App.js          # Main component containing the logic and layout
 ├── index.js        # Entry point for the React application
 └── index.css       # Tailwind CSS import
```
