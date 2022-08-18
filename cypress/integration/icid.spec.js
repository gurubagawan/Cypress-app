context('ICID Tests', ()=>{
  describe('Load page', () => {
    it('checks this ', () => {
      
      cy.visit('/hoverboard-buying-guide')
      cy.get('body').click(0, 0)

      cy.get('.slick-arrow').should('exist')
    });

    it('checsk the ICID tag', () => {
      cy.visit('/hoverboard-buying-guide')
      cy.get('body').click(0, 0)
      cy.wait(5000)
      cy.get('#slick-slide90 > :nth-child(1) > .col > .metaBl > .prodTitle > a').invoke('attr', 'href').then((href)=>{
        expect(href).to.contain('best-blender')
      })
    });
   })
})