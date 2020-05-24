# Fullstack Open 2020

This repository contains my solutions to the exercises of [University of Helsinki's Fullstack Open Course](https://fullstackopen.com/en).  
The course consists of 9 parts:

1. Introduction to React.JS
2. Communicating with a server
3. Node.JS & Express.JS
4. Testing Express servers & User administration
5. Testing React Apps
6. State management with Redux
7. React router, custom hooks, webpack & styling React apps with CSS
8. GraphQL
9. TypeScript

<br>

---

## Part 1 - React.JS

This part covers React.JS, working with components, JSX and passing data to components. It goes on with page re-rendering, event handling, passing states to child components and how changes in state cause re-rendering.
Towards the end it addresses managing more complex states, conditional rendering, gives a brief overview of old React (pre v16), debugging of React apps, rules of hooks and passing event handlers to child components.

Part 1 required 3 exercises for submission:

1. [Course Information](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%201/courseinfo)
2. [Unicafe](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%201/unicafe)
3. [Anecdotes](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%201/anecdotes)

<br>

---

## Part 2 - Server Communication

In this part communication with servers via [Axios](https://github.com/axios/axios) and promises gets explained. For this purpose, a server gets simulated with [JSONServer](https://github.com/typicode/json-server). React effect hooks also get introduced together with the concept of REST APIs, sending data to the server and changing existing data on it. The chapter closes with error handling and one method of applying CSS styling to React apps.

Again, 3 exercises were required:

1. [Course Information](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%202/course%20contents) (Continuation from Part 1)
2. [Phonebook](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%202/phonebook)
3. [Countries](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%202/countries) (Working with external REST API)

<br>

---

## Part 3 - Node.JS & Express.JS

This part focuses on the backend and implementing functionality on the server side with REST APIs via Node.JS and [Express.JS](https://expressjs.com/), while the data gets stored in a [MongoDB](https://www.mongodb.com/) database using [Mongoose](https://mongoosejs.com/) for object modeling. It also covers deploying apps to the internet via [Heroku](https://www.heroku.com/), promise chaining and linting with [ESLint](https://eslint.org/).

The exercise for this part consisted of building a backend for the Phonebook-Exercise in the previous part.

- [Link to the Repository with my solution](https://github.com/BunnyTheLifeguard/fullstackopen2020-part3)

<br>

---

## Part 4 - Testing Express servers & User administration

Part 4 continues with working on the backend by writing unit- and integration tests with the [Jest](https://jestjs.io/) library and implementing user authentication and authorization via [JSON Web Tokens](https://github.com/auth0/node-jsonwebtoken).

For this part, the exercise consisted of building a simple application that renders a list of blogs and implementing testing accordingly.  
Then token-based authentication and user login gets implemented.

- [Link to Repository with my solution](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%204/Blog%20list)

<br>

---

## Part 5 - Testing React Apps

Going back to the frontend, the login/token functionality gets implemented there, testing the frontend gets covered and the chapter closes with a section on end to end testing using [Cypress](https://www.cypress.io/).

The exercise consisted of building the frontend for the previous exercise (Bloglist) and implementing the testing.

- [Link to my Repository with my solution](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%205/bloglist-frontend)

<br>

---

## Part 6 - State management with Redux

The previous parts placed the application's state and state logic directly inside React-components. This part covers state management outside React-components using the [Redux](https://redux.js.org/) library.

The exercises for Part 6 revisit two previous exercises for implementing Redux state management:

1. [Unicafe revisited](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%206/unicafe-redux)
2. [Anecdotes revisited](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%206/redux-anecdotes)

<br>

---

## Part 7 - React router, custom hooks, webpack & styling React apps with CSS

This part covers a couple of different topics. First is dividing an application into different views based on URLs and using React router. Then it goes into React hook functions and how to create custom hooks. Next styling apps with UI frameworks like [React Bootstrap](https://react-bootstrap.github.io/), [Material UI](https://material-ui.com/) and [Bulma](https://bulma.io/) gets introduced. The final section of this part covers [Webpack](https://webpack.js.org/) and gives a brief introduction to React/Node-Application security.

Exercises for part 7:

- [Blogs Backend](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%207/blogs-backend)
- [Blogs Frontend](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%207/blogs-frontend)
- [Country Hook](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%207/country-hook)
- [Anecdotes with Routers](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%207/routed-anecdotes)
- [Ultimate Hooks](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%207/ultimate-hooks)

<br>

---

## Part 8 - GraphQL

As an alternative to REST for communication, this part covers Facebook's [GraphQL](https://graphql.org/) in depth using the leading library [Apollo Server](https://www.apollographql.com/docs/apollo-server/). Topics include Database and user administration, Login and updating the cache, fragments and subscriptions.

The technology was put into practice using the following exercises:

- [Library Backend](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%208/library-backend)
- [Library Frontend](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%208/library-frontend)

<br>

---

## Part 9 - TypeScript

The final part of the course covers TypeScript in depth using the previously introduced tools to build end-to-end features to an existing ecosystem with predefined linters. Among the topics covered are creating types, configuring the compiler, using TS with [Express.JS](https://expressjs.com/), proofing requests using type-guards for validation, state handling with context and building forms using [Formik](https://jaredpalmer.com/formik/).

The following exercises were used to put TypeScript into practice:

- [Calculator](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%209/calculators)
- [Course Information TS](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%209/course-ts)
- [Patientor Backend](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%209/patientor-backend)
- [Patientor Frontend](https://github.com/BunnyTheLifeguard/fullstackopen2020/tree/master/Part%209/patientor)
