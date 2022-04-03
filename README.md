# Oriol Escolar's Crypto Wallet

In this document I will give a bit of a techincal breakdown of the technologies I used and instructions to start and test everything.

## Structure

The Project is separated in the following folders:

- Api (All the backend related code is found in that folder)

- Pages (NextJS Pages folder)

- Styles (NextJS Pages stylesheets)

- App (NextJS App components and middleware)

## App

The App has been developed using NextJS

```

## Server

To develop the Server I've used NodeJS with Express and http package to serve both NextJS and Api requests through the express server. For the database I've used MongoDB with Mongoose framework.

To start the app execute the following command:

```sh
npm run dev
```

## Comments

I've added the `.env` file just for demonstration, in real environments this file should not be in the repository.

## Things I would have liked to do / improved

For the server side, in an ideal case I would have liked to test both the router and not the model's logic.

I would have also liked to perform some Integration and unit tests in the App (NextJS).

Unfortunately I haven't been able to do the testing and code comments I woudl have liked due to lack of time and personal issues. All of this has been done in aproximately 6 hours, as I've said, due to lack of time caused by personal stuff.

I am looking forward to discuss my approach and some things I would have done in a real case scenario.
