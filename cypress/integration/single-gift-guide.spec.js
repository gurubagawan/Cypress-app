import * as helper from '../support/index';

context.skip("Tests for indidivdual gift guides", () => {
  before(() => {
    cy.intercept("POST", "/wp-admin/admin-ajax.php").as("initialLoad");
    cy.visitSite("/best-toys-kids/");
  });

  describe("header tests", () => {
    helper.checkArticleCrumbs(
      "Gift Guides",
      "We Pick 2021’s Best Toys for Kids Aged 1 to 10"
    );

    it("checks that title exists", () => {
      cy.get(".td-post-title").shouldHaveContent();
    });
    it("checks that sub-title exists", () => {
      cy.get(".sub_title_main").shouldHaveContent();
    });
  });
  describe("Tests for main content", () => {
    helper.checkArticleAuthor();

    it("checks that article image exists and links to gallery", () => {
      cy.get(".ss_img").shouldHaveContent();
      cy.getAndFind(".ss_img", ".start_slideshow").shouldHaveContent();
    });

    it("checks that article content exists", () => {
      cy.get(".ss_intro_text").shouldHaveContent();
      cy.getAndFind(".ss_intro_text", ".textLink")
        .shouldHaveContent()
        .checkLink();
    });
  });

  helper.checkSeasonalSection(4, 0);
  helper.checkSeasonalSection(8, 1);
});
