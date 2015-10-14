'use strict';

describe('myApp.master module', function() {

  beforeEach(module('myApp.master'));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('MasterCtrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});