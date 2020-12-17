// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')
export const checkStoryBlock = (selector, name, index = 0) => {
  it(`checks that ${name} exists and has content`, () => {
    cy.get(selector)
      .eq(index)
      .should('be.visible')
      .and('exist')
      .and('not.be.empty');
  });
  it(`checks that ${name} has working title link`, () => {
    cy.checkTitleLink(selector);
  });
  it(`checks that ${name} has a working author link`, () => {
    cy.checkAuthorLink(selector);
  });
  it(`checks that ${name} has a read tag`, () => {
    cy.checkReadTag(selector);
  });
  it(`checks that ${name} has a working image`, () => {
    cy.checkImageLink(selector);
  });
};

export const checkItemCard = (selector, name, index = 0) => {};
