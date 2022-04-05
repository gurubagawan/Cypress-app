import * as helper from '../support/index';

context("Tests for gallery slideshow", () => {
  before(() => {
    cy.intercept("POST", "/wp-admin/admin-ajax.php").as("initialLoad");
    cy.visitSite("/gifts-for-couples/?slide=1");
  });

  describe("Inital load tests", () => {
    it("checks that slideshow exists", () => {
      cy.get(".SlideshowInit ").shouldHaveContent();
    });
    it("checks that view all slides button exists", () => {
      cy.get(".changeSlideshowType").shouldHaveContent();
    });
    it("checks that slide counter exists and shows the right number", () => {
      cy.get(".slick-counter").contains("1");
    });
    it("checks that the first slide has a category box", () => {
      cy.get("h2.vc-informationbox-title").shouldHaveContent();
    });
    it("checks that the first slide has a product title", () => {
      cy.get("h3.vc-informationbox-title").shouldHaveContent();
    });
    it("checks that product has a review box", () => {
      cy.get(".starRating").shouldHaveContent();
    });
    it("checks that product has a shop now button", () => {
      cy.get(".btnshop_now").shouldHaveContent();
    });
    it("checks that product has a description", () => {
      cy.get(".text-container").shouldHaveContent();
    });
    it("checks that product description is shortened", () => {
      cy.get("span.terminating_overlay").should("be.visible");
    });
    it("checks that view more button is visible", () => {
      cy.get(".readmoreLess").contains("View More");
    });
    it("checks that view all slides button is visible", () => {
      cy.get(".slideshow-mode-container").shouldHaveContent();
    });
    it("checks that bottom nav shows up", () => {
      cy.get(".wpb_wrapper > .gallery-nav-container").shouldHaveContent();
    });
  });

  describe("changing slide tests", () => {
    let originalTitle;
    let originalPrice;
    let originalDesc;
    let originalNumber;
    before(() => {
      cy.getAndFind("[aria-hidden=false]", "h3.vc-informationbox-title")
        .invoke("text")
        .then((text) => {
          originalTitle = text;
        });
      cy.getAndFind("[aria-hidden=false]", ".text-container")
        .invoke("text")
        .then((text) => {
          originalDesc = text;
        });
      cy.get(".slick-counter")
        .invoke("text")
        .then((text) => {
          originalNumber = text;
        });
      cy.get(".SlideshowInit > .slick-next").click();
    });
    it("checks that clicking next changes the product title", () => {
      cy.getAndFind("[aria-hidden=false]", "h3.vc-informationbox-title")
        .invoke("text")
        .should((text) => {
          expect(text).not.to.eq(originalTitle);
        });
    });
    it("checks that clicking next changes the product title", () => {
      cy.getAndFind("[aria-hidden=false]", ".text-container")
        .invoke("text")
        .should((text) => {
          expect(text).not.to.eq(originalDesc);
        });
    });
    it("checks that clicking next changes the slide number", () => {
      cy.get(".slick-counter")
        .invoke("text")
        .should((text) => {
          expect(text).not.to.eq(originalNumber);
        });
    });
    it("checks that clicking view all slides works", () => {
      cy.get(".slideshow-mode-container").click();
      cy.get('[original-index="0"] > .content').shouldHaveContent();
    });
    it("checks that gallery view shows title picture and content", () => {
      cy.get(
        '[original-index="0"] > .content > .text-center'
      ).shouldHaveContent();
      cy.get(
        '[original-index="0"] > .content > h3.vc-informationbox-title > a'
      ).shouldHaveContent();
      cy.get(
        '[original-index="0"] > .content > .starRating'
      ).shouldHaveContent();
      cy.get(
        '[original-index="0"] > .content > .flex-this-grid-view > .text-container > p'
      ).shouldHaveContent();
      cy.get(
        '[original-index="0"] > .content > .flex-this-grid-view > .buy_nw'
      ).shouldHaveContent();
    });
  });
});
