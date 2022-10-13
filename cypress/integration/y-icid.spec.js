import { checkICIDLinks } from "../support";

context('ICID Tests', ()=>{
  describe('Load page', () => {
    checkICIDLinks('hoverboard-buying-guide', '[href*="walmart.ca"]')
    checkICIDLinks('teacher-gifts', '[href*="walmart.ca"]', true)
    checkICIDLinks('special-needs-toys', '[href*="walmart.ca"]')
    checkICIDLinks('best-computer-monitors', '[href*="walmart.ca"]')
    checkICIDLinks('make-ahead-cinnamon-bun-casserole', '[href*="walmart.ca"]', false, '/recipes')
    checkICIDLinks('best-gifts-for-dad', '[href*="walmart.ca"]')
   })
})