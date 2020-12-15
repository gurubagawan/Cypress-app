// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
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

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.Commands.add(
  'shouldHaveContent',
  { prevSubject: true },
  (selector, method) => {
    cy.get(selector).should('be.visible').and('not.be.empty');
  }
);

Cypress.Commands.add(
  'clickLink',
  { prevSubject: true },
  (selector, splicer, method) => {
    cy.get(selector)
      .find('a')
      .click()
      .invoke('attr', 'href')
      .then((href) => {
        let finalURL = href;
        if (splicer) {
          finalURL = finalURL.replace(splicer, '');
        }
        cy.url().should('contain', finalURL);
      });
  }
);

Cypress.Commands.add('checkLink', { prevSubject: true }, (selector, method) => {
  cy.get(selector).find('a').and('have.attr', 'href');
});

Cypress.Commands.add('getAndFind', (primarySelector, secondarySelector) => {
  cy.get(primarySelector).find(secondarySelector);
});

//Find the title class within an element, check that its visible, not empty, and that the link works
Cypress.Commands.add('checkTitleLink', (selector) => {
  cy.getAndFind(selector, '.title_art')
    .should('be.visible')
    .and('not.be.empty');
  cy.getAndFind(selector, '.title_art').checkLink();
  cy.getAndFind(selector, '.title_art').clickLink();
});

//Find the Author class within an element, check that its visible, not empty, and that the link works
Cypress.Commands.add('checkAuthorLink', (selector) => {
  cy.getAndFind(selector, '.author_art').shouldHaveContent();
  cy.getAndFind(selector, '.author_art').checkLink();
  cy.getAndFind(selector, '.author_art').clickLink();
});

//Find the Readtime calss within an element check that it's visible and contains the word read
Cypress.Commands.add('checkReadTag', (selector) => {
  cy.getAndFind(selector, '.readtime').contains('read').and('be.visible');
});

Cypress.Commands.add('checkImage', (selector) => {
  cy.getAndFind(selector, 'img').should('be.visible');
});

Cypress.Commands.add('checkImageLink', (selector) => {
  cy.checkImage(selector);
  cy.getAndFind(selector, '.img_wrapper').checkLink();
  cy.getAndFind(selector, '.img_wrapper').clickLink();
});
