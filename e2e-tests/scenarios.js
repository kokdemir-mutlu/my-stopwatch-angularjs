"use strict";

describe("Stopwatch e2e tests", function () {
  describe("Check elements", function () {
    beforeEach(function () {
      browser.get("index.html");
    });

    it("should have a title", function () {
      expect(browser.getTitle()).toEqual("StopWatch");
    });


  });

});
