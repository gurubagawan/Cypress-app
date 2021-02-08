import * as helper from '../../support/index';

context('Home Page', () => {
  before(() => {
    cy.viewport('iphone-5');
    cy.intercept('POST', '/wp-admin/admin-ajax.php').as('initialLoad');
    cy.visitSite('/gift-guides');
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
    it('checks that banner is there', () => {
      cy.get('.banner_bl').shouldHaveContent();
    });
    it('checks that featured gifts is there', () => {
      cy.get('.top_gift_ideas').shouldHaveContent();
    });
    it('checks that gifts for everyone section is there', () => {
      cy.get('.gifts_for_all').shouldHaveContent();
    });
    it('checks that creators pick section exists', () => {
      cy.get('.infl_picks').shouldHaveContent();
    });
    it('checks that seasonal posts section exists', () => {
      cy.get('.seasonal_posts').shouldHaveContent();
    });
  });
});
