# Overview

- This document provides information about NextJS Practice
- [Documentation details](https://docs.google.com/document/d/1sqv1N37HOSGQwBak-gxR8wh_LRBI57OPplnijmKl-SU/edit#heading=h.ar0k1bmftkqn)

## Table of Contents

- [Main app features](#main-app-features)
- [Targets](#targets)
- [Timeline](#timeline)
- [Tech Stacks](#tech-stacks)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone repository](#clone-repository)
  - [Installation commands](#installation-commands)

## Main app features

- Users
  - View users list
  - View user details
    - Add new user
    - Edit user
    - Delete user
    - Add techstack to user
- Techstacks
  - View techstacks list
  - View techstack details
    - Add new techstack
    - Edit techstack
    - Delete techstack

## Targets

- Understand and apply knowledge of Next.js to build an application.
- Unit test: Jest + React Testing Library
- Unit test coverage should greater than **80%**

## Timeline

- Estimate time: 10 days of working
- Actual time: TBD

## Tech Stacks

- [TypeScript](https://www.typescriptlang.org/): TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [React](https://reactjs.org/): A powerful JavaScript library for building user interfaces.
- [NextJS](https://nextjs.org/): A React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.
- [TailwindCSS](https://tailwindcss.com/): Tailwind CSS makes it quicker to write and maintain the code of your application
- [SWR](https://swr.vercel.app/docs/getting-started): SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data
- [Jest](https://jestjs.io/docs/getting-started): Jest is a delightful JavaScript Testing Framework with a focus on simplicity
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/): The testing library family of packages helps you test UI components in a user-centric way.
- [MockAPI](https://github.com/mockapi-io/docs/wiki/Quick-start-guide): mockapi.io is a simple tool that lets you easily mock up APIs, generate custom data, and perform operations on it using RESTful interface. It is meant to be used as a prototyping/testing/learning tool.

# Getting Started

### Prerequisites

- Node (v.18.0.0 or higher)
  - Install Node [here](https://nodejs.org/en/)

### Clone repository

- Step 1: Clone repository

```
https://gitlab.asoft-python.com/ngoc.nguyenquang/nextjs-training.git
```

- Step 2: Go to folder nextjs-training

```
cd nextjs-training
```

- Step 3: Checkout branch

```
git checkout practice
```

- Step 4: Go to folder user-management

```
cd user-management
```

### Installation Commands

All commands are run from the root of the project, from a terminal:

| **Command**          | **Action**                              |
| -------------------- | --------------------------------------- |
| pnpm i               | Installs dependencies                   |
| pnpm run dev         | Starts local dev server                 |
| pnpm run build       | Build your production site to `./dist/` |
| pnpm run start       | Start the build                         |
| pnpm run lint        | Detect code format error                |
| pnpm run test        | Start testing                           |
| pnpm run test:update | Start testing and update snapshot       |
| pnpm run format      | Check and format the code               |
| pnpm run prepare     | Install husky                           |
