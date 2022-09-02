# Progress

1. We use Tailwindcss for styles, first of all we need to make it work. [see Tailwindcss setup](./../env-setup/tailwindcss.md)
   - at the time, [src/styles/globals.css should looks like](./styles/globals.setup.css)
1. Also to make development more comfortable, we need some extensions of VSCode.

   - [VSCode setup](./../env-setup/vscode.md)
     - [vscode setup - emmet](https://code.visualstudio.com/docs/editor/emmet)
     - [vscode extensions - auto rename tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
     - [vscode extensions - Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/itemdetails?itemName=bradlc.vscode-tailwindcss)

1. create `Home page`.

   1. [src/pages/index.tsx - layout](./pages/index.layout.tsx)

      - we use [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) for pre-rendering the page's data.

   1. [src/components/Header.tsx - layout](./components/Header.layout.tsx)

      - we use [react-icons](https://react-icons.github.io/react-icons/) for the icons.

   1. [src/components/Banner.tsx - layout](./components/Banner.layout.tsx)

      - we use [react-responsive-carouse](https://react-responsive-carousel.js.org/) for the banner.

   1. [src/components/ProductFeed.tsx - layout, without commercial](./components/ProductFeed.layout.withoutCommercial.tsx)
   1. [src/components/Product.tsx - layout](./components/Product.layout.tsx)

      - We loaded image from `fakeStoreAPI`, need to maintain the domain in Next.js. [see images domains](https://nextjs.org/docs/api-reference/next/image#domains)
      - I got a problem while use `useState()` with a functional return value, here is the error message: `Hydration failed because the initial UI does not match what was rendered on the server`, the solution is use `useEffect()` while the component rendering at the first time to calculate the value. [solution reference click here](https://stackoverflow.com/questions/71706064/react-18-hydration-failed-because-the-initial-ui-does-not-match-what-was-render)
      - ~~Also, with typescript, I want to create `IProductProps` for the component's property, the `IProductProps` should extends by `IProduct` and let `rating` property as optional. [use `Omit` to solve the problem](https://bobbyhadz.com/blog/typescript-override-interface-property)~~
      - Base on [Types of Interfaces?](https://github.com/typescript-cheatsheets/react/blob/main/README.md#types-or-interfaces), I decided to use type instead of interface at component's props & state

   1. [src/components/ProductFeed.tsx - layout with commercial](./components/ProductFeed.layout.withCommercial.tsx)
      - TailwindCSS `grid-flow-row-dense` make it easy

1. Authentication

   1. We use [NextAuth](https://next-auth.js.org/) for authentication. create `[...nextauth].ts` in `/src/pages/api/auth` folder, example click [here](https://next-auth.js.org/getting-started/example)
      - Here to see the initialize [...nextauth.ts](./pages/api/auth/%5B...nextauth%5D.init.ts)
   1. Setup firebase, progress click [here](./../FIrebase/README.md)
      - About `firebase.js` file, we'll use it later.
   1. Use [next-auth/client API](https://next-auth.js.org/getting-started/client) handle `src/components/Header.tsx` account signin

      - we get the error `Authorization Error Error 400: redirect_uri_mismatch`, click [Learn more](https://developers.google.com/identity/protocols/oauth2/web-server#authorization-errors-redirect-uri-mismatch), and find out we have to review authorized redirect URIs in the Google API Console [Credentials page](https://console.cloud.google.com/apis/credentials)
      - Go to Google cloud, choice the project we created on firebase: `APIs & Services` > `Enabled APIs & services` > `Credentials`. In `OAuth 2.0 Client IDs`, add `http://localhost:3000` to `Authorized Javascript origins`, also add `http://localhost:3000/api/auth/callback/google` to `Authorized redirect URIs`

   1. Keep following the [Getting Started](https://next-auth.js.org/getting-started/example) in Next.js document, add `SessionProvider` in `_app.tsx`
      - initialize [\_app.tsx](./pages/_app.auth.tsx)
   1. In `src/components/Header.tsx`, use `useSession` hooks in `next-auth/react` for getting login information
   1. Now the Header component should look like [this](./components/Header.SignIn.tsx)

1. Build Cart function

   1. Define the goal
      1. After click the `Cart` at Header, go to `checkout page`
      1. We need `Redux` to handle the global store
   1. Setup [Redux](./../env-setup/redux.md)
      - Initialize [the store index file](./store/index.init.ts)
      - Also [the \_app.tsx](./pages/_app.redux.tsx)
   1. Create [cartReducer](./store/slices/cartSlice.init.ts) in `/src/store/slice` folder
   1. Handle the `addItemToCart` function and related component
      - [Product](./components/Product.add.to.cart.tsx) for `addItemToCart`
      - [Header](./components/Header.cart.items.count.tsx) for display the items count
   1. Build [checkout page](./pages/checkout/index.init.tsx)
   1. Build [CehckoutProduct component](./components/CheckoutProduct.init.tsx)
      - Reuse component [Rating](./components/Rating.init.tsx) & [Prime](./components/Prime.init.tsx)
   1. Also update the [cartReducer](./store/slices/cartSlice.new.add.and.remove.ts), update `addToCart(with count)` & `removeFromCart`
   1. According to the `cartReducer` updated, [Product](./components/Product.reuse.rating.and.prime.tsx) need to be updated

1. Handle Vercel deployment

   1. Add `secret` in [[...nextauth.ts]](./pages/api/auth/%5B...nextauth%5D.add.secret.ts)
   1. Add domain in GCP OAuth 2.0 Client IDs

1. Use [Stripe](https://stripe.com/docs) handle the payment
   1. Setup environment variable
      - Login the [Stripe](https://stripe.com/) official website
      - Select an account, and go to the `Developers` > `API keys`, we get `Publishable key` & `Secret key`
      - P.S. The `Developers` category should be on the top right corner(Aug, 2022)
      - Put `Publishable key` in `next.config.js` for the front-end
      - `Secret key` should be in `.env.local file`, keep it secret
   1. Setup Stripe
      - frontend, [React stripe.js](https://stripe.com/docs/stripe-js/react)
      - backend, [Accept a payment example](https://stripe.com/docs/payments/accept-a-payment)
      - [backend API more detail](- [Stripe checkout sessiont](https://stripe.com/docs/api/checkout/sessions/create))
   1. Update [checkout page](./pages/checkout/index.create.checkout.session.tsx)
   1. Create [api/create-checkout-session](./pages/api/create-checkout-session.init.ts)
   1. Add shipping rates in [Stripe](https://stripe.com/)
      - After login, in `Products` tab > `Shipping rates`, create a shipping rate
      - While done, copy the `Shipping rate ID` on top right, and it can be used in `/api/create-checkout-session`
   1. After the checkout can be done, we can have a `webhooks` scenario:
      1. `checkout page` -> `stripe checkout session`
      1. `checkout session` - update data -> `Firebase Database`
      1. `checkout session` - redirect -> `success page`
   1. Create [/src/api/webhook.ts](./pages/api/webhook.init.ts). P.S. The `webhook` can be named whatever we want, it's good to name it based on the event.
      1. For `webhook`, we need:
         - [Stripe CLI](https://stripe.com/docs/stripe-cli)
         - [micro](https://www.npmjs.com/package/micro)
         - [firebase-admin]https://www.npmjs.com/package/firebase-admin)
      1. Use `Strip CLI` create `STRIPE_SIGNING_SECRET`
         1. Login Stripe with `Stripe CLI`, `$ stripe login`. P.S. Choice the correct store
         1. In the terminal `$ stripe listen --forward-to localhost:3000/api/webhook`
         1. The console will show you the `webhook signing secret`
      1. And wee need to get the access to our firebase
         1. Go [Firebase](https://firebase.google.com/) > `Go to console` > Select the correct project > `Project settings` > `Service accounts`
         1. Click `Generate new private key`, and keep it save
         1. I god a problem: `FirebaseAppError: Failed to parse private key: Error: Invalid PEM formatted message.` while use the private key, [See the solution here](https://github.com/gladly-team/next-firebase-auth/discussions/95)
      1. Create `firebase database` and use it in [/api/webhook.ts](./pages/api/webhook.init.ts) `fullfillOrder` functioin
         - Go [Firebase](https://firebase.google.com/) > `Go to console` > Select the correct project > Build > Firebase Database > Create database > test mode will be fine
   1. Create [success.tsx](./pages/checkout/success.init.tsx) page.
   1. Create [orders.tsx](./components/Order.init.tsx) page.
      - use [Moment.js](https://momentjs.com/docs/#/displaying/format/) for timestamp
      - [firebase version 9, map snapshot](https://stackoverflow.com/questions/72070501/problem-while-upgrading-a-code-snippet-from-firebase-v8-to-firebase-v9)
      - [firebase, use asnyc with map](https://stackoverflow.com/questions/53149138/use-async-foreach-loop-while-fetching-data-from-firestore)
