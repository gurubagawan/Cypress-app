import X2JS from 'x2js';
const axios = require('axios');
const jsonAssertion = require("soft-assert")

let innerSitemap = 2

const sitemap = [
  {
      "loc": "https://kcfinalstg.wpengine.com/sitemap-misc.xml",
      "lastmod": "2022-06-09T14:33:35+00:00"
  },
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
  },
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
  },
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
  },
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

context.skip('Home Page', () => {
  let URLsToCheck = [[{loc: 'https://kcfinalstg.wpengine.com/'}]]
  describe.only('Tests for footer', () => { 
    // before(()=>{
    //   cy.request('https://kcfinalstg.wpengine.com/sitemap.xml/')
    //   .then(res => {
    //     console.log(res);
    //     const x2js = new X2JS()
    //     const json = x2js.xml2js(res.body)
    //     const sitemapindex = json['sitemapindex']
    //     sitemap1  = sitemapindex.sitemap
    //     for (
    //       let index = 0; 
    //       // index < sitemapindex.sitemap.length; 
    //       index < 5; 
    //       index++) {
          
    //       cy.request(sitemapindex.sitemap[index].loc).then((response)=>{
    //         const innerJSON = x2js.xml2js(response.body)
    //         URLsToCheck.push([innerJSON['urlset'].url])
    //       })
    //     }
    //   })
    //   const finalURLS = URLsToCheck.flat()
    //   URLsToCheck = finalURLS
    // })
    // for (let index = 0; index < 10000; index++) {
    //   // console.log(URLsToCheck)
    //   // URLsToCheck = URLsToCheck.flat()
    //   // if(Array.isArray(URLsToCheck[index])) {
    //     for (let k = 0; k < URLsToCheck.length; k++) {
    //       // if(!URLsToCheck[index][k]){return null}

    //       it('checks this url ', () => {
    //         cy.log('arrayt')
    //         cy.log(URLsToCheck[index][k])
    //         // cy.visit(URLsToCheck[index][k].loc)
    //       });
    //     }
      // } else {
      //   it('my urls ', () => {
      //     cy.log(Array.isArray(URLsToCheck[index]))
      //     cy.log('ssss')
      //     cy.log('NOn array ')
      //     cy.log(URLsToCheck[index])
      //     cy.log(URLsToCheck[index].loc)
      //     cy.visit(URLsToCheck[index].loc)
      //   })
      // }

      // for (let index = 0; index < URLsToCheck?.length; index++) {
      //   console.log(URLsToCheck)
      //   URLsToCheck = URLsToCheck.flat()
      //   if (URLsToCheck[index].length > 1) {
      //     it('checks this url ', () => {
      //       cy.visit(URLsToCheck.loc)
      //     });
          
      //   } else {
      //     for (let k = 0; k < URLsToCheck[index].length; k++) {
      //       it('checks this url ', () => {
      //         cy.visit(URLsToCheck[k].loc)
      //       });
            
      //     }
      //   }
      
        // console.log(resp.body)
        // const x2js = new X2JS()
        // const json = x2js.xml2js(resp.body)
        // const sitemapindex = json['sitemapindex']
        // let { sitemap } = sitemapindex
      
      
      // it('checks every site ', () =>{
      //   // cy.intercept({
      //     //   method: 'GET',
      //     //   url: 'https://ideas.walmart.ca/sitemap.xml',
      //     // }).as('apiCheck')
          
      //     // cy.wait('@apiCheck')
      //     cy.log(URLsToCheck)
       
      //       for (let i = 0; i < 5; i++) {
              
      //         cy.request(sitemap[i].loc).then((response)=>{
      //           // const innerJSON = x2js.xml2js(response.body)
      //           // const innerURLs = innerJSON['urlset'].url
      //           if (Array.isArray(URLsToCheck[i])){
      //             for (let j = 0; j < 5; j++) {
      //               cy.log(URLsToCheck[i])
      //               cy.visit(URLsToCheck[i][j].loc, { failOnStatusCode: false })
      //               cy.get('.td-sub-footer-container').should('exist')
      //             }
      //           } else {
      //             cy.log(URLsToCheck[i])
                  
      //             cy.visit(URLsToCheck[i].loc, { failOnStatusCode: false })
      //             cy.get('.td-sub-footer-container').should('exist')
      //           }
      //         })
      //       }
      //     })
      // }
   })

   describe('sitemap', () => {
    it('fetches the sitemap.xml', () => {
      // https://on.cypress.io/request
      cy.request('https://kcfinalstg.wpengine.com/sitemap.xml/')
        .then((res) => {
          const x2js = new X2JS()
          const json = x2js.xml2js(res.body)
          const sitemapindex = json['sitemapindex']
          // get all URLs from the sitemap
          expect(sitemapindex.sitemap).to.be.an('array').and.have.length.gt(0)
          
          sitemapindex.sitemap.forEach((url) => {
            const parsed = new URL(url.loc)
            cy.log(parsed.pathname)
            
            // check if the resource exists
            // cy.request('HEAD', url.loc).its('status').should('eq', 200)
            // check if the resource exists AND download it
            // cy.request(url.loc).its('status').should('eq', 200)
            // visit the page to check if it loads in the browser
            // cy.visit(url.loc).wait(1000, { log: false })
          })
        })
    })
    it('has urls', () => {
      expect(Cypress.env('sitemapUrls')).to.be.an('array').and.not.be.empty
    })
  
  })

  describe.skip('Tests for footer', () => { 
    let URLsToCheck = [{loc: 'https://kcfinalstg.wpengine.com/'},{loc: 'https://kcfinalstg.wpengine.com/'}]
    for (let i = 0; i < 10000; i++) {
      it('checks every site ', () =>{
        before(()=>{
          cy.request('https://kcfinalstg.wpengine.com/sitemap.xml/')
          .then(res => {
            console.log(res);
            const x2js = new X2JS()
            const json = x2js.xml2js(res.body)
            const sitemapindex = json['sitemapindex']
            sitemap  = sitemapindex.sitemap
            for (
              let index = 0; 
              // index < sitemapindex.sitemap.length; 
              index < 5; 
              index++) {
              
              cy.request(sitemapindex.sitemap[index].loc).then((response)=>{
                const innerJSON = x2js.xml2js(response.body)
                URLsToCheck.push(innerJSON['urlset'].url)
              })
            }
          })
          const finalURLS = URLsToCheck.flat()
          URLsToCheck = [ ... finalURLS]
        })
        cy.request('https://kcfinalstg.wpengine.com/sitemap.xml/').then((resp)=>{
          const x2js = new X2JS()
          const json = x2js.xml2js(resp.body)
          const sitemapindex = json['sitemapindex']
          let { sitemap } = sitemapindex
          cy.log(sitemap)
          // for (let i = 0; i < sitemap.length; i++) {
            if(!sitemap[i]){return null}
            cy.request(sitemap[i].loc).then((response)=>{
              const innerJSON = x2js.xml2js(response.body)
              cy.log(innerJSON)
              const innerURLs = innerJSON['urlset'].url
              if (Array.isArray(innerURLs)){
                for (let j = 0; j < 10000; j++) {
                  if(!innerURLs[j]){return null}

                  if(innerURLs[j].loc.includes("ideas.walmart")){ continue }
                  cy.visit(innerURLs[j].loc, {failOnStatusCode: false})
                  cy.get('.td-sub-footer-container').should('exist')

                }
              } else {
                if(innerURLs.loc.includes("ideas.walmart")){ return }
                
                cy.visit(innerURLs.loc,  {failOnStatusCode: false})
                cy.get('.td-sub-footer-container').should('exist')
              }
            })
          // }
        })
      })
    }
   })

  describe.skip('Tests for footer', () => {
    
        before(()=>{

          cy.request('https://kcfinalstg.wpengine.com/sitemap.xml/').then((resp)=>{
            const x2js = new X2JS()
            const json = x2js.xml2js(resp.body)
            const sitemapindex = json['sitemapindex']
            sitemap = sitemapindex.sitemap
            cy.log(sitemap)
            cy.request(sitemapindex.sitemap[i].loc).then((response)=>{
              sitemap = x2js.xml2js(response.body)
              cy.log(innerJSON)
            })
          })
          for (let i = 0; i < 100000; i++) {
            // if(!sitemap[i]) {return null }
            if(innerSitemap === 2) { innerSitemap = sitemap.length}
            cy.request(sitemap[i].loc).then((response)=>{
              const innerJSON = x2js.xml2js(response.body)
              cy.log(innerJSON)
              const innerURLs = innerJSON['urlset'].url
              it('Test this ', () => {
              if (Array.isArray(innerURLs)){
                for (let j = 0; j < innerURLs.length; j++) {
                  if(innerURLs[j].loc.includes("ideas.walmart")){ continue }
                    
                    cy.visit(innerURLs[j].loc, {failOnStatusCode: false})
                    cy.get('.td-sub-footer-container').should('exist')
                    // const footer =  cy.get('.td-sub-footer-container')
                    // jsonAssertion.softAssert(footer.length, 1, "Footer existss");
                  }
                } else {
                  if(innerURLs.loc.includes("ideas.walmart")){ return }
                  
                  cy.visit(innerURLs.loc,  {failOnStatusCode: false})
                  cy.get('.td-sub-footer-container').should('exist')

                  // const footer =  cy.get('.td-sub-footer-container')
                  // jsonAssertion.softAssert(footer.length, 1, "Footer existss");
                }
              });
            })
          }
        })
    })
});
