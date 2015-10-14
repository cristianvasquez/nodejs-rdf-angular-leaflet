'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /master when location hash/fragment is empty', function() {
    browser.get('/');
    expect(browser.getLocationAbsUrl()).toMatch("/master");
  });


  describe('master', function() {

    beforeEach(function() {
      browser.get('/#/master');
    });


    it('should render master when user navigates to /master', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('detail', function() {

    beforeEach(function() {
      browser.get('/#/detail');
    });


    it('should render detail when user navigates to /detail', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
