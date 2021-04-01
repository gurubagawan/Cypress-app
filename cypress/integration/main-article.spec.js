import * as helper from '../support/index';

context('Single Article page test', () => {
  before(() => {
    cy.intercept('POST', '/wp-admin/admin-ajax.php').as('initialLoad');
    cy.visitSite('/what-is-plant-based-diet/');
    cy.wait('@initialLoad');
  });
  it('checks that main story is present', () => {
    cy.get('.td-pb-span8').shouldHaveContent();
  });

  helper.checkArticleHeader();
  helper.checkArticleAuthor();

  describe('tests for item carousel', () => {
    it('checks that carousel exists', () => {
      cy.get('.vc-carousal-wrap').shouldHaveContent();
    });
    it('checks that slider has working product cards', () => {
      helper.checkItemCarousel('.vc-carousal-wrap', 3);
    });
    it('checks that slider next works', () => {
      cy.checkSliderNext('.vc-carousal-wrap', '.title', '.vc-carousal-wrap', 1);
    });
    it('checks that slider previous works', () => {
      cy.checkSliderPrev('.vc-carousal-wrap', '.title', '.vc-carousal-wrap', 1);
    });
  });

  describe('Related posts section tests', () => {
    it('checks that section exists ', () => {
      cy.get('#related_posts_section').shouldHaveContent();
    });
    it('checks the section has a title', () => {
      cy.get('.int_title').contains('New on theHUB');
    });
    it('checks the first related post exists', () => {
      cy.get('.td-related-span4').eq(0).shouldHaveContent();
    });
    it('checks that the first related post has a details block', () => {
      cy.get('.td-related-span4')
        .eq(0)
        .find('.item-details')
        .shouldHaveContent();
    });
    it('checks that the first related post has a title ', () => {
      cy.get('.td-related-span4').eq(0).find('.entry-title').checkLink();
    });
    it('checks that the first related post has a date posted', () => {
      cy.get('.td-related-span4')
        .eq(0)
        .find('.footer_date')
        .shouldHaveContent();
    });
  });
});
