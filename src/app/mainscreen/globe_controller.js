"use strict";

tttApp.controller('TTTController', function ($scope, ThreeEnv) {

  $scope.dims = 4;

  $scope.usercolor = "#0000FF";
  $scope.username = "Player1";
  $scope.userfirst = false;

  var canvasId = "ttt-canvas";

  $scope.startGame = function() {

    //Initilize Raycasts
    var height = $('#ray-intersection').height(),
      width = $('#ray-intersection').width();

    //FadeOut
    $('#what').fadeOut();

    //Set Width/Height for 3D Canvas
    $('#ttt-canvas').height(height);
    $('#ttt-canvas').width(width);

    //Fade in Raycast Code
    $('#ray-intersection').fadeIn();


    // notice the use of 'this'.  this refers to the controller $scope when this function is called
    // in normal JS callbacks you'd reference the values with 'var me = this'.  then reference 'me' in the callback function.
    var params = {
            dims: this.dims,
            userColor: this.usercolor,
            userName: this.username,
            userFirst: this.userfirst,
            canvasId: canvasId
          };

    ThreeEnv.init(params);

    $.event.trigger({
      type: "nextTurn",
    });

  }; //End Game Initilize

  //////////////////////////////////////////////////////////
  ///
  /// Access the THREE.js scene through the following API functions.
  ///
  /// You may also want to use this approach for the following types of 3D scene interactions:
  ///    - mouse interaction.
  ///    - toggle environment settings (rotation)
  ///    - CRUD operations relating to ng-scoped variables.
  ///
  //////////////////////////////////////////////////////////
  ///  Not sure if creating the following as directives would have been
  ///  a better option.  Needs more research.
  //////////////////////////////////////////////////////////

  //Toggle Wireframes
  $scope.toggleWireframes = function () {
    ThreeEnv.toggle("wireframes");
  };
  //Toggle Arrows
  $scope.toggleArrows = function () {
    ThreeEnv.toggle("arrows");
  };

  //Toggle Roation
  $scope.toggleRotate = function () {
    ThreeEnv.toggle("rotate");
  };


});
