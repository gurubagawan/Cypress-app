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
  describe('Article Header tests', () => {
    it('checks that header block is present', () => {
      cy.get('.td-post-header').shouldHaveContent();
    });
    it('checks that breadcrumb trail exists', () => {
      cy.get('.entry-crumbs').shouldHaveContent();
    });
    it('checks that article has a header', () => {
      cy.get('.td-post-title > .entry-title').shouldHaveContent();
    });
    it('checks that article has a sub heading', () => {
      cy.get('.sub_title_main').shouldHaveContent();
    });
    it('checks that the social share icons are present', () => {
      cy.get('.social_elements').shouldHaveContent();
    });
    it('checks that author link is present', () => {
      cy.getAndFind('.td-post-author-name', 'a').shouldHaveContent();
      cy.getAndFind('.td-post-author-name', 'strong').checkLink();
    });
    it('checks that publication date is tehre', () => {
      cy.get('.entry-date').shouldHaveContent();
    });
  });
  describe('Editors block tests', () => {
    it('checks that editors block exists ', () => {
      cy.get('.td-pb-span4').shouldHaveContent();
    });
    it('checks that block title is there', () => {
      cy.get('.author-area > :nth-child(1)').shouldHaveContent();
    });
    it('checks that avatar image exists', () => {
      cy.get('.avatar').should('be.visible');
    });
    it('checks that author link exists', () => {
      cy.get('.author-name').checkLink();
    });
    it('checks that author role exists', () => {
      cy.get('.author-role').shouldHaveContent();
    });
    it('checks that author social links exist', () => {
      cy.get('.author-area > .author-social-links').shouldHaveContent();
    });
    it('checks that author bio exists', () => {
      cy.get('.author-area > p').shouldHaveContent();
    });
  });
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

  describe.only('Related posts section tests', () => {
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
