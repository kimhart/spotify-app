# JW Music Player

This app is meant to control the JW Player Spotify account and instruct users how to connect to Sonos.

### Run Locally

#### 1. Install Dependencies

```
yarn install
```

#### 2. Build & Watch for Changes

Run the following commands concurrently to build your dev server at [localhost:3000](http://localhost:3000) and compile/watch your changes.

*Note:* A separate `buildCss` command is needed to process Less on an un-ejected `create-react-app` project like this one.

```
yarn start
yarn buildCss
```

## Deploy

This app is internally-facing and only has one deployment environment. [Manage deployments from Jenkins here](https://jenkins.longtailvideo.com/view/Design%20Team/job/Design--music.longtailvideo.com/).