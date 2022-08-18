import { checkICIDLinks } from "../support";

context('ICID Tests', ()=>{
  describe('Load page', () => {
    it('checks this ', () => {
      
      cy.visit('/hoverboard-buying-guide')
      cy.get('body').click(0, 0)

      cy.get('.slick-arrow').should('exist')
    });

    checkICIDLinks('hoverboard-buying-guide', '.single_list')
    checkICIDLinks('teacher-gifts', '.article_slider', true)
    checkICIDLinks('special-needs-toys', '.single_gg_item')
    checkICIDLinks('best-computer-monitors', '.single_comp_table')
    checkICIDLinks('make-ahead-cinnamon-bun-casserole', '.single_prod', false, '/recipes')
    checkICIDLinks('best-gifts-for-dad', '.primaryItem')






    it.skip('checsk the ICID tag', () => {
      cy.visit('/hoverboard-buying-guide')
      cy.get('body').click(0, 0)
      cy.wait(5000)
      const x =  cy.get('.single_list')
      // test.forEach((el)=>{
      //   cy.get(el).checkICID('hoverboard-buying-guide')

      // })
      cy.get('.single_list').then((arr)=>{
        for (let i = 0; i < arr.length; i++) {
          cy.get('.single_list')
          .eq(i)
          .checkICID('hoverboard-buying-guide')
          
        }
      })
    });
   })
})