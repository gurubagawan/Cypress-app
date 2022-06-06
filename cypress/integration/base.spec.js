import X2JS from 'x2js';
const axios = require('axios');

let sitemap = ['https://ideas.walmart.ca/sitemap.xml']
let innerSitemap = ['']

context('Home Page', () => {
  let URLsToCheck = [{loc: 'https://ideas.walmart.ca/'},{loc: 'https://ideas.walmart.ca/'}]
  describe('Tests for footer', () => { 
    before(()=>{
      cy.request('https://ideas.walmart.ca/sitemap.xml')
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
    for (let index = 0; index < URLsToCheck.length; index++) {
      // console.log(URLsToCheck)
      URLsToCheck = URLsToCheck.flat()
      if (!Array.isArray(URLsToCheck[index])) {
        it('checks this url ', () => {
          cy.log(URLsToCheck)
          cy.log(URLsToCheck[index])
          cy.visit(URLsToCheck[index].loc)
        });
        
      } else {
        for (let k = 0; k < URLsToCheck.length; k++) {
          it('checks this url ', () => {
            cy.log('this should exist')
            cy.log(URLsToCheck[index][k])
            cy.visit(URLsToCheck[index][k].loc)
          });
          
        }
      }

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
      }
   })
   describe('sitemap', () => {
    it('fetches the sitemap.xml', () => {
      // https://on.cypress.io/request
      cy.request('https://ideas.walmart.ca/sitemap.xml')
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
  describe('Tests for footer', () => { 
    it.only('checks every site ', () =>{
      cy.request('https://ideas.walmart.ca/sitemap.xml').then((resp)=>{
        const x2js = new X2JS()
        const json = x2js.xml2js(resp.body)
        const sitemapindex = json['sitemapindex']
        let { sitemap } = sitemapindex
        for (let i = 0; i < sitemap.length; i++) {
          cy.request(sitemap[i].loc).then((response)=>{
            const innerJSON = x2js.xml2js(response.body)
            const innerURLs = innerJSON['urlset'].url
            if (Array.isArray(innerURLs)){
              for (let j = 0; j < innerURLs; j++) {
                cy.visit(innerURLs[j].loc, {failOnStatusCode: false})
                cy.get('.td-sub-footer-container').should('exist')
              }
            } else {
              cy.visit(innerURLs.loc,  {failOnStatusCode: false})
              cy.get('.td-sub-footer-container').should('exist')
            }
          })
        }
      })
    })
   })
});
