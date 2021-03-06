# Slack-clone

Single page web app built with React for front-end and Firebase for back-end with user authentication using Google-auth and live chat.

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

* Public and private chat rooms
* Creating new private and public rooms
* Realtime sending and receiving of messages
* Online status indicator
* Displaying public room users

## Components

* Channels - used for rendering different types of channels
* Chat - used for displaying chat and rendering all message components
* ChatHeader - used for displaying info about current public or private chat
* ChatMessageInput - used for displaying chat input box and sending messages
* Dropdown - renders 2 dropdowns, one for channel, one for user
* Header - displays current user, search bar and other
* Login - used for rendering login component and logging in users
* Main - used for rendering ChatHeader, Chat and ChatMessageInput components
* Message - used for rendering a single message
* Sidebar - used for rendering all sidebar content

## Demo

![demo-pic1](https://user-images.githubusercontent.com/46342896/127707633-23f4b64f-084d-431e-8101-405c361f5993.png)

Login component

![demo-pic2](https://user-images.githubusercontent.com/46342896/127711358-33e0a35b-b83d-422f-a3de-e8b9876054c2.png)


## Usage

Before running the app, create new firebase project, cd into src/firebase.js file and add firebaseConfig const.

Then to run the app clone it, cd into directory and install all dependencies

```
$ git clone https://github.com/ilija-s/slack-clone
$ cd slack-clone
$ yarn && yarn start
```

Open in browser on `http://localhost:3000`
