import * as helper from '../../support/index';

context('Single Article page mobile test', () => {
  before(() => {
    cy.intercept('POST', '/wp-admin/admin-ajax.php').as('initialLoad');
    cy.visitSite('/what-is-plant-based-diet/');
    cy.wait('@initialLoad');
  });
  beforeEach(() => {
    cy.viewport('iphone-5');
  });
  it('checks that main story is present', () => {
    cy.get('.td-pb-span8').shouldHaveContent();
  });
  it('checks that editors block exists ', () => {
    cy.get('.td-pb-span4').shouldHaveContent();
  });
  it('checks that carousel exists', () => {
    cy.get('.vc-carousal-wrap').shouldHaveContent();
  });
  it('checks that section exists ', () => {
    cy.get('#related_posts_section').shouldHaveContent();
  });
});
