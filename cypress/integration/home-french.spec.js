import * as helper from '../support/index';

context('Home Page French', () => {
  before(() => {
    cy.intercept('POST', '/wp-admin/admin-ajax.php').as('initialLoad');
    cy.visitFrenchSite();
    cy.wait('@initialLoad');
  });

  // Check we're on the french page before each test
  beforeEach(() => {
    cy.get('body').should('have.class', 'fr');
  });

  // https://on.cypress.io/interacting-with-elements

  describe('Nav bar tests', () => {
    let navChildren;
    it('checks that the logo is there ', () => {
      cy.get('.td-header-logo').should('not.be.empty');
    });
    it('checks the nav is visible', () => {
      cy.get('.menu-fr-menu-v1-5-container').should('be.visible');
      cy.get('#menu-fr-menu-v1-6')
        .children()
        .then(($div) => {
          navChildren = $div.length;
        });
    });
    it('checks that each nav item is a link', () => {
      for (let i = 0; i < 6; i++) {
        cy.get('#menu-fr-menu-v1-6').children().eq(i).checkLink();
      }
    });
  });

  describe('Footer tests', () => {
    it('checks that the footer exists', () => {
      cy.get('.td-sub-footer-container').shouldHaveContent();
    });
    it('checks that trademark is present', () => {
      cy.get('.td-sub-footer-copy').shouldHaveContent();
    });
    it("checks the footer links", () => {
      for (let i = 0; i < 4; i++) {
        cy.get("#menu-sub-footer-french").children().eq(i).checkLink();
      }
    });
    it('checks that the english link works', () => {
      cy.get('#menu-item-1148-en').click();
      cy.get('body').should('not.have.class', 'fr');
      cy.visitFrenchSite();
    });
  });

  describe('Featured item tests', () => {
    helper.checkStoryBlock('.primary_bl', 'Featured Hero Item', 'fr');
    it('checks that date tag is visible and has content', () => {
      cy.getAndFind('.primary_bl', '.date')
        .should('be.visible')
        .and('not.be.empty');
    });
  });

  describe('Hero side bar tests', () => {
    describe('Hero sidebar first item', () => {
      helper.checkStoryBlock(
        '.rightBlock > .bl_top',
        'hero side bar top item',
        'fr'
      );
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
            `side bar item ${i + 1}`,
            'fr'
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
    it(`checks the story carousel has working stories`, () => {
      helper.checkPostCarousel(
        '.recent_carousal_posts > #posts_slider',
        sliderLength
      );
    });
    it('checks that the story carousel moves back 1 space when hitting back', () => {
      cy.checkSliderPrev(
        '.recent_carousal_posts > #posts_slider',
        '.title_art',
        ' #posts_slider',
        1
      );
    });
    it('checks that the story carousel moves forward 1 space when hitting next', () => {
      cy.checkSliderNext(
        '.recent_carousal_posts > #posts_slider',
        '.title_art',
        ' #posts_slider',
        1
      );
    });
  });

  describe('Seasonal section tests', () => {
    helper.checkSectionHeader('seasonal', '.seasonal_posts');
    it('checks that 6 seasonal posts are visible', () => {
      cy.get('.seasonal_row').first().children().should('have.length', 6);
    });
    describe('checks that the 6 seasonal posts are working properly', () => {
      for (let i = 1; i < 7; i++) {
        helper.checkStoryBlock(
          `.home_v2 > :nth-child(4) >.seasonal_row > :nth-child(${i}) `,
          `Seasonal row 1 post ${i}`,
          'fr'
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
      cy.getAndFind('.seasonal_posts', '.moreLink').first().clickLink();
      cy.visitFrenchSite();
    });
  });

  describe('Editors Picks Section', () => {
    it('checks that editors section exists', () => {
      cy.get('.editor_picks').shouldHaveContent();
    });
    it('checks that editors picks subtitle is there', () => {
      cy.get('.editor_picks').contains(
        'Nos évaluations de produits vous facilitent les choses'
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
        cy.visitFrenchSite();
      });
      it('checks that author details block is present', () => {
        cy.getAndFind('.editors_block', '.aut_det').shouldHaveContent();
      });
      it('checks that editors profile has a has a linked article', () => {
        cy.checkTitleLink('.editors_block > .aut_det');
        cy.visitFrenchSite();
      });
      it('checks that editors profile is linked in block', () => {
        cy.checkAuthorLink('.editors_block > .aut_det');
        cy.visitFrenchSite();
      });
      it('checks See All Picks link', () => {
        cy.getAndFind('.editors_block', '.aut_det')
          .find('.read_more')
          .checkLink();
        cy.getAndFind('.editors_block', '.aut_det')
          .find('.read_more')
          .clickLink();
        cy.visitFrenchSite();
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

      // Is price always there?
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
          cy.visitFrenchSite();
        });
        it(`checks that card ${i} has a working author link`, () => {
          cy.checkAuthorLink(`.edPicks_bl > .bl-${i}`);
          cy.visitFrenchSite();
        });
      }
    });
  });

  describe('Video block tests', () => {
    it('checks that video block exists', () => {
      cy.get('.video_block').shouldHaveContent();
      cy.getAndFind('.video_block', 'iframe').should('be.visible');
      cy.getAndFind('.video_block', '.meta_art').shouldHaveContent();
    });
    it('checks the video block read tag', () => {
      cy.getAndFind('.video_block', '.readtime').shouldHaveContent();
      cy.getAndFind('.video_block', '.readtime').contains('VIDÉO DE');
    });
    it('checks the video card sub-title', () => {
      cy.getAndFind('.video_block', '.dek_art').shouldHaveContent();
    });
    it('checks video card title', () => {
      cy.checkTitleLink('.video_block');
      cy.visitFrenchSite();
    });
  });

  describe('tests for recipes section ', () => {
    helper.checkSectionHeader('Recipe', '.recipes_bl');
    for (let i = 1; i < 4; i++) {
      helper.checkRecipeBlock(
        `.recipes_bl > .row > :nth-child(${i})`,
        `Recipe story ${i}`,
        'fr',
        'recipe'
      );
    }
    // This one
    it('checks the more recipes link', () => {
      cy.getAndFind('.recipes_bl', '.moreLink').shouldHaveContent();
      cy.getAndFind('.recipes_bl', '.moreLink').checkLink();
      cy.getAndFind('.recipes_bl', '.moreLink').clickLink();
      cy.visitFrenchSite();
    });
  });
  describe('tests for kid meals section ', () => {
    helper.checkSectionHeader('Kid Meals', '.bottom');
    for (let i = 1; i < 4; i++) {
      helper.checkRecipeBlock(
        `.bottom> .row > :nth-child(${i})`,
        `Kid meals story ${i}`,
        'fr'
      );
    }
    it('checks the more kid recipes link', () => {
      cy.getAndFind('.bottom', '.moreLink').shouldHaveContent();
      cy.getAndFind('.bottom', '.moreLink').checkLink();
      cy.getAndFind('.bottom', '.moreLink').clickLink();
      cy.visitFrenchSite();
    });
  });

  describe('tests for discover more block', () => {
    let catAmount = 3;
    it('checks that Discover More title is present', () => {
      cy.get('.cat_details').then(($div) => {
        catAmount = $div.length;
        console.log($div[0]);
      });
      cy.get('.section_head').shouldHaveContent();
    });

    it(`category links`, () => {
      cy.get('.cat_details').then(($div) => {
        // catAmount = $div.length;
        for (let i = 0; i < $div.length; i++) {
          cy.get('.cat_details').eq(i).shouldHaveContent().checkLink();
        }
      });
    });
  });
});
