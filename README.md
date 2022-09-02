# Amazon Clone

An Amazon-clone project, which is built
by [Next.js](https://nextjs.org/), and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

see [Demo](https://amazon-clone-enhsu.vercel.app/)

## Tec

- Next.js
- React
- Redux
- Typescript
- TailwindCSS
- NextAuth
- Stripe
  - Webhooks
- Firebase

## Functional Parts

- SignIn with `Google` or `Github` account
- SignOut
- Add items to Cart
- Payment with `Stripe`
- See orders while SignIn

## Development Notes

- [The development progress](./NOTES/Progress/README.md)

## Local Getting Started

```bash
$ yarn install
$ yarn dev
# need .env.local file to make it work fine
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Variables in .env.local

- `NEXTAUTH_SECRET`, for NextAuth
- `GOOGLE_CLIENT_ID`, for NextAuth GoogleProvider
- `GOOGLE_CLIENT_SECRET`, for NextAuth GoogleProvider
- `GITHUB_ID`, for NextAuth GitHubProvider
- GITHUB_SECRET, for NextAuth GitHubProvider
- STRIPE_PUBLIC_KEY, for Stripe
- STRIPE_SECRET_KEY, for Stripe
- STRIPE_SIGNING_SECRET, for Stripe verify the HOST
- SERVICE_ACCOUNT_KEY, for Stripe webhook
- FIREBSE_CONFIG, for firebase
- HOST, host url
