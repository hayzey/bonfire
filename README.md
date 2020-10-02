# Bonfire
A Spotify music player web app. Requires a [Spotify Premium](https://www.spotify.com/premium/) subscription to log in and use.

This is a React app that was created with `create-react-app`. As such, most of the default scripts and setup that you could expect from a `create-react-app` project are present. The app is written in TypeScript and uses Spotify's Web API and Web Playback SDK.

## For Developers
### Contributing
If there are any [issues](https://github.com/hayzey/bonfire/issues) that you would like to work on, make a comment on the issue to let others know that you will be working on it, then feel free to submit a pull request when you're done.

For the most part, I won't accept any pull requests that add any new features or change the styling/layout of the app, **unless there is an issue in the tracker requesting that change.** If you feel like there is a cool feature the app could use, make an issue for it first so it can be more easily discussed before we dive into a code review.

This app uses the Spotify Web API and Web Playback SDK. Familiarise yourself with [the documentation](https://developer.spotify.com/documentation/) before continuing.

### Getting up and running

Before we get started, you'll need to set up an environment variable called `REACT_APP_SPOTIFY_CLIENT_ID` containing the public **Client ID** for an app that you will register in your Spotify developer console.

1. You need a [Spotify Premium](https://www.spotify.com/premium/) account to use the Spotify SDK. Subscribe if you haven't already, or turn back now.
2. Once you have a Premium account, go to your [Spotify developer dashboard](https://developer.spotify.com/dashboard/) and create an app.
3. Copy the **Client ID** for your newly created Spotify app.
4. Set your `REACT_APP_SPOTIFY_CLIENT_ID` environment variable. The easiest way is to make a `.env.local` file in your project root, and insert the line...
    
    `REACT_APP_SPOTIFY_CLIENT_ID=foobar`
    
    ...replacing `foobar` with your **Client ID** from step 3. Webpack will process this file when you build/run the project, and it will be gitignored. Otherwise, go through whatever other method you would usually use to set an environment variable in your environment (using the `export` command in a bash enviroment, for example).

Now that you've set up your environment variable, you're ready to go. In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
