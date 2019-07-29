import React from 'react'
import ReactDOM from 'react-dom'

import State from './components/State'
import './styles/index.scss'
import * as firebase from 'firebase';

var config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER,
    appId: process.env.REACT_APP_APP_ID,

};
firebase.initializeApp(config);
ReactDOM.render(<State />, document.getElementById('root'))