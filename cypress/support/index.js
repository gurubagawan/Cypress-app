// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cy-mobile-commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

export const visitCorrectSite = (lang) => {
  if (lang == 'fr') {
    cy.visitFrenchSite();
  } else {
    cy.visitSite();
  }
};

export const checkStoryBlock = (selector, name, lang = 'en') => {
  it(`checks that ${name} exists and has content`, () => {
    cy.get(selector).should('be.visible').and('exist').and('not.be.empty');
  });
  it(`checks that ${name} has a read tag`, () => {
    cy.checkReadTag(selector, lang);
  });
  it(`checks that ${name} has working title link`, () => {
    cy.checkTitleLink(selector);
    visitCorrectSite(lang);
  });
  it(`checks that ${name} has a working author link`, () => {
    cy.checkAuthorLink(selector);
    visitCorrectSite(lang);
  });
  it(`checks that ${name} has a working image`, () => {
    cy.checkImageLink(selector);
    visitCorrectSite(lang);
  });
};

export const checkItemCarousel = (selector, rounds, lang = 'en') => {
  for (let i = 0; i < rounds; i++) {
    cy.getAndFind(selector, '[aria-hidden=false]').eq(i).checkItemTitle();
    cy.getAndFind(selector, '[aria-hidden=false]').eq(i).checkItemPrice();
    cy.getAndFind(selector, '[aria-hidden=false]').eq(i).checkWalLink();
  }
};

export const getCarouselLength = (selector) => {
  cy.getAndFind(selector, '[aria-hidden=false]').then(($div) => {
    return $div.length;
  });
};

export const checkPostCarousel = (selector, rounds, lang = 'en') => {
  for (let i = 0; i < rounds; i++) {
    cy.getAndFind(selector, '[aria-hidden=false]').eq(i).checkTitleLink();
    visitCorrectSite(lang);
  }
};

export const checkSectionHeader = (
  sectionTitle,
  selector,
  titleContent,
  subContent
) => {
  it(`checks that ${sectionTitle} section title has content`, () => {
    cy.checkSectionTitle(selector, titleContent);
  });
  it(`checks that ${sectionTitle} section sub header has content`, () => {
    cy.checkSectionSub(selector, subContent);
  });
};

export const checkRecipeBlock = (
  selector,
  name,
  lang = 'en',
  type = 'read'
) => {
  it(`checks that ${name} exists and has content`, () => {
    cy.get(selector).should('be.visible').and('exist').and('not.be.empty');
  });
  it(`checks that ${name} has a read tag`, () => {
    cy.checkReadTag(selector, lang, type);
  });
  it(`checks that ${name} has working title link`, () => {
    cy.checkTitleLink(selector);
    visitCorrectSite(lang);
  });
  it(`checks that ${name} has a working image`, () => {
    cy.checkImageLink(selector);
    visitCorrectSite(lang);
  });
};

export const checkArticleCrumbs = (CategoryName, ArticleName) => {
  it('checks that bread crumbs exist', () => {
    cy.get('.entry-crumbs').shouldHaveContent();
  });
  it('checks that bread crumb trail shows the category ', () => {
    cy.getAndFind('.entry-crumbs', '.td-bred-no-url-last')
      .eq(1)
      .contains(CategoryName);
  });
  it('checks that bread crumb trail shows the title ', () => {
    cy.getAndFind('.entry-crumbs', '.td-bred-no-url-last')
      .eq(3)
      .contains(ArticleName);
  });
};

export const checkArticleHeader = () => {
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
};

export const checkArticleAuthor = () => {
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
};

export const checkSeasonalSection = (numOfPosts, index) => {
  // numOfPosts relates to how many posts are in the block, index is to differentiate if there is more than one row on the page
  describe('Seasonal section tests', () => {
    checkSectionHeader('seasonal', '.seasonal_posts');
    it(`checks that ${numOfPosts} seasonal posts are visible`, () => {
      cy.get('.seasonal_row')
        .eq(index)
        .find('.block')
        .should('have.length', numOfPosts);
    });
    it('checks that seasonal section more link is present', () => {
      cy.getAndFind('.seasonal_posts', '.moreLink').first().shouldHaveContent();
    });
    it('checks that seasonal section more link is working', () => {
      cy.getAndFind('.seasonal_posts', '.moreLink').first().checkLink();
      cy.getAndFind('.seasonal_posts', '.moreLink')
        .first()
        .checkLink('/category');
    });
  });
};
