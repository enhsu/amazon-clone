# Firebase

- [Firebase official docs - web setup](https://firebase.google.com/docs/web/setup)

## Create Firebase project, and get config content

1. Go to [Firebase](https://firebase.google.com/)
1. Right top, `Go to console`
1. Create a project
   - Named it: "amazon-clone"
   - Turn off the google analytics(turn on if you want)
1. Left top `Gear icon` > `Project settings`
1. At `Add an app to get started`, click the ![web register icon](/public/NOTES/firebase-web-register-icon.png)
   - Fill up the project name: "amazon-clone"
   - Keep `Also set up Firebase Hosting for this app.` NOT check
   - After it done, click `Continue to console`
1. Then go back to `Project settings`
   - Scroll down, we'll see the web app we just registered
   - At `SDK setup and configuration`, click the `Config` radio
   - Copy the config content, and paste it at `firebase.js`, which we'll create it in the project root folder

## Setting Authentication

1. On the left pannel > `Build` > `Authentication`
   - Click `Get started`
1. At `Additional providers`
   - Click `Google`, and enable it
   - Don't forget select the `Project support email`
   - Click `Save`
1. After Save is done, go `Authentication` > `Sign-in method` > `Sign-in providers` > `Google` > `Web SDK configuration`
   - `Web client ID` as `GOOGLE_CLIENT_ID`
   - `Web client secret` as `GOOGLE_CLIENT_SECRET`. P.S. make it save, don't show anyone :)
   - copy these two information to `.env.local` in our project
