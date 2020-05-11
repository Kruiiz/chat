"use strict";
// template for firebase

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = "chatMessages"; // name of folder you create in db
let input;
let sendoBtn;
let chatsLoaded = false;

function setup() {

  noCanvas();

  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below

input = select('#input');
sendoBtn = select('#sendoBtn');

sendoBtn.mousePressed(sendMessage);

  let config = {
    apiKey: "AIzaSyCFSkbV59ma2cLVrGRUlS_F6oYdbzVV3a0",
    authDomain: "chatroom-d20e1.firebaseapp.com",
    databaseURL: "https://chatroom-d20e1.firebaseio.com",
    projectId: "chatroom-d20e1",
    storageBucket: "chatroom-d20e1.appspot.com",
    messagingSenderId: "647505285395",
    appId: "1:647505285395:web:70bb7420012bcd56d00ae6",
    measurementId: "G-73K16JMTRL"
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this references the folder you want your data to appear in
  let ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', gotData, errData);


  // ---> To find your config object:
  // They will provide it during Firebase setup
  // or (if your project already created)
  // 1. Go to main console page
  // 2. Click on project
  // 3. On project home page click on name of app under project name (in large font)
  // 4. Click the gear icon --> it's in there!
}

function draw() {

}

function sendMessage() {

  let timestamp = Date.now();
  let chatObject = {
    message: input.value(),
    timestamp: timestamp,
  }

  createNode(folderName, timestamp, chatObject)
  input.value('');
}

function displayPastChats() {
  let length= fbDataArray.length;

  for (let i = 0; i < length; i++) {
    let p = createP(fbDataArray[i].message);
    p.position(i * 100, random(windowHeight));
    p.style('background-color', `hsl(${(i * 5) % 300}, 80%, 50%)`);
  //  let opacity = map(i / length, 0, 1, 0, .9);
  //  p.style('opacity', opacity);
  p.class('messages');
  p.parent('messagesDiv')
  }

}

function displayLastChat() {
  let index = fbDataArray.length - 1;
  let p = createP(fbDataArray[index].message);

  p.position(index * 100, random(windowHeight));
  p.style('background-color', `hsl(${(index * 5) % 300}, 80%, 50%)`);
//  let opacity = map(i / length, 0, 1, 0, .9);
//  p.style('opacity', opacity);
  p.class('messages');
}
