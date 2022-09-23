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
const X2JS = require('x2js')
const axios = require('axios').default
const jsonAssertion = require("soft-assert")
const { proxy, flush } = require("@alfonso-presa/soft-assert");
const softExpect = proxy(expect);
const softAssert = proxy(assert);



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
      cy.get(".seasonal_row")
        .eq(index)
        .find(".block")
        .should("have.length", numOfPosts);
    });
  });
};

export const checkICIDLinks = (url, selector, gallery=false, sub="") =>{
	it(`checks the ICID tag for ${url}`, () => {
		cy.visit(`${sub}/${url}`)
		cy.get('body').click(0, 0)
		cy.wait(5000)
		if(gallery){
			cy.get('.textLinkInit').click
		}
		cy.get(selector).then((arr)=>{
			for (let i = 0; i < arr.length; i++) {
				cy.wrap(arr[i])
				.checkICID(url, i === arr.length -1 )
			}
		})
 })
}

export const checkMetaTag = (url) =>{
	cy.get('head meta[name="robots"]').should('exist');
  cy.get('head meta[name="robots"]').invoke('attr', 'content').then(cont=>{
			if(cont.includes('noindex')){
				jsonAssertion.softTrue(false, `Error found on page ${url}`)
			}
    });
	cy.get('.td-sub-footer-menu').then(footer =>{
		if(footer.length < 1){
			jsonAssertion.softTrue(false, `No footer found on page ${url}`)
		}
	})
}


// jsonAssertion.softTrue(expect(cont).to.not.contain('noindex'), 'URL had message')

export const checkCrawler = () => { 
	fullMap.forEach((sitemap, index)=> {
		describe(`Map Group ${index+1} `, ()=>{
			before(()=>{
				// cy.wait(10000)
				cy.log(fullMap.length)
			})
			sitemap.forEach((obj)=>{
				// for (let i = j; i < j+10; i++) {
					it(`Tests URL ${obj.loc}`,()=>{
						cy.request(obj.loc).then((resp)=>{
							const x2js = new X2JS()
							// console.log(resp)
							const innerJSON = x2js.xml2js(resp.body)
							if(Array.isArray(innerJSON.urlset?.url)){
								// if(!innerJSON.urlset?.url[j]){return}
								innerJSON.urlset?.url.forEach((item)=>{

									cy.visit(item.loc)
									checkMetaTag(item.loc)
									cy.task('log', `test passed for ${item.loc}`)
								})
							} else {
								// if(!innerJSON.urlset?.url || j > 1){
								// 	return
								// }
								cy.visit(innerJSON.urlset.url.loc)
								checkMetaTag(innerJSON.urlset.url.loc)
								cy.task('log', `Test Passed for ${innerJSON.urlset.url.loc}`)
							}
						})
						jsonAssertion.softAssertAll()
					});
				// }
			})
		})
	})
}

export const fullMap = [
	[
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-tax-post_tag.xml",
				"lastmod": "2022-06-09T14:33:35+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-tax-category.xml",
				"lastmod": "2022-06-09T14:33:35+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-recipes-2022-04.xml",
				"lastmod": "2022-04-28T20:51:03+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-recipes-2022-03.xml",
				"lastmod": "2022-03-28T18:17:43+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-recipes-2022-02.xml",
				"lastmod": "2022-05-17T19:23:02+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-recipes-2022-01.xml",
				"lastmod": "2022-01-31T21:58:37+00:00"
		}
], [
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-recipes-2021-11.xml",
				"lastmod": "2021-11-16T19:19:04+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-recipes-2021-10.xml",
				"lastmod": "2021-10-25T13:55:57+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-recipes-2021-09.xml",
				"lastmod": "2021-10-06T18:15:54+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-recipes-2021-08.xml",
				"lastmod": "2021-08-23T13:06:44+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-recipes-2021-07.xml",
				"lastmod": "2022-01-11T19:24:59+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-recipes-2021-06.xml",
				"lastmod": "2022-01-20T16:57:15+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-recipes-2021-05.xml",
				"lastmod": "2021-12-10T15:22:22+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-recipes-2020-05.xml",
				"lastmod": "2020-11-09T13:22:47+00:00"
		}
],  [
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-recipes-2020-03.xml",
				"lastmod": "2022-05-27T13:26:43+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2022-06.xml",
				"lastmod": "2022-06-01T17:15:18+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2022-05.xml",
				"lastmod": "2022-06-03T15:15:37+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2022-04.xml",
				"lastmod": "2022-06-03T15:16:52+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2022-03.xml",
				"lastmod": "2022-05-24T18:31:59+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2022-02.xml",
				"lastmod": "2022-05-16T16:03:29+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2022-01.xml",
				"lastmod": "2022-05-12T17:52:28+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2021-12.xml",
				"lastmod": "2022-05-12T15:53:19+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2021-11.xml",
				"lastmod": "2022-04-19T19:35:32+00:00"
		},
],  [
		
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2021-10.xml",
				"lastmod": "2022-05-12T15:35:03+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2021-09.xml",
				"lastmod": "2021-12-22T20:31:42+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2021-08.xml",
				"lastmod": "2021-12-01T14:12:45+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2021-07.xml",
				"lastmod": "2021-12-15T21:00:29+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2021-06.xml",
				"lastmod": "2022-05-05T18:21:46+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2021-05.xml",
				"lastmod": "2022-04-18T13:36:35+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2021-04.xml",
				"lastmod": "2022-04-08T13:19:38+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2021-03.xml",
				"lastmod": "2022-05-12T17:57:28+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2021-02.xml",
				"lastmod": "2022-03-22T14:15:05+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2021-01.xml",
				"lastmod": "2022-03-02T21:54:22+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2020-12.xml",
				"lastmod": "2022-04-25T20:09:12+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2020-11.xml",
				"lastmod": "2022-04-25T19:27:50+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2020-10.xml",
				"lastmod": "2021-10-25T20:49:57+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2020-09.xml",
				"lastmod": "2022-02-18T21:10:48+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2020-08.xml",
				"lastmod": "2021-11-15T18:50:36+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2020-07.xml",
				"lastmod": "2021-04-22T22:03:37+00:00"
		}
],  [
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2020-06.xml",
				"lastmod": "2020-11-25T15:52:34+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2020-05.xml",
				"lastmod": "2021-10-27T13:32:03+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2020-04.xml",
				"lastmod": "2021-12-16T16:10:24+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2020-03.xml",
				"lastmod": "2020-04-22T17:34:04+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2019-12.xml",
				"lastmod": "2020-04-16T15:16:35+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2019-11.xml",
				"lastmod": "2020-04-16T15:54:35+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2019-09.xml",
				"lastmod": "2020-04-16T15:17:47+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2019-08.xml",
				"lastmod": "2020-04-16T15:17:50+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2019-07.xml",
				"lastmod": "2020-04-16T15:17:56+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2019-06.xml",
				"lastmod": "2020-04-16T15:18:10+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2019-04.xml",
				"lastmod": "2021-12-01T15:59:25+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2019-03.xml",
				"lastmod": "2021-12-16T16:11:22+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2019-02.xml",
				"lastmod": "2020-04-16T15:23:43+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2019-01.xml",
				"lastmod": "2022-01-05T21:31:43+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2018-12.xml",
				"lastmod": "2020-04-16T15:25:46+00:00"
		},

], [
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2018-11.xml",
				"lastmod": "2020-04-16T15:25:57+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2018-10.xml",
				"lastmod": "2020-04-16T15:26:59+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2018-06.xml",
				"lastmod": "2022-01-06T17:15:36+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-post-2018-01.xml",
				"lastmod": "2020-04-16T15:39:53+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-page-2020-10.xml",
				"lastmod": "2020-10-07T20:30:32+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-page-2019-11.xml",
				"lastmod": "2019-12-05T15:25:16+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-page-2019-04.xml",
				"lastmod": "2020-08-26T23:08:36+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-pt-page-2019-02.xml",
				"lastmod": "2019-03-11T14:13:55+00:00"
		},
		{
				"loc": "https://kcfinalstg.wpengine.com/sitemap-authors.xml",
				"lastmod": "2022-06-09T14:33:35+00:00"
		}
	]
]
