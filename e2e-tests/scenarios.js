"use strict";

const { browser, element } = require("protractor");

describe("Stopwatch e2e tests", function () {
  
  beforeAll(function () {
    browser.get("index.html");
  });

  describe("Check elements", function () {
    
    it("should have a title", function () {
      expect(browser.getTitle()).toEqual("StopWatch");
    });


    it("should check the presence of the start button", function(){
      var startButton = element(by.css('[ng-click="$ctrl.handleStartButton()"]'));
      expect(startButton.isPresent()).toBe(true);
    });


    it("should print the text of the start button", function(){
      var startButton = element(by.css('[ng-click="$ctrl.handleStartButton()"]'));
      expect(startButton.getText()).toBe('START')
    });


    it("should check the presence of the reset button", function(){
      var resetButton = element(by.css('[ng-click="$ctrl.handleResetButton()"]'));
      expect(resetButton.isPresent()).toBe(true);
    });


    it("should check the text of the reset button", function(){
      var resetButton = element(by.css('[ng-click="$ctrl.handleResetButton()"]'));
      expect(resetButton.getText()).toBe('RESET')
    });



  });

  describe("Check functionality", function(){

    var startButton, resetButton, lapTable;
    
    beforeAll(function(){
      startButton = element(by.css('[ng-click="$ctrl.handleStartButton()"]'));
      resetButton = element(by.css('[ng-click="$ctrl.handleResetButton()"]'));
      lapTable = element.all(by.css('[id="lapTable"] tr'));
      startButton.click();
    });


    it("should check the text of the start button", function(){
      expect(startButton.getText()).toBe('STOP');
    });


    it("should check the text of the reset button", function(){
      expect(resetButton.getText()).toBe('LAP');
    });


    it("should check the lap table when lap button is clicked", function(){
      expect(lapTable.get(0).isPresent()).toBe(false);
      resetButton.click();
      expect(lapTable.get(0).isPresent()).toBe(true);

      browser.sleep(1000);

      expect(lapTable.get(1).isPresent()).toBe(false);
      resetButton.click();
      expect(lapTable.get(1).isPresent()).toBe(true);
    });

    it("should wait for 2 seconds", function(){
      browser.sleep(2000);
    });

    it("should resets the stopwatch when reset button is clicked", function(){
      lapTable.then(function(totalRows){
        expect(totalRows.length).toBe(2);
      });
      startButton.click();
      resetButton.click();
      lapTable.then(function(totalRows){
        expect(totalRows.length).toBe(0);
      });
    });

    afterAll(function(){
      browser.sleep(2000);
    })

  });

});
