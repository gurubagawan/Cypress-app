import * as helper from '../support/index';

context('Tests for gallery slideshow', () => {
  before(() => {
    cy.intercept('POST', '/wp-admin/admin-ajax.php').as('initialLoad');
    cy.visitSite('/best-toys-kids/?slide=1');
  });

  describe('Inital load tests', () => {
    it('checks that slideshow exists', () => {
      cy.get('.SlideshowInit ').shouldHaveContent();
    });
    it('checks that view all slides button exists', () => {
      cy.get('.changeSlideshowType').shouldHaveContent();
    });
    it('checks that slide counter exists and shows the right number', () => {
      cy.get('.slick-counter').contains('1');
    });
    it('checks that the first slide has a dialogue box', () => {
      cy.get('h2.vc-informationbox-title').shouldHaveContent();
    });
    it('checks that the first slide has a product title', () => {
      cy.get('h3.vc-informationbox-title').shouldHaveContent();
    });
    it('checks that product has a review box', () => {
      cy.get('.starRating').shouldHaveContent();
    });
    it('checks that product has a price', () => {
      cy.get('a.price').shouldHaveContent();
    });
    it('checks that product has a shop now button', () => {
      cy.get('.btnshop_now').shouldHaveContent();
    });
    it('checks that product has a description', () => {
      cy.get('.text-container').shouldHaveContent();
    });
    it('checks that product description is shortened', () => {
      cy.get('span.terminating_overlay').should('be.visible');
    });
    it('checks that view more button is visible', () => {
      cy.get('.readmoreLess').contains('View More');
    });
  });
});
