$(document).ready(function(){

  var hit = new Audio('sounds/hit.mp3');
  var dead = new Audio('sounds/YOUDIED.mp3');
   hit.currentTime = 0.30;
   dead.currentTime = 0.30;
   dead.loop = false;

   var music = new Audio('sounds/DespacitoVersion.mp3');
   music.currentTime = 1.5;
   music.volume = 0.0;
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
  var levelChange = false;
  //Initialising level


  var level = 1;
  var enemyType;
  var enemySelect;
  var enemyPlace;
  var secondEnemy;
  var enemy2TopOriginal;
  var enemy2Place;
  var enemy2Object = {};

  var enemyXDirection = "-";
  var enemyYDirection = "+";


  // Level styling
  // Styling steps

//////////////// LEVEL 1 /////////////////////
// Appending step divs onto container
for (var i = 1; i <= 10; i++) {
  container.append("<div id='step" + i + "' class='steps'></div>");
}
$(".steps").css({
  "position": "absolute",
  'background-image': 'url("images/stepfloor.png")'
});

$("#step1").css({
  "left": "440px",
  "top": "380px",
  "height": "20px",
  "width": "260px",
});

$("#step2").css({
  "left": "420px",
  "top": "300px",
  "height": "100px",
  "width": "20px",
});

$("#step3").css({
  "left": "220px",
  "top": "300px",
  "height": "20px",
  "width": "210px",
});

$("#step4").css({
  "left": "200px",
  "top": "200px",
  "height": "120px",
  "width": "20px",
});

$("#step5").css({
  "left": "0px",
  "top": "200px",
  "height": "20px",
  "width": "220px",
});

$("#step6").css({
  "left": "300px",
  "top": "100px",
  "height": "20px",
  "width": "100px",
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

// Creating door
container.append("<div id='door1' class='doors'></div>")

$(".doors").css({
  "position": "absolute",
  'background-image': 'url("images/door.png")'

})

$("#door1").css({
  "left": "745px",
  "top": "47px",
  "height": "53px",
  "width": "54px",
});

var door1Place = $("#door1");
var door1Width = parseInt(door1Place.css("width"));
var door1Height = parseInt(door1Place.css("height"));
var door1Top = parseInt(door1Place.css("top"));
var door1Bottom = door1Top + door1Height;
var door1Left = parseInt(door1Place.css("left"));
var door1Right = door1Left + door1Width;

// First enemy in level 1
container.append("<div id='enemy1'></div>");

$("#enemy1").css({
  "left": "670px",
  "top": "120px",
});

enemyPlace = $("#enemy1");

// Initial enemy generation
generateEnemy($("#enemy1"));



// Step document positions array
var arrayStep = [[],[],[],[]];
for (var i = 0; i < 10; i++) {

  var step = $("#step" + (i+1).toString())
  arrayStep[0].push( parseInt(step.css("top")) );
  arrayStep[1].push( parseInt(step.css("top")) + parseInt(step.css("Height")));
  arrayStep[2].push( parseInt(step.css("left")) );
  arrayStep[3].push( parseInt(step.css("left")) + parseInt(step.css("width")));
}

function buildLevel(level) {
  //Deleting everything////////////
  if (level == 2) {
    for (var i = 0; i < arrayStep[0].length; i++) {
      for (var j = 0; j < 4; j++) {
         arrayStep[j][i] = 0;
       }
       $("#step" + (i+1) ).remove();
       stepBlockCheck(i);
    }
    $("#door1").remove();
    door1Top = 0;
    door1Bottom = 0;
    door1Left = 0;
    door1Right = 0;

    // Stops enemy movement
    clearInterval(firstEnemy);

    // Rewrites enemy position for collision if statement
    $("#enemy1").css({
      "left": "-30px",
      "top": "-30px",
    });
    findEnemy(enemy1Object);

    // Removes enemy
    $("#enemy1").remove();

    // Making everything again_________________________________
    for (var i = 1; i <= 7; i++) {
      container.append("<div id='step" + i + "' class='steps'></div>");
    }
    $(".steps").css({
      "position": "absolute",
      'background-image': 'url("images/stepfloor.png")'
    });

    $("#step1").css({
      "left": "620px",
      "top": "100px",
      "height": "20px",
      "width": "180px",
    });

    $("#step2").css({
      "left": "600px",
      "top": "100px",
      "height": "200px",
      "width": "20px",
    });

    $("#step3").css({
      "left": "0px",
      "top": "200px",
      "height": "100px",
      "width": "40px",
    });

    $("#step4").css({
      "left": "0px",
      "top": "380px",
      "height": "20px",
      "width": "700px",
    });

    $("#step5").css({
      "left": "180px",
      "top": "280px",
      "height": "20px",
      "width": "420px",
    });

    $("#step6").css({
      "left": "110px",
      "top": "200px",
      "height": "100px",
      "width": "100px",
    });

    $("#step7").css({
      "left": "700px",
      "top": "280px",
      "height": "120px",
      "width": "40px",
    });

    levelChange = false;
    console.log("here");

    arrayStep = [[],[],[],[]];

    for (var i = 0; i < 7; i++) {

      var step = $("#step" + (i+1).toString())
      arrayStep[0].push( parseInt(step.css("top")) );
      arrayStep[1].push( parseInt(step.css("top")) + parseInt(step.css("Height")));
      arrayStep[2].push( parseInt(step.css("left")) );
      arrayStep[3].push( parseInt(step.css("left")) + parseInt(step.css("width")));
    }

    container.append("<div id='door1' class='doors'></div>")

    $(".doors").css({
      "position": "absolute",
    })

    $("#door1").css({
      "left": "20px",
      "top": "417px",
      "height": "53px",
      "width": "54px",
      'background-image': 'url("images/door.png")'
    });

    door1Place = $("#door1");
    door1Top = parseInt(door1Place.css("top"));
    door1Bottom = door1Top + door1Height;
    door1Left = parseInt(door1Place.css("left"));
    door1Right = door1Left + door1Width;


    // First enemy in level
    container.append("<div id='enemy1'></div>");

    $("#enemy1").css({
      "left": "470px",
      "top": "220px",
    });

    generateEnemy($("#enemy1"));

    enemyTopOriginal = parseInt($("#enemy1").css("top"));

    enemyPlace = $("#enemy1");

    enemy1Object = {
      place: enemyPlace,
      bounding_divs: [$("#step6"),$("#step2")],
      X: parseInt(enemyPlace.css("left")),
      Y: parseInt(enemyPlace.css("top")),
      XDirection: "-",
      YDirection: "+",
    }

    initialiseEnemy(enemy1Object,enemyTopOriginal,1);

    // Second enemy in level
    container.append("<div id='enemy2'></div>");

    $("#enemy2").css({
      "left": "470px",
      "top": "420px",
    });

    generateEnemy($("#enemy2"));

    enemy2TopOriginal = parseInt($("#enemy2").css("top"));

    enemy2Place = $("#enemy2");

    enemy2Object = {
      place: enemy2Place,
      bounding_divs: [$("#step6"),$("#step2")],
      X: parseInt(enemyPlace.css("left")),
      Y: parseInt(enemyPlace.css("top")),
      XDirection: "-",
      YDirection: "+",
    }
  }

  initialiseEnemy(enemy2Object,enemy2TopOriginal,2);


  if (level == 3) {
    for (var i = 0; i < arrayStep[0].length; i++) {
      for (var j = 0; j < 4; j++) {
         arrayStep[j][i] = 0;
       }
       $("#step" + (i+1) ).remove();
       stepBlockCheck(i);
    }
    $("#door1").remove();
    door1Top = 0;
    door1Bottom = 0;
    door1Left = 0;
    door1Right = 0;

    // Stops enemy movement
    clearInterval(firstEnemy);

    // Rewrites enemy position for collision if statement
    $("#enemy1").css({
      "left": "-30px",
      "top": "-30px",
    });
    findEnemy(enemy1Object);

    // Removes enemy
    $("#enemy1").remove();

    // Stops enemy movement
    clearInterval(firstEnemy);

/////////////////// LEVEL 3 /////////
    for (var i = 1; i <= 11; i++) {
      container.append("<div id='step" + i + "' class='steps'></div>");
    }
    $(".steps").css({
      "position": "absolute",
      'background-image': 'url("images/stepfloor.png")'
    });

    $("#step1").css({
      "left": "200px",
      "top": "450px",
      "height": "20px",
      "width": "20px",
    });

    $("#step2").css({
      "left": "220px",
      "top": "430px",
      "height": "40px",
      "width": "20px",
    });

    $("#step3").css({
      "left": "240px",
      "top": "410px",
      "height": "60px",
      "width": "20px",
    });

    $("#step4").css({
      "left": "260px",
      "top": "390px",
      "height": "80px",
      "width": "20px",
    });

    $("#step5").css({
      "left": "280px",
      "top": "370px",
      "height": "100px",
      "width": "20px",
    });

    $("#step6").css({
      "left": "300px",
      "top": "350px",
      "height": "120px",
      "width": "20px",
    });

    $("#step7").css({
      "left": "320px",
      "top": "330px",
      "height": "140px",
      "width": "20px",
    });

    $("#step8").css({
      "left": "340px",
      "top": "310px",
      "height": "160px",
      "width": "20px",
    });

    $("#step9").css({
      "left": "360px",
      "top": "290px",
      "height": "180px",
      "width": "20px",
    });

    $("#step10").css({
      "left": "380px",
      "top": "270px",
      "height": "200px",
      "width": "20px",
    });

    $("#step11").css({
      "left": "400px",
      "top": "250px",
      "height": "220px",
      "width": "400px",
    });
    levelChange = false;

    arrayStep = [[],[],[],[]];

    for (var i = 0; i < 11; i++) {

      var step = $("#step" + (i+1).toString())
      arrayStep[0].push( parseInt(step.css("top")) );
      arrayStep[1].push( parseInt(step.css("top")) + parseInt(step.css("Height")));
      arrayStep[2].push( parseInt(step.css("left")) );
      arrayStep[3].push( parseInt(step.css("left")) + parseInt(step.css("width")));
    }

  }
  console.log(level);
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
      music.pause();

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
        $("#gameOver").append("<div id='gameOverText'></div>");

      }

      playerSpriteYVelocity += .57;
      playerSpriteY += playerSpriteYVelocity;

      if (playerSpriteY > 2000) {
        playerSprite.remove()
      }

      movePlayer();

      if (playerSpriteY > initialY + 1500 ) {
        dead.play();
        $("#gameOver").css({
          "position": "absolute",
          "display": "flex",
          "justify-content": "center",
          "align-items": "center",
          "height": "30%",
          "margin": "170px 0%",
          "width": "100%",
          "background-image": "linear-gradient( rgba(0,0,0,0), rgba(0,0,0,0.75), rgba(0,0,0,0.90), rgba(0,0,0,0.95), rgba(0,0,0,0.95), rgba(0,0,0,0.95), rgba(0,0,0,0.95) , rgba(0,0,0,0.90), rgba(0,0,0,0.75), rgba(0,0,0,0)",
          "opacity": opac,
        });
        $("#gameOverText").html("YOU DIED")

        $("#gameOverText").css({
          "color": "red",
          "font-size": "69px",
          "font-family": "Times New Roman",
          "opacity": opac,
        });
        opac += 0.005;
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
        "left": playerSpriteX + playerWidth + "px",
        "transform": "rotate(45deg)",
        "transform-origin": "50% 90%",
        "content": " attr('../images/buster_sword.jpg')",
        'background-image': 'url("images/buster_sword_right.jpg")'
      });

      // correction if they were facing the other direction (rotation is set to the other side)
      if (rotation < 0) {
        rotation = 45;
      }

      attack = setInterval(function(){

        $("#swordAttackRight").css({
          "transform": "rotate("+ rotation + "deg)",
          "top": playerSpriteY + "px",
          "left": playerSpriteX + playerWidth + "px",
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
        "transform": "rotate(-45deg)",
        "transform-origin": "50% 90%",
        'background-image': 'url("images/buster_sword_left.jpg")'
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
    weaponLeft = playerSpriteX - 22.5;
    weaponRight = playerSpriteX + playerWidth + 22.5;
  }

  function resetWeapon(weaponPlace) {
    weaponLeft = 0;
    weaponRight = 0;
  }

  // Enemies
  function generateEnemy(enemylocation) {
    enemySelect = Math.floor((Math.random() * 2) + 1);
    if (enemySelect == 1) {
      enemyType = "bat";

      enemylocation.css({
        "position": "absolute",
        "height": "20px",
        "width": "20px",
        'background-image': 'url("images/bat_left.png")'
      });
    }

    if (enemySelect == 2) {
      enemyType = "zombie";
      enemylocation.css({
        "position": "absolute",
        "top": parseInt($("#enemy1").css("top")) + 20 + "px",
        "height": "40px",
        "width": "20px",
        'background-image': 'url("images/zombie_left.png")'
      });
    }
  }

// Initial enemy function
function initialiseEnemy(enemies,enemyTopOrig,number) {

  if (number == 1) {
    if (enemyType == "bat") {

      firstEnemy = setInterval(function(){batMotion(enemies, enemyTopOrig)},10);
    }

    if (enemyType == "zombie") {

      firstEnemy = setInterval(function(){zombieMotion(enemies)},100);
    }
  }
  if (number == 2) {
    if (enemyType == "bat") {

      secondEnemy = setInterval(function(){batMotion(enemies, enemyTopOrig)},10);
    }

    if (enemyType == "zombie") {

      secondEnemy = setInterval(function(){zombieMotion(enemies)},100);
    }
  }
}

  var enemy1Object = {
    place: enemyPlace,
    bounding_divs: [$("#step7"),$("#step9")],
    X: parseInt(enemyPlace.css("left")),
    Y: parseInt(enemyPlace.css("top")),
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
  function batMotion(enemyObject, enemyTopOrig){

    findEnemy(enemyObject);

    if (enemyLeft < parseInt(enemyObject.bounding_divs[0].css("left")) + parseInt(enemyObject.bounding_divs[0].css("width")) + 20) {
      enemyObject.XDirection = "+";
      enemyObject.place.css({
        'background-image': 'url("images/bat_right.png")'
      });
    }
    if (enemyRight > parseInt(enemyObject.bounding_divs[1].css("left")) - 20) {
      enemyObject.XDirection = "-";
      enemyObject.place.css({
        'background-image': 'url("images/bat_left.png")'
      });
    }

    if (enemyObject.XDirection == "+") {
      enemyObject.X += 1;
    } else {
      enemyObject.X -= 1;
    }

    if (enemyTop > enemyTopOrig + 15) {
      enemyObject.YDirection = "-";
    }
    if (enemyTop < enemyTopOrig - 15) {
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

    if (enemyLeft < parseInt(enemyObject.bounding_divs[0].css("left")) + parseInt(enemyObject.bounding_divs[0].css("width")) + 20) {
      enemyObject.XDirection = "+";
      enemyObject.place.css({
        'background-image': 'url("images/zombie_right.png")'
      });
    }
    if (enemyRight > parseInt(enemyObject.bounding_divs[1].css("left")) - 20) {
      enemyObject.XDirection = "-";
      enemyObject.place.css({
        'background-image': 'url("images/zombie_left.png")'
      });
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
      hit.play();
      hit.currentTime = 0.30;
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
      hit.play();
      hit.currentTime = 0.30;

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
       music.pause();

       // Display pause menu

     } else {
       // Pause game next click
       paused = true;
       console.log("Playing");

       // Load game frame-wise
       interval = setInterval(loop, 10);

       initialiseEnemy(enemy1Object,enemyTopOriginal,1);
       setTimeout(function(){ music.play()}, 1);
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

function changeDirection() {
  if (lastFacingLeft == true) {
           $('#playerSprite').css({'background-image': 'url("images/player_left.png")'})
  } else if (lastFacingLeft == false) {
       $('#playerSprite').css({'background-image': 'url("images/player_right.png")'})
  }
}

   function loop(){

     // Door collisions
     doorCheck();

     if (playerSpriteUp && playerSpriteJump == false) {

       playerSpriteYVelocity = -10;
       playerSpriteJump = true;


     }

     if (playerSpriteLeft) {

       playerSpriteXVelocity -= 0.4;
       changeDirection();

     }

     if (playerSpriteRight) {

       playerSpriteXVelocity += 0.4;
       changeDirection();

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

    function doorCheck() {
      // Collision with left of door

      if (playerSpriteUp
        && playerSpriteX + playerWidth > door1Left
        && playerSpriteX + playerWidth < door1Left + door1Width
        && playerSpriteY + playerHeight > door1Top
        && playerSpriteY < door1Bottom) {
          level++
          levelChange = true;
          if (levelChange) {
            buildLevel(level);
          }
        }

        // Collision with right of door
        if (playerSpriteUp
          && playerSpriteX < door1Right
          && playerSpriteX > door1Right - door1Width
          && playerSpriteY + playerHeight > door1Top
          && playerSpriteY < door1Bottom) {
            level++
            levelChange = true;
            if (levelChange) {
              buildLevel(level);
            }
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
