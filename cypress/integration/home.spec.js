import * as helper from '../support/index';

context('Home Page', () => {
  before(() => {
    cy.intercept('POST', '/wp-admin/admin-ajax.php').as('initialLoad');
    cy.visitSite();
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

  describe.only('Featured item tests', () => {
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

  describe('Tests for the latest stories carousel', () => {
    let sliderLength = 0;
    it('checks that block is there', () => {
      cy.getAndFind(
        '.recent_carousal_posts > #posts_slider',
        '[aria-hidden=false]'
      ).then(($div) => {
        sliderLength = $div.length;
      });
      cy.get('.recent_carousal_posts > #posts_slider').shouldHaveContent();
    });
    it('checks that latest stories section header has content', () => {
      cy.getAndFind('.recent_carousal_posts', '.section_title')
        .first()
        .shouldHaveContent();
    });
    it('checks that latest stories section sub header has content', () => {
      cy.getAndFind('.recent_carousal_posts', '.section_dek')
        .first()
        .shouldHaveContent();
    });
    it(`checks the story carousel`, () => {
      helper.checkPostCarousel(
        '.recent_carousal_posts > #posts_slider',
        sliderLength
      );
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
    describe('checks that the 6 seasonal posts are working properly', () => {
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

  describe('Editors Picks Section', () => {
    it('checks that editors section exists', () => {
      cy.get('.editor_picks').shouldHaveContent();
    });
    it('checks that editors picks subtitle is there', () => {
      cy.get('.editor_picks').contains(
        'Cut the guesswork with our honest product reviews'
      );
    });
    it('checks that editors picks row exists', () => {
      cy.get('.editors_picks_row').shouldHaveContent();
    });
    describe('Editors profile block', () => {
      it('checks that editors profile block is present', () => {
        cy.get('.editors_block').shouldHaveContent();
      });
      it('checks that editors profile block has a profile image that links to author profile', () => {
        cy.get('.editors_block').checkImage();
        cy.getAndFind('.editors_block', '.aut_im').checkLink();
        cy.getAndFind('.editors_block', '.aut_im').clickLink();
      });
      it('checks that author details block is present', () => {
        cy.getAndFind('.editors_block', '.aut_det').shouldHaveContent();
      });
      it('checks that editors profile has a has a linked article', () => {
        cy.checkTitleLink('.editors_block > .aut_det');
      });
      it('checks that editors profile is linked in block', () => {
        cy.checkAuthorLink('.editors_block > .aut_det');
        cy.visit('');
      });
      it('checks See All Picks link', () => {
        cy.getAndFind('.editors_block', '.aut_det')
          .find('.read_more')
          .checkLink();
        cy.getAndFind('.editors_block', '.aut_det')
          .find('.read_more')
          .clickLink();
      });
      // still need to figure this out
      it.skip('checks when the slider', () => {
        cy.get();
      });
    });

    describe('Tests for the editor carousel', () => {
      let visibleLength = 0;
      it('checks that the slider has been initalized', () => {
        cy.getAndFind(
          '.editors_picks_row > .block',
          '[aria-hidden=false]'
        ).then(($div) => {
          visibleLength = $div.length;
        });
        cy.get('#homev2_featuredcar').shouldHaveContent();
      });
      it('checks that the slider has working product cards', () => {
        helper.checkItemCarousel('.editors_picks_row > .block', visibleLength);
      });
      it('checks that slider changes with forward button at a rate of 1 item per click', () => {
        cy.checkSliderNext(
          '.editors_picks_row > .block',
          '.c_title',
          '#homev2_featuredcar',
          1
        );
        helper.checkItemCarousel('.editors_picks_row > .block', visibleLength);
      });
      it('checks that slider changes with back button at a rate of 1 item per click', () => {
        cy.checkSliderPrev(
          '.editors_picks_row > .block',
          '.c_title',
          '#homev2_featuredcar',
          1
        );
        helper.checkItemCarousel('.editors_picks_row > .block', visibleLength);
      });
    });

    describe('Tests for second row of editors', () => {
      it('checks that row exists ', () => {
        cy.get('.edPicks_bl').shouldHaveContent();
      });
      for (let i = 1; i < 5; i++) {
        it(`checks that card ${i} exists`, () => {
          cy.getAndFind('.edPicks_bl', `.bl-${i}`).shouldHaveContent();
        });
        it(`checks that card ${i} has a background image`, () => {
          cy.get(`.edPicks_bl > .bl-${i}`).checkImage();
        });
        it(`checks that card ${i} has a working title link`, () => {
          cy.checkTitleLink(`.edPicks_bl > .bl-${i}`);
          // cy.visitSite();
        });
        it(`checks that card ${i} has a working author link`, () => {
          cy.checkAuthorLink(`.edPicks_bl > .bl-${i}`);
          // cy.visitSite();
        });
      }
    });
  });
});
