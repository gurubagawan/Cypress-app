import * as helper from '../support/index';

context('Gift guide page', () => {
  before(() => {
    cy.intercept('POST', '/wp-admin/admin-ajax.php').as('initialLoad');
    cy.visitSite('/gift-guides');
  });

  describe('Category header tests', () => {
    it('checks that the banner exists', () => {
      cy.get('.banner').should('exist');
    });
    it('checks that category title exists', () => {
      cy.get('.title_gl').shouldHaveContent();
    });
    it('checks that category subtitle exists', () => {
      cy.get('.subtitle_gl').shouldHaveContent();
    });
  });
  describe('Top story block tests', () => {
    it('checks that top section of gift ideas exists', () => {
      cy.get('.top_gift_ideas').shouldHaveContent();
    });
    for (let i = 1; i < 4; i++) {
      it(`checks that featured item ${i} has a working story block`, () => {
        cy.get(`.top_gift_ideas > .row > :nth-child(${i})`).shouldHaveContent();
        cy.checkReadTag(`.top_gift_ideas > .row > :nth-child(${i})`, 'en');
        cy.checkTitleLink(`.top_gift_ideas > .row > :nth-child(${i})`);
        cy.visitSite('/gift-guides');
      });
    }
  });
  describe('tests for gifts for everyone section', () => {
    it('checks that section exists', () => {
      cy.get('.gifts_for_all').shouldHaveContent();
    });
    it('checks that section has a title', () => {
      cy.get('.gifts_for_all > .section_title').shouldHaveContent();
    });
    it('checks that section has a subtitle', () => {
      cy.get('.gifts_for_all > .section_title').shouldHaveContent();
    });
    it('checks the first story in the section for a title, image and read tag', () => {
      cy.get('.inner_mask >  :nth-child(1)').shouldHaveContent();
      cy.checkReadTag('.inner_mask >  :nth-child(1)', 'en');
      cy.checkTitleLink('.inner_mask >  :nth-child(1)');
      cy.visitSite('/gift-guides');
    });
  });
  describe('Tests for creators picks section', () => {
    it('checks that section exists', () => {
      cy.get('.infl_picks').shouldHaveContent();
    });
    it('checks that section has a byline ', () => {
      cy.get('.bg_blok > .section_dek').shouldHaveContent();
    });
    describe('Editors profile tests', () => {
      it('checks that profile exists and has a the right content', () => {
        cy.get('.infl_car_block > .block').shouldHaveContent();
        cy.get('.infl_car_block > .block').checkImage();
        cy.get('.block > .meta_inf > .by').checkLink();
        cy.get('.read_more').checkLink();
        cy.get('.block > .meta_inf > .inf_rel').checkLink();
      });
      it('checks that Editors picks carousel is present and has a title', () => {
        cy.get('.col-9').shouldHaveContent();
        cy.get('.infl_heading').shouldHaveContent();
      });
      it('checks that the Editors picks carousel previous and next buttons work', () => {
        cy.checkSliderNext('.col-9', '.prod_name', '.col-9', 1);
        cy.checkSliderPrev('.col-9', '.prod_name', '.col-9', 1);
      });
    });
    describe('tests for bottom row of editors', () => {
      it('checks that row exists ', () => {
        cy.get('.bg_blok > .block_bottom').shouldHaveContent();
      });
      it('checks that the first profile exists and has content', () => {
        cy.get('.bg_blok > .block_bottom > :nth-child(1)').shouldHaveContent();
        cy.get('.bg_blok > .block_bottom > :nth-child(1)').checkImage();
        cy.get(
          ':nth-child(1) > .inner-border > .meta_inf > .inf_rel'
        ).checkLink();
        cy.get(
          ':nth-child(1) > .inner-border > .meta_inf > .by'
        ).shouldHaveContent();
      });
    });
  });
  describe.only('Tests for Walmart.ca Container', () => {
    it('checks that container exists', () => {
      cy.get('.walmartcontainer').shouldHaveContent();
    });
    it('checks that container has a title', () => {
      cy.get('.waltxt').shouldHaveContent();
    });
    for (let i = 1; i < 8; i++) {
      it(`checks that walmart link ${i} is working`, () => {
        cy.get(`.links > :nth-child(${i})`).checkLink();
      });
    }
  });
});
