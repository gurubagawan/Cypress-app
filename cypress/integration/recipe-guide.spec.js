import * as helper from '../support/index';

context('Recipes page', () => {
  before(() => {
    cy.visitSite('/recipes');
  });
  describe('Header section', () => {
    it('checks that header exists', () => {
      cy.get('.tdb-title-text').contains('Recipes');
    });
  });
  describe('First Recipe Block tests', () => {
    it('checks that block exists', () => {
      cy.get('.td_module_1').first().shouldHaveContent();
    });
    it('checks that block has an image', () => {
      cy.get('.td_module_1').first().checkImage();
    });
    it('checks that block has a title', () => {
      cy.getAndFind('.td_module_1', '.entry-title').shouldHaveContent();
    });
    it('checks that read more link is', () => {
      cy.get('.td-read-more-recipe_rm').checkLink();
    });
  });
  describe('tests for page navigation', () => {
    it('checks that next page button works', () => {
      cy.getAndFind('.page-nav', '.td-icon-menu-right').click();
      cy.url().should('include', '/page/2');
    });
    it('checks that prev page button works', () => {
      cy.getAndFind('.page-nav', '.td-icon-menu-left').click();
      cy.url().should('not.include', '/page/2');
    });
    it('checks that a specific page can be navigated to', () => {
      cy.get('[title="2"]').click();
      cy.url().should('include', '/page/2');
    });
  });
});
