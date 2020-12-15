import * as helper from '../support/index';

context('Home Page', () => {
  beforeEach(() => {
    cy.server();
    cy.route('POST', '/wp-admin/admin-ajax.php').as('initialLoad');
    cy.visit('', {
      auth: {
        username: 'kcfinalpreprod',
        password: 'Wal123Content',
      },
    });
    cy.wait('@initialLoad');
  });

  // https://on.cypress.io/interacting-with-elements

  describe('Nav bar tests', () => {
    it('checks that the logo is there ', () => {
      cy.get('.td-header-logo').should('not.be.empty');
    });
    it('checks the nav is visible', () => {
      cy.get('.menu-en-menu-v1-5-container').should('be.visible');
    });
  });

  describe('Featured item tests', () => {
    helper.checkStoryBlock('.primary_bl', 'Featured Hero Item');
    it('checks that date tag is visible and has content', () => {
      cy.getAndFind('.primary_bl', '.date')
        .should('be.visible')
        .and('not.be.empty');
    });
  });

  describe('Hero side bar tests', () => {
    describe('Hero sidebar first item', () => {
      helper.checkStoryBlock('.rightBlock > .bl_top', 'hero side bar top item');
    });
    describe('Hero sidebar bottom items', () => {
      it('checks that bottom bar exists', () => {
        cy.get('.rightBlock > .block_bottom').should('exist');
      });
      it('checks that bottom bar has 2 children', () => {
        cy.get('.rightBlock > .block_bottom')
          .children()
          .should('have.length', 2);
      });
      describe('checks that the two child elements have the required properties', () => {
        for (let i = 1; i < 3; i++) {
          helper.checkStoryBlock(
            `.rightBlock > .block_bottom >  :nth-child(${i})`,
            `side bar item ${i + 1}`
          );
        }
      });
    });
  });

  describe('Seasonal section tests', () => {
    it('checks that seasonal section header has content', () => {
      cy.getAndFind('.seasonal_posts', '.section_title')
        .first()
        .shouldHaveContent();
    });
    it('checks that seasonal section sub header has content', () => {
      cy.getAndFind('.seasonal_posts', '.section_dek')
        .first()
        .shouldHaveContent();
    });
    it('checks that 6 seasonal posts are visible', () => {
      cy.get('.seasonal_row').first().children().should('have.length', 6);
    });
    describe.only('checks that the 6 seasonal posts are working properly', () => {
      for (let i = 1; i < 7; i++) {
        helper.checkStoryBlock(
          `.home_v2 > :nth-child(4) >.seasonal_row > :nth-child(${i}) `,
          `Seasonal row 1 post ${i}`
        );
      }
      it('checks that there are 6 children', () => {
        cy.get('.seasonal_row').first().children().should('have.length', 6);
      });
    });

    it('checks that seasonal section more link is present', () => {
      cy.getAndFind('.seasonal_posts', '.moreLink').first().shouldHaveContent();
    });
    it('checks that seasonal section more link is working', () => {
      cy.getAndFind('.seasonal_posts', '.moreLink').first().checkLink();
      cy.getAndFind('.seasonal_posts', '.moreLink')
        .first()
        .clickLink('/category');
    });
  });
});
