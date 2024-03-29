import * as helper from '../support/index';

context('Home Page', () => {
  before(() => {
    cy.intercept("POST", "/wp-admin/admin-ajax.php").as("initialLoad");
    cy.visitSite();
    // cy.wait('@initialLoad');
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
    it('checks that carousel block is there', () => {
      cy.get('.recent_carousal_posts > #posts_slider').shouldHaveContent();
    });
    it('checks that seasonal section is there', () => {
      cy.get('.home_v2 > :nth-child(4)').shouldHaveContent();
    });
    it('checks that editors picks section exists', () => {
      cy.get('.editor_picks').shouldHaveContent();
    });
    it('checks that the recipes block exists ', () => {
      cy.get('.recipes_bl').shouldHaveContent();
    });
    it('checks that bottom block exists', () => {
      cy.get('.bottom').shouldHaveContent();
    });
    it('checks that category links exist', () => {
      cy.get('.cat_bl').shouldHaveContent();
    });
  });

  // https://on.cypress.io/interacting-with-elements

  describe('Nav bar tests', () => {
    let navChildren;
    let elementsWithChildren = [];
    it('checks that the logo is there ', () => {
      cy.get('.td-header-logo').should('not.be.empty');
    });
    it('checks the nav is visible', () => {
      cy.get('.menu-en-menu-v1-5-container').should('be.visible');
      cy.get('#menu-en-menu-v1-6')
        .children()
        .then(($div) => {
          navChildren = $div.length;
        });
    });
    it('checks that each nav item is a link', () => {
      for (let i = 0; i < 6; i++) {
        cy.get('#menu-en-menu-v1-6')
          .children()
          .eq(i)
          .then(($div) => {
            if ($div[0].children.length > 1) {
              elementsWithChildren.push(i);
              cy.get('#menu-en-menu-v1-6')
                .children()
                .eq(i)
                .trigger('mouseover');
              cy.get('.sub-menu').shouldHaveContent();
              cy.reload();
            }
          });
        cy.get('#menu-en-menu-v1-6').children().eq(i).checkLink();
      }
      cy.visitSite();
    });
  });

  describe('Footer tests', () => {
    it('checks that trademark is present', () => {
      cy.get('.td-sub-footer-copy').shouldHaveContent();
    });
    it('checks the footer links', () => {
      for (let i = 0; i < 4; i++) {
        cy.get('#menu-sub-footer').children().eq(i).checkLink();
      }
    });
    it('checks that the french link works', () => {
      cy.get('#menu-item-887-fr > a')      // sets <a> as the subject
        .invoke('attr', 'href')            // changes subject to href attribute              // now test the href
        .and('contain', 'fr')
        
      cy.get('#menu-item-887-fr').click();
      cy.get('body').should('have.class', 'fr');
      cy.clearCookies()
      cy.visitSite('/');
    });
  });

  describe('Featured item tests', () => {
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
    it('checks that seasonal section more link is present', () => {
      cy.getAndFind('.seasonal_posts', '.moreLink').first().shouldHaveContent();
    });
    it('checks that seasonal section more link is working', () => {
      cy.getAndFind('.seasonal_posts', '.moreLink').first().checkLink();
      cy.getAndFind('.seasonal_posts', '.moreLink')
        .first()
        .clickLink('/category');
      cy.visitSite();
    });
    describe('checks that the 6 seasonal posts are working properly', () => {
      it('checks that there are 6 children', () => {
        cy.get('.seasonal_row').first().children().should('have.length', 6);
      });
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
        cy.visitSite();
      });
      it('checks that author details block is present', () => {
        cy.getAndFind('.editors_block', '.aut_det').shouldHaveContent();
      });
      it('checks that editors profile has a has a linked article', () => {
        cy.checkTitleLink('.editors_block > .aut_det');
        cy.visitSite();
      });
      it('checks that editors profile is linked in block', () => {
        cy.checkAuthorLink('.editors_block > .aut_det');
        cy.visitSite('');
      });
      it('checks See All Picks link', () => {
        cy.getAndFind('.editors_block', '.aut_det')
          .find('.read_more')
          .checkLink();
        cy.visitSite();

        cy.getAndFind('.editors_block', '.aut_det')
          .find('.read_more')
          .clickLink();
        cy.visitSite();
      });
      it.only('Checks that Editors picks articles have links under you might also like', () => {
        cy.get('.text-pink').click()
        cy.getAndFind('#toc_section_yml', '.content_block > a').first().find('img').should('exist')
        cy.getAndFind('#toc_section_yml', '.content_block').first().checkLink()

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
          cy.visitSite();
        });
        it(`checks that card ${i} has a working author link`, () => {
          cy.checkAuthorLink(`.edPicks_bl > .bl-${i}`);
          cy.visitSite();
        });
      }
    });
  });

  describe('tests for recipes section ', () => {
    helper.checkSectionHeader('Recipe', '.recipes_bl');
    for (let i = 1; i < 4; i++) {
      helper.checkRecipeBlock(
        `.recipes_bl > .row > :nth-child(${i})`,
        `Recipe story ${i}`,
        'en',
        'recipe'
      );
    }
    it('checks the more recipes link', () => {
      cy.getAndFind('.recipes_bl', '.moreLink').shouldHaveContent();
      cy.getAndFind('.recipes_bl', '.moreLink').checkLink();
      cy.getAndFind('.recipes_bl', '.moreLink').clickLink();
      cy.visitSite();
    });
  });

  describe('tests for kid meals section ', () => {
    helper.checkSectionHeader('Kid Meals', '.bottom');
    for (let i = 1; i < 4; i++) {
      helper.checkRecipeBlock(
        `.bottom> .row > :nth-child(${i})`,
        `Kid meals story ${i}`
      );
    }
    it('checks the more kid recipes link', () => {
      cy.getAndFind('.bottom', '.moreLink').shouldHaveContent();
      cy.getAndFind('.bottom', '.moreLink').checkLink();
      cy.getAndFind('.bottom', '.moreLink').clickLink();
      cy.visitSite();
    });
  });

  describe('tests for discover more block', () => {
    let catAmount = 3;
    it('checks that Discover More title is present', () => {
      cy.get('.cat_details').then(($div) => {
        catAmount = $div.length;
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
