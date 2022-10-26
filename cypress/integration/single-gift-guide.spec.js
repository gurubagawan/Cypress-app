import * as helper from '../support/index';

context("Tests for indidivdual gift guides", () => {
  before(() => {
    cy.intercept("POST", "/wp-admin/admin-ajax.php").as("initialLoad");
    cy.visitSite("/best-toys-kids/");
  });

  describe("header tests", () => {
    helper.checkArticleCrumbs(
      "Gift Guides",
      "The 50 Hottest Toys of 2021 for Kids of All Ages"
      // check if there is a second element
      // get the content of the title and compare against that
    );

    it("checks that title exists", () => {
      cy.get(".mainTitle").shouldHaveContent();
    });
  });
  describe("Tests for main content", () => {
    helper.checkArticleAuthor();

    it("checks that article content exists", () => {
      cy.get(".content_block").shouldHaveContent();
    });
  });

  helper.checkSeasonalSection(4, 0);
  helper.checkSeasonalSection(8, 1);
});
