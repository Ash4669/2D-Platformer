$(document).ready(function(){

  // Initialising links
  var playerSprite = $("#playerSprite");
  var container = $("#container");

  // Pause
  var paused = false;

  // Player position
  var playerSpriteX = 10;
  var playerSpriteY = 415;

  // Player velocity
  var playerSpriteXVelocity = 0;
  var playerSpriteYVelocity = 0;

  // Player movement
  var playerSpriteLeft = false;
  var playerSpriteRight = false;
  var playerSpriteUp = false;
  var playerSpriteJump = true;

  //Initialising level

  for (var i = 1; i <= 10; i++) {
    container.append("<div id='step" + i + "'></div>");
    $("#step" + i).addClass("steps");
  }

  // Level styling

  $(".steps").css({
    "position": "absolute",
    "background-color": "violet",
  });

  $("#step1").css({
    "left": "450px",
    "top": "385px",
    "height": "20px",
    "width": "250px",
  });

  $("#step2").css({
    "left": "430px",
    "top": "300px",
    "height": "105px",
    "width": "20px",
  });

  $("#step3").css({
    "left": "230px",
    "top": "300px",
    "height": "20px",
    "width": "210px",
  });

  $("#step4").css({
    "left": "210px",
    "top": "200px",
    "height": "120px",
    "width": "20px",
  });

  $("#step5").css({
    "left": "0px",
    "top": "200px",
    "height": "20px",
    "width": "230px",
  });

  $("#step6").css({
    "left": "310px",
    "top": "100px",
    "height": "20px",
    "width": "90px",
  });

  $("#step7").css({
    "left": "380px",
    "top": "120px",
    "height": "60px",
    "width": "20px",
  });

  $("#step8").css({
    "left": "380px",
    "top": "180px",
    "height": "20px",
    "width": "350px",
  });

  $("#step9").css({
    "left": "720px",
    "top": "100px",
    "height": "100px",
    "width": "20px",
  });

  $("#step10").css({
    "left": "720px",
    "top": "100px",
    "height": "20px",
    "width": "80px",
  });


  var playerWidth = parseInt(playerSprite.css("width"));
  var playerHeight = parseInt(playerSprite.css("height"));

  var arrayStep = [[],[],[],[]];
  for (var i = 0; i < 10; i++) {

    var step = $("#step" + (i+1).toString())
    arrayStep[0].push( parseInt(step.css("top")) );
    arrayStep[1].push( parseInt(step.css("top")) + parseInt(step.css("Height")) );
    arrayStep[2].push( parseInt(step.css("left")) );
    arrayStep[3].push( parseInt(step.css("left")) + parseInt(step.css("width"))) ;
  }

  // Game
   container.click(function(){
     if (paused) {

       // Unpause game next click
       paused = false;
       console.log("Paused");

       clearInterval(interval)

       // Display pause menu

     } else {
       // Pause game next click
       paused = true;
       console.log("Playing");

       // Load game frame-wise
       interval = setInterval(loop, 10);

     }
   })


   // Control responses
   function keyListener(event){

     var keyState = (event.type == "keydown")?true:false;

     switch (event.keyCode) {
       // Left key
       case 37:
       playerSpriteLeft = keyState;

       // Up key
       break;
       case 38:
       playerSpriteUp = keyState;
       break;

       // Right key
       case 39:
       playerSpriteRight = keyState;
       break;
     }
   }

   function loop(){

     if (playerSpriteUp && playerSpriteJump == false) {

       playerSpriteYVelocity = -10;
       playerSpriteJump = true;

     }

     if (playerSpriteLeft) {

       playerSpriteXVelocity -= 0.4;

     }

     if (playerSpriteRight) {

       playerSpriteXVelocity += 0.4;

     }

     playerSpriteYVelocity += .4;
     playerSpriteX += playerSpriteXVelocity;
     playerSpriteY += playerSpriteYVelocity;
     playerSpriteXVelocity *= 0.9;


     if (playerSpriteY > 500 - 30 - 55) {
       playerSpriteJump = false;
       playerSpriteY = 500 - 30 - 55;
       playerSpriteYVelocity = 0;
     }

     boundaries()

     for (var i = 0; i < arrayStep[0].length; i++) {
       stepBlockCheck(i);
     }

     movePlayer();

   }

  // Movement of the playerSprite
  function movePlayer(){
    playerSprite.css({
      'left': playerSpriteX + "px",
      'top': playerSpriteY + "px"
    })
  }

  function boundaries() {

    if (playerSpriteX < 0) {
      playerSpriteX = 0;
      playerSpriteXVelocity = 0;
    }

    if (playerSpriteX > 800 - playerWidth) {
      playerSpriteX = 800 - playerWidth;
      playerSpriteXVelocity = 0;
    }

    if (playerSpriteY < 0) {
      playerSpriteY = 0;
      playerSpriteYVelocity = 0;
    }

    if (playerSpriteY > 800 - playerHeight) {
      playerSpriteY = 800 - playerHeight;
      playerSpriteYVelocity = 0;
    }

  }

  function stepBlockCheck(i){

    stepTop = arrayStep[0][i];
    stepBottom = arrayStep[1][i];
    stepLeft = arrayStep[2][i];
    stepRight = arrayStep[3][i];

    if (playerSpriteX + playerWidth > stepLeft
      && playerSpriteX + playerWidth < stepLeft + 5
      && playerSpriteY + playerHeight > stepTop
      && playerSpriteY < stepBottom
    ) {
      playerSpriteXVelocity = 0;
      playerSpriteX = stepLeft - playerWidth;
    }

    if (playerSpriteX < stepRight
      && playerSpriteX > stepRight - 5
      && playerSpriteY + playerHeight> stepTop
      && playerSpriteY < stepBottom
    ) {
      playerSpriteXVelocity = 0;
      playerSpriteX = stepRight;
    }

    if (playerSpriteY < stepBottom
      && playerSpriteY > stepBottom - 15
      && playerSpriteX + playerWidth > stepLeft
      && playerSpriteX < stepRight) {
        playerSpriteYVelocity = 0;
        playerSpriteY = stepBottom;
      }

      if (playerSpriteY + playerHeight > stepTop -1
        && playerSpriteY + playerHeight < stepTop + 15
        && playerSpriteX < stepRight
        && playerSpriteX + playerWidth> stepLeft){
          playerSpriteYVelocity = 0;
          playerSpriteY = stepTop - playerHeight - 1;
          playerSpriteJump = false;

        }
      }


  document.addEventListener('keydown', keyListener);
  document.addEventListener('keyup', keyListener);

});
