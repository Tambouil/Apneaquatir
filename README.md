# Apneaquatir

Apneaquatir is a web application built with AdonisJS, Inertia, and React. It is designed for members and instructors of the Apneaquatir freedive club. The application allows users to consult and indicate their availability for different time slots at the Loïc Leferme diving pit. It also allows instructors to create and manage training sessions.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js >= 20.6.0
- pnpm
- Docker

### Installation

1. Clone the repository

```sh
git clone https://github.com/Tambouil/apneaquatir.git
```

2. Install the dependencies

```sh
pnpm install
```

3. Start the development database

```sh
docker-compose up -d
```

4. Run the migrations and seed the database

```sh
node ace migration:run --seed
```

5. Start the development server

```sh
node ace serve --watch
```

## Built With

- [AdonisJS](https://adonisjs.com/) - The Node.js framework used
- [Inertia.js](https://inertiajs.com/) - The protocol that allows to use React components in AdonisJS views
- [React](https://reactjs.org/) - The JavaScript library used
