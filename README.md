# Fetch Dog App

A web application for browsing and matching adoptable shelter dogs. Users can log in, filter dogs by breed, paginate through results, sort them alphabetically, favorite dogs, and generate a match based on their selected favorites.

## Features

- User login with name and email
- Dog search with breed filter, sorting, and pagination
- Favorite list with match generation
- Fully responsive UI

## Tech Stack

- React + Vite
- Tailwind CSS
- TypeScript
- Fetch-provided API

## Getting Started

```bash
npm install
npm run dev
```

This project uses environment variables for configuration. Set up your environment by copying the example file:

```bash
cp .env.example .env
```

The default API URL should work for most development purposes. Environment files (.env, .env.production) are excluded from version control for security best practices.
