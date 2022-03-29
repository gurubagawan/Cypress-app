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

// overwrite existing contains function to be case insensitive
Cypress.Commands.overwrite(
  'contains',
  (originalFn, subject, filter, text, options = {}) => {
    // determine if a filter argument was passed
    if (typeof text === 'object') {
      options = text;
      text = filter;
      filter = undefined;
    }

    options.matchCase = false;

    return originalFn(subject, filter, text, options);
  }
);

Cypress.Commands.add('visitSite', (url = '/') => {
  cy.visit(url, {
    auth: {
      username: Cypress.env('SITE_USER'),
      password: Cypress.env('SITE_PASS'),
    },
  });
});

Cypress.Commands.add('visitFrenchSite', () => {
  cy.visit('/fr', {
    auth: {
      username: Cypress.env('SITE_USER'),
      password: Cypress.env('SITE_PASS'),
    },
  });
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
        // cy.intercept(finalURL).as('pageLoad');
        // cy.wait('@pageLoad');
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
Cypress.Commands.add(
  'checkTitleLink',
  { prevSubject: 'optional' },
  (subject, selector) => {
    if (subject) {
      cy.getAndFind(subject, '.title_art')
        .should('be.visible')
        .and('not.be.empty');
      cy.getAndFind(subject, '.title_art').checkLink();
      cy.getAndFind(subject, '.title_art').clickLink();
    } else {
      cy.getAndFind(selector, '.title_art')
        .should('be.visible')
        .and('not.be.empty');
      cy.getAndFind(selector, '.title_art').checkLink();
      cy.getAndFind(selector, '.title_art').clickLink();
    }
  }
);

//Find the Author class within an element, check that its visible, not empty, and that the link works
Cypress.Commands.add('checkAuthorLink', (selector) => {
  cy.getAndFind(selector, '.author_art').shouldHaveContent();
  cy.getAndFind(selector, '.author_art').checkLink();
  cy.getAndFind(selector, '.author_art').clickLink();
});

//Find the Readtime calss within an element check that it's visible and contains the word read
Cypress.Commands.add('checkReadTag', (selector, lang = 'en', type = 'read') => {
  let content;
  if (lang == 'fr') {
    if (type == 'recipe') {
      content = 'recette';
    } else {
      content = 'de lecture';
    }
  } else {
    if (type == 'recipe') {
      content = 'recipe';
    } else {
      content = 'read';
    }
  }
  cy.getAndFind(selector, '.readtime').contains(content).and('be.visible');
});

// Cypress.Commands.add('checkReadTagFr', (selector, type = 'read') => {
//   if (type == 'recipe') {
//     cy.getAndFind(selector, '.readtime').contains('recette').and('be.visible');
//   } else {
//     cy.getAndFind(selector, '.readtime')
//       .contains('de lecture')
//       .and('be.visible');
//   }
// });

Cypress.Commands.add('checkImage', { prevSubject: true }, (selector) => {
  cy.getAndFind(selector, 'img').should('be.visible');
});

Cypress.Commands.add('checkImageLink', (selector) => {
  cy.get(selector).checkImage();
  cy.getAndFind(selector, '.img_wrapper').checkLink();
  cy.getAndFind(selector, '.img_wrapper').clickLink();
});

Cypress.Commands.add('checkItemPrice', { prevSubject: true }, (selector) => {
  cy.get(selector).find('.price').shouldHaveContent().checkLink();
});

Cypress.Commands.add('checkItemTitle', { prevSubject: true }, (selector) => {
  cy.get(selector).find('.c_title').shouldHaveContent().checkLink();
});

Cypress.Commands.add('checkWalLink', { prevSubject: true }, (selector) => {
  cy.get(selector).find('.wal_prod_link').shouldHaveContent().checkLink();
});

//Checks that the slider link goes back or forward by a given amount
Cypress.Commands.add(
  'checkSliderNext',
  (carouselSelector, titleClass, sliderSelect, skipAmount) => {
    cy.getAndFind(carouselSelector, '[aria-hidden=false]')
      .eq(skipAmount)
      .find(titleClass)
      .then(($div) => {
        const initialTitle = $div.text();
        cy.getAndFind(sliderSelect, '.slick-next').first().click();
        cy.getAndFind(carouselSelector, '[aria-hidden=false]')
          .eq(skipAmount)
          .find(titleClass)
          .should('not.contain', initialTitle)
          .shouldHaveContent();
        cy.getAndFind(carouselSelector, '[aria-hidden=false]')
          .first()
          .find(titleClass)
          .should('contain', initialTitle);
      });
  }
);

Cypress.Commands.add(
  'checkSliderPrev',
  (carouselSelector, titleClass, sliderSelect, skipAmount) => {
    cy.getAndFind(carouselSelector, '[aria-hidden=false]')
      .first()
      .find(titleClass)
      .then(($div) => {
        const initialTitle = $div.text();
        cy.getAndFind(sliderSelect, '.slick-prev').first().click();
        cy.getAndFind(carouselSelector, '[aria-hidden=false]')
          .first()
          .find(titleClass)
          .should('not.contain', initialTitle)
          .shouldHaveContent();
        cy.getAndFind(carouselSelector, '[aria-hidden=false]')
          .eq(skipAmount)
          .find(titleClass)
          .should('contain', initialTitle);
      });
  }
);

Cypress.Commands.add('checkSectionTitle', (selector, content) => {
  cy.getAndFind(selector, '.section_title').shouldHaveContent();
  if (content) {
    cy.getAndFind(selector, '.section_title').contains(content);
  }
});

Cypress.Commands.add('checkSectionSub', (selector, content) => {
  cy.getAndFind(selector, '.section_dek').shouldHaveContent();
  if (content) {
    cy.getAndFind(selector, '.section_dek').contains(content);
  }
});
