context('Single Article page mobile test', () => {
  before(() => {
    cy.intercept('POST', '/wp-admin/admin-ajax.php').as('initialLoad');
    cy.visitSite('/recipes');
    // cy.wait('@initialLoad');
  });
  beforeEach(() => {
    cy.viewport('iphone-5');
  });
  it('checks that header exists', () => {
    cy.get('.tdb-title-text').contains('Recipes');
  });
  it('checks that first recipe block exists', () => {
    cy.get('.td_module_1').first().shouldHaveContent();
  });
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
