import * as helper from '../../support/index';

context('Home Page', () => {
  before(() => {
    cy.viewport("iphone-5");
    cy.intercept("POST", "/wp-admin/admin-ajax.php").as("initialLoad");
    cy.visitSite();
    // cy.wait('@initialLoad');
  });

  beforeEach(() => {
    cy.viewport('iphone-5');
  });

  describe('Main Element tests', () => {
    afterEach(function () {
      if (this.currentTest.state === 'failed') {
        Cypress.runner.stop();
      }
    });
    it('checks that the nav bar exists ', () => {
      cy.get('.td-header-wrap').shouldHaveContent();
    });
    it('checks that the footer exists', () => {
      cy.get('.td-sub-footer-container').shouldHaveContent();
    });
    it('checks that carousel block is there', () => {
      cy.get('.recent_carousal_posts > #posts_slider').shouldHaveContent();
    });
    it('checks that seasonal section is there', () => {
      cy.get('.home_v2 > :nth-child(4)').shouldHaveContent();
    });
    it('checks that editors picks section exists', () => {
      cy.get('.editor_picks').shouldHaveContent();
    });
    it('checks that the recipes block exists ', () => {
      cy.get('.recipes_bl').shouldHaveContent();
    });
    it('checks that bottom block exists', () => {
      cy.get('.bottom').shouldHaveContent();
    });
    it('checks that category links exist', () => {
      cy.get('.cat_bl').shouldHaveContent();
    });
  });

  describe.only('Mobile Nav tests', () => {
    it('checks that the mobile nav exists', () => {
      cy.get('.td-icon-font').should('be.visible');
    });
    it('checks that mobile nav opens up', () => {
      cy.get('.td-icon-font').click();
      cy.get('#td-mobile-nav').shouldHaveContent();
    });
    it('checks that mobile nav closes', () => {
      cy.visitSite('/');
      cy.get('.td-icon-font').click({ force: true });
      cy.get(
        '.td-menu-socials-wrap > .td-mobile-close > a > .td-icon-close-mobile'
      ).click();
      cy.get('#td-mobile-nav').should('not.be.visible');
    });
  });
});
