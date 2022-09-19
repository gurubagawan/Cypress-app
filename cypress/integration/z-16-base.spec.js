const { stringify } = require('mocha/lib/utils')
const X2JS = require('x2js')
const { fullMap, checkMetaTag, checkCrawler } = require('../support')
const axios = require('axios').default



let i = 225
for (let j = i; j < i+15; j++) {
	checkCrawler(j)
}
