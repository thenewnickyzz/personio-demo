# Personio demo app

This is an application that renders a table of job candidates and has features like sorting, filtering and pagination.

All components were built by hand and no libraries were used except tailwindcss for styling.

The tech stack is primarily based on react, typescript, nextjs, tailwindcss, react-query and storybook.

The project also includes eslint, prettier and commitlint.

## Instructions

Before you run the app you will have to install the packages

```
yarn
```

or

```
npm install
```

To start the app in dev mode

```
yarn dev
```

and navigate to http://localhost:3000/

To run storybook

```
yarn storybook
```

and navigate to http://localhost:6006/

To run the tests

```
yarn test
```

## Structure

There is only one main page and that it can be found under src/pages/index.tsx

Also there is one api route responsible for communicating with the external api which can be found at src/pages/api/applicants.ts

All components can be found at src/components. Each component has the MainComponent.tsx, MainComponent.stories.tsx and an index.tsx for easy import/export
