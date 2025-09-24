# React HTTP Methods Lab

A React application demonstrating CRUD operations (Create, Read, Update, Delete) using HTTP methods with JSONPlaceholder API.

## Features

- **GET** - Fetch and display posts from API
- **POST** - Create new posts with a form
- **PUT** - Edit existing posts in-place
- **DELETE** - Remove posts with confirmation
- **Error Handling** - User-friendly error messages
- **Loading States** - Loading indicators during API calls

## Technologies Used

- React 18
- Vite
- Axios (HTTP client)
- JSONPlaceholder API (mock REST API)

## Project Structure
```
src/
├── components/
│   ├── CreatePostForm.jsx    # Form for creating new posts
│   ├── EditPostForm.jsx      # Form for editing existing posts
│   └── PostList.jsx          # Displays list of posts with CRUD actions
├── services/
│   └── api.js                # API configuration and HTTP methods
└── App.jsx                   # Main component with state management
```


## Available Scripts

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Endpoints Used

- `GET /posts` - Fetch all posts
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update specific post
- `DELETE /posts/:id` - Delete specific post

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Learnings

This project demonstrates:
- HTTP methods implementation in React
- API integration with Axios
- State management for CRUD operations
- Error handling and loading states
- Component composition and prop drilling
- Form handling in React

## Note

This uses JSONPlaceholder API, which is a fake API for testing. Data changes are simulated and not persisted on the server.