# CustNote

> Customizable note-taking web application

## Disclaimer

The goal of the project is to master SvelteKit and relational databases. As a result, I learnt Milkdown's WYSIWYG editor, Firebase auth system, SCSS and PlanetScale database with Prisma ORM.

I used it to take notes on my university courses. Looking now, tests would save a lot of time.

The project is deployed on Vercel: https://cust-note-adrakpro.vercel.app. (currently offline)

Test account email and password are: `adam@gmail.com, 123456` or feel free to create own account with fake data.
(Sometimes PlanetScale deactivates due to inactivity).

## Environment Variables

In order to run you need to set up Firebase Auth and PlanetScale

- `VITE_FIREBASE_CONFIG`
- `VITE_FIREBASE_SERVICE_ACCOUNT_KEY` - serialized json with no spaces
- `VITE_WEB_API_KEY`
- `VITE_DATABASE_URL`

## Run Locally

Clone the project

```bash
  git clone https://github.com/AdrakPro/custnote.git
```

Go to the project directory

```bash
  cd custnote
```

Install dependencies

```bash
  npm install
```

Generate Prisma

```bash
  prisma generate
```

Start the server

```bash
  npm run dev
```

Start database

```bash
  npm run db
```

## License

[MIT](LICENSE.md)

## Feedback

If you have any feedback, feel free to reach out adam.makarewicz@proton.me
