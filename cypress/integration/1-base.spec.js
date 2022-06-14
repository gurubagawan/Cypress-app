const { stringify } = require('mocha/lib/utils')
const X2JS = require('x2js')
const axios = require('axios').default

const sitemap1 = [
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
    }
]



const sitemap2 = [
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
]

const sitemap3 = [
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
]

const sitemap4 = [
    
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
]

const sitemap5 = [
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

]

const sitemap6 = [
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

const sitemap = [...sitemap1]

describe('sitemap', () => {
  let innerURLS
  sitemap.forEach((obj)=>{

    
    it('fetches the sitemap.xml', async () => {
      // https://on.cypress.io/request
    await axios.get(obj.loc).then((res)=>{
      cy.log('lllllll')
      cy.log(Cypress.env('sitemapUrls'))
      const x2js = new X2JS()
      const innerJSON = x2js.xml2js(res.data)
      // console.log(innerJSON.urlset.url)
      innerURLS = innerJSON.urlset
      innerJSON.urlset.url.forEach((obj)=>{
        cy.visit(obj.loc)
        cy.get('body').should('exist')
      })
    })
    cy.log('fffff')
    cy.log(Cypress.env('sitemapUrls'))
    // cy.visit('/').get('body').should('exist')
      // cy.request(obj.loc)
      // .then(res => {
      //   const x2js = new X2JS()
      //   const innerJSON = x2js.xml2js(res.body)
      //       // URLsToCheck.push([innerJSON['urlset'].url])
      //   // console.log(innerJSON['urlset'].url)
      //   // const json = x2js.xml2js(res.body)
      //   const urlArray = Array.isArray(innerJSON['urlset'].url)? innerJSON['urlset'].url : [innerJSON['urlset'].url]
      //   // get all URLs from the sitemap
      //   // expect(json['sitemapindex'].sitemap).to.exist.and.have.length.gt(0)
      //   urlArray.forEach((url) => {
      //     const parsed = new URL(url.loc)
      //     cy.log(parsed.pathname)
          
      //     // check if the resource exists
      //     cy.request('HEAD', url.loc).its('status').should('eq', 200)
      //     // check if the resource exists AND download it
      //     cy.request(url.loc).its('status').should('eq', 200)
      //     // visit the page to check if it loads in the browser
      //     // cy.visit(url.loc).wait(1000, { log: false })
      //   })
      // })
    })
  })
})

// describe.only('Sitemap', () => {
//   // initialize the url array
//   let urls = [{loc: 'https://kcfinalstg.wpengine.com'}]

//   // be sure to get the url list before executing any tests
//   before(async () => {
//     // getch the sitemap content
//     sitemap.forEach(async (obj)=>{
//       const response = await axios.get(obj.loc)
//       const x2js = new X2JS()
//       const innerJSON = await x2js.xml2js(response)
//       console.log(innerJSON)
//       urls.push(innerJSON)
//     })
//     // const response = await cy.request('https://kcfinalstg.wpengine.com/sitemap.xml/')

//     // convert sitemap xml body to an array of urls
//     // cy.log(urls)
//   })

//   it.only('should succesfully load each url in the sitemap', () => {
//     urls.forEach((object)=>{
//       console.log(object)
//       // if(object.contains('.xml')) return null
//       cy.visit(object.loc)
//       cy.get('body').should('exist')
//     })
//   })
// })

describe.only('Last ditch', ()=>{
  sitemap.forEach((obj)=>{
    for (let i = 0; i < 5; i++) {
      it('Tests URL ',function(){
        cy.request(obj.loc).then((resp)=>{
          const x2js = new X2JS()
          // console.log(resp)
          const innerJSON = x2js.xml2js(resp.body)
          console.log(innerJSON)
          if(innerJSON.urlset?.url[1]){
            if(!innerJSON.urlset?.url[i]){this.skip()}
            cy.visit(innerJSON.urlset.url[i].loc)
            cy.get('head meta[name="robots"]').should('exist');
            cy.get('.td-sub-footer-menu').should('exist')
          } else {
            if(!innerJSON.urlset?.url){this.skip()}
            cy.visit(innerJSON.urlset.url.loc)
            cy.get('head meta[name="robots"]').should('exist');
            cy.get('.td-sub-footer-menu').should('exist')
          }
        })
      });
    }
  })
})
