[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)]
[![Provision Neo4j](https://grandstack.io/img/provision-neo4j.png)](https://sandbox.neo4j.com/?usecase=blank-sandbox)


# Bsuf UI Coding Challengue
This project uses the [GRANDstack Starter](https://grandstack.io) (GraphQL, React, Apollo, Neo4j Database) application. There are two components to the starter, the web frontend application (in React and Angular flavors) and the API app (GraphQL server).

```
npx create-grandstack-app nameAPP
```


## Quickstart

The easiest way to get started with the GRANDstack Starter is to create a Neo4j Sandbox instance and use the `create-grandstack-app` command line tool.

## Main technologies

* [Neo4j Sandbox](https://neo4j.com/sandbox) Used to create a free hosted Neo4j instance, in this case the database for the project
* [Create React App](https://create-react-app.dev/docs/getting-started/) to build the UI for the project, Check webapp folder for more details how it is coded.
* [Material-UI](https://material-ui.com/) To build the components for the UI.
* [GraphQL](https://graphql.org/),[Apolo](https://www.apollographql.com/docs/apollo-server/)to make the API request for loading and filtering data from the Neo4j database. To check api directory to see details how it was customized
* [Prettier](https://prettier.io/) for automated code formatting



### 2. Install dependencies

```
npx install
```

and then for start development

```
npm start
```

Make sure you configure the .env file for setting you NEO4j credentials. Othewise you won't be able to see
the app properly.

### 3. Seed the database (optional)

Once the application is running, in another terminal run

```
npm run seedDb
```

or with Yarn

```
yarn run seedDb
```

## Overview

The GRANDstack Starter is a monorepo that includes a GraphQL API application and client web applications for React (default).

### `/` - Project Root

The root directory contains some global configuration and scripts:

- `npm run start` and `npm run build`
- ESLint (.eslintrc.json) for code linting
- Prettier (.prettierrc.json) for code formatting
- Git hooks for applying formatting on commit

### [`/api`](./api)



This directory contains the GraphQL API application using Apollo Server and neo4j-graphql.js.

- Change environment variable settings in `.env`:

```
# Use this file to set environment variables with credentials and configuration options
# This file is provided as an example and should be replaced with your own values
# You probably don't want to check this into version control!

NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=letmein

# Uncomment this line to enable encrypted driver connection for Neo4j
#NEO4J_ENCRYPTED=true

# Uncomment this line to specify a specific Neo4j database (v4.x+ only)
#NEO4J_DATABASE=neo4j

GRAPHQL_SERVER_HOST=0.0.0.0
GRAPHQL_SERVER_PORT=4001
GRAPHQL_SERVER_PATH=/graphql

```

### [`/web-react`](./web-react)

The frontend React web application is found in this directory.

It includes:

- Material UI
- React router
- Apollo Client / React Hooks
- Create React App

## Deployment

### Netlify

This monorepo can be deployed to Netlify. The frontend application will be served over Netlify's CDN and the GraphQL API will be provisioned as a serverless GraphQL API lambda function deployed to AWS (via Netlify). A netlify.toml file is included with the necessary build configurations. The following environment variables must be set in Netlify (either via the Netlify web UI or via the command line tool)

```
NEO4J_URI
NEO4J_USER
NEO4J_PASSWORD
```

Check the app running on the [server](https://brave-khorana-e780ab.netlify.app/)


## Docker Compose

You can quickly start via:

```
docker-compose up -d
```

If you want to load the example DB after the services have been started:

```
docker-compose run api npm run seedDb
```


This project is licensed under the Apache License v2.
Copyright (c) 2020 Neo4j, Inc.
