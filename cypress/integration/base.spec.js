import X2JS from 'x2js';

context('Home Page', () => {
  describe('Tests for footer', () => { 
    it('checks every site ', () =>{
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
                cy.visit(innerURLs[j].loc)
                cy.get('.td-sub-footer-container').should('exist')
              }
            } else {
              cy.visit(innerURLs.loc)
              cy.get('.td-sub-footer-container').should('exist')
            }
          })
        }
      })
    })
   })
});
