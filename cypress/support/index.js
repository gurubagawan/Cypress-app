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
export const checkStoryBlock = (selector, name) => {
  it(`checks that ${name} exists and has content`, () => {
    cy.get(selector).should('be.visible').and('exist').and('not.be.empty');
  });
  it(`checks that ${name} has a read tag`, () => {
    cy.checkReadTag(selector);
  });
  it(`checks that ${name} has working title link`, () => {
    cy.checkTitleLink(selector);
  });
  it(`checks that ${name} has a working author link`, () => {
    cy.checkAuthorLink(selector);
  });
  it(`checks that ${name} has a working image`, () => {
    cy.checkImageLink(selector);
  });
};

export const checkItemCarousel = (selector, rounds) => {
  for (let i = 0; i < rounds; i++) {
    cy.getAndFind(selector, '[aria-hidden=false]').eq(i).checkItemTitle();
    cy.getAndFind(selector, '[aria-hidden=false]').eq(i).checkItemPrice();
    cy.getAndFind(selector, '[aria-hidden=false]').eq(i).checkWalLink();
  }
};

export const getCarouselLength = (selector) => {
  cy.getAndFind(selector, '[aria-hidden=false]').then(($div) => {
    console.log($div.length);
    return $div.length;
  });
};

export const checkPostCarousel = (selector, rounds) => {
  for (let i = 0; i < rounds; i++) {
    cy.getAndFind(selector, '[aria-hidden=false]').eq(i).checkTitleLink();
  }
};

export const checkSectionHeader = (
  sectionTitle,
  selector,
  titleContent,
  subContent
) => {
  it(`checks that ${sectionTitle} section title has content`, () => {
    cy.checkSectionTitle(selector, titleContent);
  });
  it(`checks that ${sectionTitle} section sub header has content`, () => {
    cy.checkSectionSub(selector, subContent);
  });
};

export const checkRecipeBlock = (selector, name, type = 'read') => {
  it(`checks that ${name} exists and has content`, () => {
    cy.get(selector).should('be.visible').and('exist').and('not.be.empty');
  });
  it(`checks that ${name} has a read tag`, () => {
    cy.checkReadTag(selector, type);
  });
  it(`checks that ${name} has working title link`, () => {
    cy.checkTitleLink(selector);
  });
  it(`checks that ${name} has a working image`, () => {
    cy.checkImageLink(selector);
  });
};
