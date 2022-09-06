const { stringify } = require('mocha/lib/utils')
const X2JS = require('x2js')
const { fullMap, checkMetaTag } = require('../support')
const axios = require('axios').default

fullMap.forEach((sitemap, index)=> {
	describe(`Map Group ${index+1} `, ()=>{
		before(()=>{
			cy.wait(10000)
			cy.log(fullMap.length)
		})
		sitemap.forEach((obj)=>{
			for (let i = 80; i < 90; i++) {
				it(`Tests URL ${obj.loc}`,function(){
					cy.request(obj.loc).then((resp)=>{
						const x2js = new X2JS()
						// console.log(resp)
						const innerJSON = x2js.xml2js(resp.body)
						if(innerJSON.urlset?.url[1]){
								if(!innerJSON.urlset?.url[i]){return}
								cy.visit(innerJSON.urlset.url[i].loc)
								checkMetaTag()
								cy.get('.td-sub-footer-menu').should('exist')
						} else {
								if(!innerJSON.urlset?.url || i > 1 ){
									return
								}
								cy.visit(innerJSON.urlset.url.loc)
								checkMetaTag()
								cy.get('.td-sub-footer-menu').should('exist')
						}
					})
				});
			}
		})
	})
})
    