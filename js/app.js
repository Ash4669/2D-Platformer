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

  var playerSpriteSpace = false;
  var playerSpriteAttack = true;

  var lastFacingLeft = false;

  //Initialising level

  // Appending step divs onto container
  for (var i = 1; i <= 10; i++) {
    container.append("<div id='step" + i + "' class='steps'></div>");
  }

  // First enemy
  container.append("<div id='enemy1' class='bats'></div>");

  // Level styling
  // Styling steps

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
    "top": "100px",
    "height": "80px",
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

  // Step document positions array
  var arrayStep = [[],[],[],[]];
  for (var i = 0; i < 10; i++) {

    var step = $("#step" + (i+1).toString())
    arrayStep[0].push( parseInt(step.css("top")) );
    arrayStep[1].push( parseInt(step.css("top")) + parseInt(step.css("Height")) );
    arrayStep[2].push( parseInt(step.css("left")) );
    arrayStep[3].push( parseInt(step.css("left")) + parseInt(step.css("width"))) ;
  }

  // Player
  var playerWidth = parseInt(playerSprite.css("width"));
  var playerHeight = parseInt(playerSprite.css("height"));
  var playerHealth = 6;

  // Health hearts
  var heart1 = $("#heart1");
  var heart2 = $("#heart2");
  var heart3 = $("#heart3");

  function healthBar() {
    if (playerHealth == 0) {
      heart1.attr("src","images/heart-empty.png");
      heart2.attr("src","images/heart-empty.png");
      heart3.attr("src","images/heart-empty.png");
      displayGameOver(playerSpriteY);
    }

    if (playerHealth == 1) {
      heart1.attr("src","images/heart-half.png");
      heart2.attr("src","images/heart-empty.png");
      heart3.attr("src","images/heart-empty.png");
    }
    if (playerHealth == 2) {
      heart1.attr("src","images/heart.png");
      heart2.attr("src","images/heart-empty.png");
      heart3.attr("src","images/heart-empty.png");
    }
    if (playerHealth == 3) {
      heart1.attr("src","images/heart.png");
      heart2.attr("src","images/heart-half.png");
      heart3.attr("src","images/heart-empty.png");
    }
    if (playerHealth == 4) {
      heart1.attr("src","images/heart.png");
      heart2.attr("src","images/heart.png");
      heart3.attr("src","images/heart-empty.png");
    }
    if (playerHealth == 5) {
      heart1.attr("src","images/heart.png");
      heart2.attr("src","images/heart.png");
      heart3.attr("src","images/heart-half.png");
    }
    if (playerHealth == 6) {
      heart1.attr("src","images/heart.png");
      heart2.attr("src","images/heart.png");
      heart3.attr("src","images/heart.png");
    }
  }

 var opac = 0;

  function displayGameOver(initialY) {
    clearInterval(interval);
    clearInterval(firstEnemy);

    setInterval(function () {

      if (playerSpriteY == initialY) {
        playerSpriteYVelocity = -10;
        container.append("<div id='gameOver'></div>");
        $("#gameOver").append("<div id='gameOverText'>YOU DIED</div>");

      }

      playerSpriteYVelocity += .57;
      playerSpriteY += playerSpriteYVelocity;

      if (playerSpriteY > 2000) {
        playerSprite.remove()
      }

      movePlayer();

      if (playerSpriteY > initialY + 1000 ) {
        $("#gameOver").css({
          "position": "absolute",
          "display": "flex",
          "justify-content": "center",
          "align-items": "center",
          "height": "100%",
          "width": "100%",
          "background-color": "black",
          "opacity": opac,
        });

        $("#gameOverText").css({
          "color": "red",
          "font-size": "69px",
          "font-family": "Times New Roman",
          "opacity": opac,

        });

        opac += 0.01;
      }
    }, 10);

  }

  var weaponLeft;
  var weaponRight;

  var rotation = 45;
  function playerAttack() {

    if (lastFacingLeft == false) {
      container.append("<div id='swordAttackRight'></div>");
      $("#swordAttackRight").css({
        "position": "absolute",
        "height": "30px",
        "width": "8px",
        "top": playerSpriteY + "px",
        "left": playerSpriteX + playerWidth - 5 + "px",
        "background-color": "blue",
        "transform": "rotate(45deg)",
        "transform-origin": "50% 90%",
      });

      // correction if they were facing the other direction (rotation is set to the other side)
      if (rotation < 0) {
        rotation = 45;
      }

      attack = setInterval(function(){

        $("#swordAttackRight").css({
          "transform": "rotate("+ rotation + "deg)",
          "top": playerSpriteY + "px",
          "left": playerSpriteX + playerWidth - 5 + "px",
        })

        // finding weapon edges for collision
        findWeapon($("#swordAttackRight"));


        rotation+=2;
        playerSpriteAttack = false;

        if (rotation == 135) {
          clearInterval(attack);
          $("#swordAttackRight").remove();
          playerSpriteAttack = true;
          rotation = 45;

          resetWeapon($("#swordAttackRight"));

        }
      },1);
    }

    if (lastFacingLeft == true) {
      container.append("<div id='swordAttackLeft'></div>");

      $("#swordAttackLeft").css({
        "position": "absolute",
        "height": "30px",
        "width": "8px",
        "top": playerSpriteY + "px",
        "left": playerSpriteX + "px",
        "background-color": "blue",
        "transform": "rotate(-45deg)",
        "transform-origin": "50% 90%",
      });

      // correction if they were facing the other direction (rotation is set to the other side)
      if (rotation > 0) {
        rotation = -45;
      }

      attack = setInterval(function(){

        $("#swordAttackLeft").css({
          "transform": "rotate("+ rotation + "deg)",
          "top": playerSpriteY + "px",
          "left": playerSpriteX -1.5 + "px",
        })

        rotation-=2;
        playerSpriteAttack = false;

        // finding weapon edges for collision
        findWeapon($("#swordAttackLeft"));

        if (rotation == -135) {
          $("#swordAttackLeft").remove();
          clearInterval(attack);
          playerSpriteAttack = true;
          rotation = -45;
          resetWeapon($("#swordAttackLeft"));

        }
      },1);
    }

  }

  function findWeapon(weaponPlace) {
    weaponLeft = playerSpriteX - 27.5;
    weaponRight = playerSpriteX + playerWidth + 27.5;
  }

  function resetWeapon(weaponPlace) {
    weaponLeft = 0;
    weaponRight = 0;
  }

  // Enemies
  $("#enemy1").css({
    "left": "670px",
    "top": "120px",
    "height": "20px",
    "width": "20px",
  });
  var enemy1 = $("#enemy1");

  var enemyXDirection = "-";
  var enemyYDirection = "+";

  var enemy1Object = {
    place: $("#enemy1"),
    bounding_divs: [$("#step7"),$("#step9")],
    X: parseInt(enemy1.css("left")),
    Y: parseInt(enemy1.css("top")),
    XDirection: "-",
    YDirection: "+",
  }

  var enemyTopOriginal = parseInt(enemy1Object.place.css("top"));
  var enemyTop;
  var enemyBottom;
  var enemyLeft;
  var enemyRight;
  var enemyWidth = parseInt(enemy1Object.place.css("width"));
  var enemyHeight = parseInt(enemy1Object.place.css("height"));

  function findEnemy(enemyObject) {
    enemyTop = parseInt(enemyObject.place.css("top"));
    enemyBottom = enemyTop + parseInt(enemyObject.place.css("height"));
    enemyLeft = parseInt(enemyObject.place.css("left"));
    enemyRight = enemyLeft + parseInt(enemyObject.place.css("width"));
  }

  function moveEnemy(enemyObject) {
    enemyObject.place.css({
      "top": enemyObject.Y + "px",
      "left": enemyObject.X + "px",
    })
  }

  // bats
  $(".bats").css({
    "position": "absolute",
    "background-color": "red",
  })

  function batMotion(enemyObject){

    findEnemy(enemyObject);

    if (enemyLeft < parseInt(enemyObject.bounding_divs[0].css("left")) + parseInt($("#step7").css("width")) + 20) {
      enemyObject.XDirection = "+";
    }
    if (enemyRight > parseInt(enemyObject.bounding_divs[1].css("left")) - 20) {
      enemyObject.XDirection = "-";
    }

    if (enemyObject.XDirection == "+") {
      enemyObject.X += 1;
    } else {
      enemyObject.X -= 1;
    }

    if (enemyTop > enemyTopOriginal + 15) {
      enemyObject.YDirection = "-";
    }
    if (enemyTop < enemyTopOriginal - 15) {
      enemyObject.YDirection = "+";
    }

    if (enemyObject.YDirection == "+") {
      enemyObject.Y += 0.45;
    } else {
      enemyObject.Y -= 0.45;
    }

    moveEnemy(enemyObject);
  }

  var zombiespeed = 0;
  var zombieVelocity = 0;
  var zombieLeftVelocity = 0;

  function zombieMotion(enemyObject){

    findEnemy(enemyObject);

    if (enemyLeft < parseInt(enemyObject.bounding_divs[0].css("left")) + parseInt($("#step7").css("width")) + 20) {
      enemyObject.XDirection = "+";
    }
    if (enemyRight > parseInt(enemyObject.bounding_divs[1].css("left")) - 20) {
      enemyObject.XDirection = "-";
    }

    if (enemyObject.XDirection == "+") {

      if (Math.abs(zombieLeftVelocity) < 0.1) {
        zombieLeftVelocity = +5.5;
      }

      if (Math.abs(zombieLeftVelocity) > 0.1) {

        zombieLeftVelocity -= 0.5;

        if (Math.abs(zombieLeftVelocity) < 1) {
          zombieLeftVelocity += 0.4;
        }
      }
      enemyObject.X += zombieLeftVelocity;
      moveEnemy(enemyObject);
    }
    if (enemyObject.XDirection == "-") {

      if (Math.abs(zombieVelocity) < 0.1) {
        zombieVelocity = -5.5;
      }

      if (Math.abs(zombieVelocity) > 0.1) {

        zombieVelocity += 0.5;

        if (Math.abs(zombieVelocity) < 1) {
          zombieVelocity -= 0.4;
        }
      }
      enemyObject.X += zombieVelocity;
      moveEnemy(enemyObject);
    }
  }

  function enemycollisions() {

    // Collision with left of enemy
    if (playerSpriteX + playerWidth > enemyLeft
      && playerSpriteX + playerWidth < enemyLeft + enemyWidth/2
      && playerSpriteY + playerHeight > enemyTop
      && playerSpriteY < enemyBottom
    ) {
      playerSpriteXVelocity = -5;
      playerSpriteYVelocity = -4;
      playerSpriteX = enemyLeft - playerWidth;
      playerHealth--;
      healthBar();
    }

    // Collision with right of enemy
    if (playerSpriteX < enemyRight
      && playerSpriteX > enemyRight - enemyWidth
      && playerSpriteY + playerHeight> enemyTop
      && playerSpriteY < enemyBottom
    ) {
      playerSpriteXVelocity = +5;
      playerSpriteYVelocity = -4;
      playerSpriteX = enemyRight;
      playerHealth--;
      healthBar();
    }

    // Collision with left of enemy
    if ( weaponRight > enemyLeft
      && weaponRight < enemyRight
      && playerSpriteY + playerHeight > enemyTop
      && playerSpriteY < enemyBottom
    ) {
      // Stops enemy movement
      clearInterval(firstEnemy);

      // Rewrites enemy position for collision if statement
      $("#enemy1").css({
        "left": "0px",
        "top": "0px",
      });
      findEnemy(enemy1Object);

      // Removes enemy
      $("#enemy1").remove();

    }

    // Collision with right of enemy
    if (weaponLeft < enemyRight
      &&  weaponLeft > enemyLeft
      && playerSpriteY + playerHeight > enemyTop
      && playerSpriteY < enemyBottom
    ) {

      // Stops enemy movement
      clearInterval(firstEnemy);

      // Rewrites enemy position for collision if statement
      $("#enemy1").css({
        "left": "0px",
        "top": "0px",
      });
      findEnemy(enemy1Object);

      // Removes enemy
      $("#enemy1").remove();
    }

  }

  // Game
   container.click(function(){
     if (paused) {

       // Unpause game next click
       paused = false;
       console.log("Paused");

       clearInterval(interval);
       clearInterval(firstEnemy);

       // Display pause menu

     } else {
       // Pause game next click
       paused = true;
       console.log("Playing");

       // Load game frame-wise
       interval = setInterval(loop, 10);

       var enemyType = "bat";

       if (enemyType == "bat") {
         firstEnemy = setInterval(function(){batMotion(enemy1Object)},10);

       }

       if (enemyType == "zombie") {
         firstEnemy = setInterval(function(){zombieMotion(enemy1Object)},100);

       }
     }
   })


   // Control responses
   function keyListener(event){

     var keyState = (event.type == "keydown")?true:false;

     switch (event.keyCode) {
       // Left key
       case 37:
       playerSpriteLeft = keyState;
       lastFacingLeft = true;
       break;

       // Up key
       case 38:
       playerSpriteUp = keyState;
       break;

       // Right key
       case 39:
       playerSpriteRight = keyState;
       lastFacingLeft = false;
       break;

       // Space key
       case 32:
       playerSpriteSpace = keyState;
       break


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

     enemycollisions();

     movePlayer();

     if (playerSpriteSpace && playerSpriteAttack) {

       playerAttack();

     }

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

    // Finding the step edges
    stepTop = arrayStep[0][i];
    stepBottom = arrayStep[1][i];
    stepLeft = arrayStep[2][i];
    stepRight = arrayStep[3][i];

    // Collision with left of step
    if (playerSpriteX + playerWidth > stepLeft
      && playerSpriteX + playerWidth < stepLeft + 5
      && playerSpriteY + playerHeight > stepTop
      && playerSpriteY < stepBottom
    ) {
      playerSpriteXVelocity = 0;
      playerSpriteX = stepLeft - playerWidth;
    }

    // Collision with right of step
    if (playerSpriteX < stepRight
      && playerSpriteX > stepRight - 5
      && playerSpriteY + playerHeight> stepTop
      && playerSpriteY < stepBottom
    ) {
      playerSpriteXVelocity = 0;
      playerSpriteX = stepRight;
    }

    // Collision with bottom of step
    if (playerSpriteY < stepBottom
      && playerSpriteY > stepBottom - 15
      && playerSpriteX + playerWidth > stepLeft
      && playerSpriteX < stepRight) {
        playerSpriteYVelocity = 0;
        playerSpriteY = stepBottom;
      }

    // Collision with top of step
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
