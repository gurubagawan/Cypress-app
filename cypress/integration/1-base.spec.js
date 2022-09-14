const { stringify } = require('mocha/lib/utils')
const X2JS = require('x2js')
const { fullMap, checkMetaTag, checkCrawler } = require('../support')
const axios = require('axios').default


// fullMap.forEach((sitemap, index)=> {
// 	describe(`Map Group ${index+1} `, ()=>{
// 		before(()=>{
// 			cy.wait(10000)
// 			cy.log(fullMap.length)
// 		})
// 		sitemap.forEach((obj)=>{
// 				for (let j = 0; j < 100; j+=10) {
// 				for (let i = 0; i < 10; i++) {
// 					it(`Tests URL ${obj.loc}`,()=>{
// 						cy.request(obj.loc).then((resp)=>{
// 							const x2js = new X2JS()
// 							// console.log(resp)
// 							const innerJSON = x2js.xml2js(resp.body)
// 							if(innerJSON.urlset?.url[1]){
// 								if(!innerJSON.urlset?.url[i+j]){return}
// 								cy.visit(innerJSON.urlset.url[i+j].loc)
// 								checkMetaTag()
// 								cy.get('.td-sub-footer-menu').should('exist')
// 							} else {
// 								if(!innerJSON.urlset?.url || i > 1){
// 									return
// 								}
// 								cy.visit(innerJSON.urlset.url.loc)
// 								checkMetaTag()
// 								cy.get('.td-sub-footer-menu').should('exist')
// 							}
// 						})
// 					});
// 				}
// 			}
// 			})
// 		})
// 	})


let i = 50
for (let j = 0; j < i; j++) {
	checkCrawler(j)
}

// for (let j = 10; j < 20; j++) {
// 	checkCrawler(j)
// }

// for (let j = 20; j < 30; j++) {
// 	checkCrawler(j)
// }

// for (let j = 30; j < 40; j++) {
// 	checkCrawler(j)
// }

// for (let j = 40; j < 50; j++) {
// 	checkCrawler(j)
// }

// for (let j = 50; j < 60; j++) {
// 	checkCrawler(j)
// }

// for (let j = 60; j < 70; j++) {
// 	checkCrawler(j)
// }

// for (let j = 70; j < 80; j++) {
// 	checkCrawler(j)
// }

// for (let j = 80; j < 90; j++) {
// 	checkCrawler(j)
// }

// for (let j = 90; j < 100; j++) {
// 	checkCrawler(j)
// }

// for (let j = 100; j < 110; j++) {
// 	checkCrawler(j)
// }

// for (let j = 110; j < 120; j++) {
// 	checkCrawler(j)
// }

// for (let j = 120; j < 130; j++) {
// 	checkCrawler(j)
// }

// for (let j = 130; j < 140; j++) {
// 	checkCrawler(j)
// }

// for (let j = 140; j < 150; j++) {
// 	checkCrawler(j)
// }

// for (let j = 150; j < 160; j++) {
// 	checkCrawler(j)
// }

// for (let j = 160; j < 170; j++) {
// 	checkCrawler(j)
// }

// for (let j = 170; j < 180; j++) {
// 	checkCrawler(j)
// }

// for (let j = 180; j < 190; j++) {
// 	checkCrawler(j)
// }

// for (let j = 190; j < 200; j++) {
// 	checkCrawler(j)
// }



// for (let j = 200; j < 210; j++) {
// 	checkCrawler(j)
// }

// for (let j = 210; j < 220; j++) {
// 	checkCrawler(j)
// }

// for (let j = 220; j < 230; j++) {
// 	checkCrawler(j)
// }

// for (let j = 230; j < 240; j++) {
// 	checkCrawler(j)
// }

// for (let j = 240; j < 250; j++) {
// 	checkCrawler(j)
// }

// for (let j = 250; j < 260; j++) {
// 	checkCrawler(j)
// }

// for (let j = 260; j < 270; j++) {
// 	checkCrawler(j)
// }

// for (let j = 270; j < 280; j++) {
// 	checkCrawler(j)
// }

// for (let j = 280; j < 290; j++) {
// 	checkCrawler(j)
// }

// for (let j = 290; j < 300; j++) {
// 	checkCrawler(j)
// }