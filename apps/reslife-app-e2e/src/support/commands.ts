// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// eslint-disable-next-line
//@ts-ignore
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: "AIzaSyBDnop9prdY-550K5vaBCQ5IqnMOS8quUQ",
  authDomain: "reslife-staging.firebaseapp.com",
  projectId: "reslife-staging",
  storageBucket: "reslife-staging.appspot.com",
  messagingSenderId: "600090189906",
  appId: "1:600090189906:web:0beb87dd4bc6faf714bf8b"
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });


// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  console.log('Custom command example: Login', email, password);
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
