addEventListener("load", (event) => {  




  const font = new FontFace('MyFont', 'url(https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap)');
const canvas = document.getElementById('layer1');
const ctxLayer1 = canvas.getContext("2d");
const canvas2 = document.getElementById('layer2');
const ctxLayer2 = canvas2.getContext("2d");
///Will stretch if window is resized, until refresh. 
 canvas.width = document.documentElement.clientWidth * 1;
 canvas.height = document.documentElement.clientHeight * 0.78;
//document.querySelector("canvas").style.backgroundColor = "red";
canvas2.width = document.documentElement.clientWidth * 1;
canvas2.height = document.documentElement.clientHeight * 0.78;

var canvasTopYAxis = Math.floor(document.documentElement.clientHeight * 0.11);
var canvasBottomYAxis = Math.floor(document.documentElement.clientHeight * 0.78);
ctxLayer1.globalAlpha = 1.0; // Stop colors blending with background
ctxLayer2.globalAlpha = 1.0;
const coinImg = new Image();
coinImg.src = "imgs/coin.png";








class TEXTSTYLE {
  constructor(
    fontName,
    fontSize,
    color,
    hasBoarder,
    borderWidth,
    borderColor,
    hasShadow,
    shadowColor,
    shadowSize,
    shadowOffsetX,
    shadowOffsetY
  ) {
    this.fontName = fontName; //EX: "40px 'Permanent Marker'"
    this.fontSize = fontSize;
    this.color = color;
    this.hasBoarder = hasBoarder;
    this.borderWidth = borderWidth;
    this.borderColor = borderColor;
    this.hasShadow = hasShadow;
    this.shadowColor = shadowColor;
    this.shadowSize = shadowSize;
    this.shadowOffsetX = shadowOffsetX;
    this.shadowOffsetY = shadowOffsetY;
    this.previousSize = fontSize;
  }
  updateSize(newPXSize){
    this.fontSize = newPXSize;
    let numLength = 0;
    let oldNumAsString = "";
    for (let i = 0; !isNaN(parseInt(this.fontName[i])); i++) {
      oldNumAsString += this.fontName[i];
      numLength++;
    }
    this.previousSize = parseInt(oldNumAsString);
    this.fontName = this.fontName.slice(numLength, this.fontName.length);
    this.fontName = newPXSize + this.fontName;
  }
  revertSize(){
    this.fontSize = this.previousSize;
    let numLength = 0;
    for (let i = 0; !isNaN(parseInt(this.fontName[i])); i++) {
      numLength++;
    }
     this.fontName = this.fontName.slice(numLength, this.fontName.length);
    this.fontName = this.previousSize + this.fontName;
  }
}

var makerStyle = new TEXTSTYLE(
  "40px 'Permanent Marker'", ///You can change size in the font name. And that will change the text size. No errors works fine.
  40, ///Could use a way to set this automatically based on the first prompt, but too complicated.
  "#fcf259",
  true,
  10,
  "#9c1d2c",
  false,
  0,
  0,
  0,
  0
);

//// Event listeners \\\\
///Absoluting nessary to store lastPos's indivuadlly. 
class TEXT { //Used so last positons can be saved, and used with the
                //with the textHandler.
  constructor(text){
    this.text = text.toString();
    this.lastPosX = -1000;
    this.lastPosY = -1000;
  }
}

 /*  document.fonts.load(styleObj.fontName).then(() => {
}); */


///Used both TEXT and TEXTSTYLE, takes the cords and the canvas to print on.
///Send the shorthand to the canvas aka the draw context one. 
 function TextHandler(textObj,styleObj,x,y,canvas,fontSize){
  document.fonts.load(styleObj.fontName).then(() => {
  
    ///First time text object is used by the handler. 
    if (textObj.lastPosX == -1000 && textObj.lastPosY == -1000) {
    lastPosXText = x;
    lastPosYText = y;

  }

  ///Set the size.

    let numLength = 0;
    let numAsString = "";
    for (let i = 0; !isNaN(parseInt(styleObj.fontName[i])); i++) {
      numAsString += styleObj.fontName[i];
      numLength++;
    }
    holderFont = fontSize + styleObj.fontName.slice(numLength, styleObj.fontName.length);

  ///This gets the width of the text.
  let textWidth = canvas.measureText(textObj.text).width;

  
///Super fine tuned. This will clear the last pos of the text.

/* canvas.clearRect(
  Math.floor(textObj.lastPosX - styleObj.fontSize * 0.2),
  Math.floor(textObj.lastPosY - styleObj.fontSize * 0.9),
  Math.floor(textWidth + styleObj.fontSize * 0.4),
  Math.floor(styleObj.fontSize * 1.1)
); */

///Updates last position 
textObj.lastPosX = x;
textObj.lastPosY = y;


  ///Applying styles
  canvas.font = holderFont;
  canvas.fillStyle = styleObj.color;
  if (styleObj.hasBoarder) {
    canvas.strokeStyle = styleObj.borderColor;
    canvas.lineWidth = styleObj.borderWidth;
  }
  if (styleObj.hasShadow) {
    canvas.shadowColor = styleObj.shadowColor;
    canvas.shadowOffsetX = styleObj.shadowOffsetX;
    canvas.shadowOffsetY = styleObj.shadowOffsetY;
    canvas.shadowBlur = styleObj.shadowSize;
  }
  else {
    canvas.shadowColor = "transparent";
    canvas.shadowOffsetX = 0;
    canvas.shadowOffsetY = 0;
    canvas.shadowBlur = 0;
  }


  //Renders
  if(styleObj.hasBoarder){canvas.strokeText(textObj.text,x,y + styleObj.fontSize);}
  canvas.fillText(textObj.text,x,y + styleObj.fontSize);
  
});

} 

/// Mouse, updates the mouse object
document.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = Math.floor(event.clientY - canvasTopYAxis);
}); 

document.addEventListener("mousedown", () => {
  mouse.down = true;
}); 

document.addEventListener("mouseup", () => {
  mouse.down = false;
}); 


/// Keydown, updates the keyPress object
document.addEventListener("keydown", (event) => {});
onkeydown = (event) => {
  var key = event.key;
  switch (key) {
    case "w":
      keyPress.w = true;
      break;
    case "a":
      keyPress.a = true;
      break;
    case "s":
      keyPress.s = true;
      break;
    case "d":
      keyPress.d = true;
      break;
    case "f":
      keyPress.f = true;
      break;
    case "1":
      keyPress.one = true;
      break;
    case "2":
      keyPress.two = true;
      break;
    case "3":
      keyPress.three = true;
      break;
    case "4":
      keyPress.four = true;
      break;
    case "5":
      keyPress.five = true;
      break;
    default:
      break;
  }
};


///Keyup, updates the keyPress object
document.addEventListener("keyup", (event) => {});
onkeyup = (event) => {
  var key = event.key;
  switch (key) {
    case "w":
      keyPress.w = false;
      break;
    case "a":
      keyPress.a = false;
      break;
    case "s":
      keyPress.s = false;
      break;
    case "d":
      keyPress.d = false;
      break;
    case "f":
      keyPress.f = false;
      break;
    case "1":
      keyPress.one = false;
      break;
    case "2":
      keyPress.two = false;
      break;
    case "3":
      keyPress.three = false;
      break;
    case "4":
      keyPress.four = false;
      break;
    case "5":
      keyPress.five = false;
      break;
    default:
      break;
  }
};

/// Updated by the event listeners.
var keyPress = {
    w: false,
    a: false,
    s: false,
    d: false,
    f: false,
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
};

//// Objects \\\\

function imageRender(source,x,y) {
  theImage = new Image();
  theImage.src = source;
  ctxLayer1.drawImage(theImage,x,y)
}

///Used to create player and CHARACTERs and such. 

class CHARACTER {
  constructor(x, y, width, height, speed, color, backUpImage) {
    this.x = x;
    this.y = y;
    this.toMove = x;
    this.toMove = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.color = color;
    this.lastPosX = 0;
    this.lastPosY = 0;
    this.targetIndex = 0;
    this.img = new Image();
    this.imgSrc = " ";
    ///Used if the gif doesn't load a frame.
    this.backUpImage = new Image(this.widthBP, this.heightBP);
    if (backUpImage != undefined) {
      this.backUpImage.src = backUpImage;
    }
    this.frames = 0;
    this.currentFrame = 0;
    this.hasGravity = false;
    this.gravityAffected = false;
    this.isList = false;

    ///collision stuff
    this.collisions = [];
    this.isCollision = false;

    ////stuff for rendering cords
    this.objCordsText = new TEXT(
      "X: " + Math.floor(this.x) + " Y: " + Math.floor(this.y)
    );
  }

  updateMovementKeyboard(objListToPush) {
    var outOfBouncelock = false;
    if (this.y + this.height > canvasBottomYAxis) {
      outOfBouncelock = true;
      this.y = canvasBottomYAxis - this.height;
    }
    if (this.y < 0) {
      outOfBouncelock = true;
      this.y = 0;
    }
    if (this.x < 0) {
      outOfBouncelock = true;
      this.x = 0;
    }
    if (this.x + this.width > canvas.width) {
      outOfBouncelock = true;
      this.x = canvas.width - this.width;
    }

    ///This code will only run if the oject is not out of bounce.
    if (!outOfBouncelock) {
      var rayCastHolder = ["blank", -1];
      if (keyPress.w == true) {
        this.velocityY -= this.speed * deltaTime.time;
        rayCastHolder = rayCaster(
          this,
          "top",
          Math.abs(this.velocityY) * 2,
          false
        );
        if (rayCastHolder.index > -1) {
          objListToPush.array[rayCastHolder.index]["y"] += this.velocityY;
          this.y =
            objListToPush.array[rayCastHolder.index]["y"] +
            objListToPush.array[rayCastHolder.index]["height"] -
            1;
          this.velocityY = 0;
        }
      }
      if (keyPress.a == true) {
        ///good one
        this.velocityX -= this.speed * deltaTime.time;
        rayCastHolder = rayCaster(
          this,
          "left",
          Math.abs(this.velocityX) * 2,
          false
        );
        if (rayCastHolder.index > -1) {
          objListToPush.array[rayCastHolder.index]["x"] += this.velocityX;
          this.x =
            objListToPush.array[rayCastHolder.index]["x"] +
            objListToPush.array[rayCastHolder.index]["width"] -
            1;
          this.velocityX = 0;
        }
      }
      if (keyPress.s == true) {
        this.velocityY += this.speed * deltaTime.time;
        rayCastHolder = rayCaster(
          this,
          "bottom",
          Math.abs(this.velocityY) * 2,
          false
        );
        if (rayCastHolder.index > -1) {
          objListToPush.array[rayCastHolder.index]["y"] += this.velocityY;
          this.y =
            objListToPush.array[rayCastHolder.index]["y"] - this.height - 1;
          this.velocityY = 0;
        }
      }
      if (keyPress.d == true) {
        this.velocityX += this.speed * deltaTime.time;
        rayCastHolder = rayCaster(
          this,
          "right",
          Math.abs(this.velocityX) * 2,
          false
        );
        if (rayCastHolder.index > -1) {
          objListToPush.array[rayCastHolder.index]["x"] += this.velocityX;
          this.x =
            objListToPush.array[rayCastHolder.index]["x"] - this.width - 1;
          this.velocityX = 0;
        }
      }

      ///Normalizes diagnonal movement, so its not faster.
      if (this.velocityX !== 0 && this.velocityY !== 0) {
        this.velocityX * 0.6;
        this.velocityY * 0.6;
      }
    }

    ///Applies the velocity to the position.
    this.x += this.velocityX;
    this.y += this.velocityY;

    ///Resets velocity
    this.velocityX = 0;
    this.velocityY = 0;
  }

  renderObj(isImage, isGif) {
    if (!isImage && !isGif) {
      /* ctxLayer1.clearRect(this.lastPosX, this.lastPosY, this.width, this.height); */
      this.lastPosX = this.x;
      this.lastPosY = this.y;
      ctxLayer1.fillRect(this.lastPosX, this.lastPosY, this.width, this.height);
    }
    if (isImage) {
      /* ctxLayer1.clearRect(this.lastPosX, this.lastPosY, this.width, this.height); */
      this.lastPosX = this.x;
      this.lastPosY = this.y;
      image.src = this.imgSrc;
      ctxLayer1.drawImage(image.src, this.x, this.y);
    }
    if (this.currentFrame > this.frames - 1) {
      this.currentFrame = 0;
    }
    if (isGif) {
      /*  ctxLayer1.clearRect(this.lastPosX, this.lastPosY, this.width, this.height); */
      this.lastPosX = this.x;
      this.lastPosY = this.y;
      this.currentFrame++;
      this.imgSrc =
        "imgs/obamaFrames/obama-" + this.currentFrame.toString() + ".png";
      this.img.src = this.imgSrc;
      if (this.img.complete && this.img.naturalWidth !== 0) {
        ctxLayer1.drawImage(this.img, this.x, this.y);
      } else {
        ctxLayer1.drawImage(this.backUpImage, this.x, this.y);
      }
    }
  }

  moveTowardsTargetObject(object) {
    ///Nothing will run if outOfBounce is true in this function,
    ///Except what is below.
    var outOfBouncelock = false;
    if (this.y + this.height > canvasBottomYAxis) {
      outOfBouncelock = true;
      this.y = canvasBottomYAxis - this.height;
    }
    if (this.y < 0) {
      outOfBouncelock = true;
      this.y = 0;
    }
    if (this.x < 0) {
      outOfBouncelock = true;
      this.x = 0;
    }
    if (this.x + this.width > canvas.width) {
      outOfBouncelock = true;
      this.x = canvas.width - this.width;
    }

    if (!outOfBouncelock) {
      if (object.isList) {
        console.log("step 1");

        ///Stops the CHARACTER from bouncing around when it gets close to the target.
        ///Way better than last solution.
        if (Math.abs(object.array[this.targetIndex]["x"] - this.x) < 5) {
          this.x = object.array[this.targetIndex]["x"];
        }
        if (Math.abs(object.array[this.targetIndex]["y"] - this.y) < 5) {
          this.y = object.array[this.targetIndex]["y"];
        }

        ///Coin collection
        if (
          object.array[this.targetIndex]["x"] == this.x &&
          object.array[this.targetIndex]["y"] == this.y
        ) {
          ///call a seprate function here.
          this.targetNewRanObjectInList(object);
        }

        ///If the object is a list.
        if (this.targetIndex <= object.arrayLength) {
          console.log("step 2");
          if (this.targetIndex < object.arrayLength) {
            console.log("step 3");
            ///Diagonal movement
            let lock = false;
            if (
              object.array[this.targetIndex]["x"] < this.x &&
              object.array[this.targetIndex]["y"] < this.y &&
              !lock
            ) {
              this.velocityY -= this.speed * deltaTime.time;
              this.velocityX -= this.speed * deltaTime.time;
              lock = true;
            }
            if (
              object.array[this.targetIndex]["x"] > this.x &&
              object.array[this.targetIndex]["y"] < this.y &&
              !lock
            ) {
              this.velocityY -= this.speed * deltaTime.time;
              this.velocityX += this.speed * deltaTime.time;
              lock = true;
            }
            if (
              object.array[this.targetIndex]["x"] > this.x &&
              object.array[this.targetIndex]["y"] > this.y &&
              !lock
            ) {
              this.velocityY += this.speed * deltaTime.time;
              this.velocityX += this.speed * deltaTime.time;
              lock = true;
            }
            if (
              object.array[this.targetIndex]["x"] < this.x &&
              object.array[this.targetIndex]["y"] > this.y &&
              !lock
            ) {
              this.velocityY += this.speed * deltaTime.time;
              this.velocityX -= this.speed * deltaTime.time;
              lock = true;
            }
            ///Stright movement
            if (object.array[this.targetIndex]["y"] < this.y && !lock) {
              this.velocityY -= this.speed * deltaTime.time;
            }
            if (object.array[this.targetIndex]["x"] > this.x && !lock) {
              this.velocityX += this.speed * deltaTime.time;
            }
            if (object.array[this.targetIndex]["y"] > this.y && !lock) {
              this.velocityY += this.speed * deltaTime.time;
            }
            if (object.array[this.targetIndex]["x"] < this.x && !lock) {
              this.velocityX -= this.speed * deltaTime.time;
            }

            ///Normalizes diagonal movement.
            if (this.velocityX !== 0 && this.velocityY !== 0) {
              this.velocityX * 0.6;
              this.velocityY * 0.6;
              console.log("step 4");
            }

            console.log(this.x, this.y, this.velocityX, this.velocityY);

            ///Applies the velocity to the position
            this.x += this.velocityX;
            this.y += this.velocityY;

            ///Resets velocity
            this.velocityX = 0;
            this.velocityY = 0;
          }
        } else {
          console.log("CHARACTER target index outside of object list range.");
        }
      }
      ///If the object is not a list.
      else {
        ///Stops the CHARACTER from bouncing around when it gets close to the target.
        if (collisionDetection(this, object, false)) {
          this.x = object.x;
          this.y = object.y;
        }

        ///Stops the CHARACTER from bouncing around when it gets close to the target.
        ///Way better than last solution.
        if (Math.abs(object.x - this.x) < 5) {
          this.x = object.x;
        }
        if (Math.abs(object.y - this.y) < 5) {
          this.y = object.y;
        }

        ///Diagonal movement
        let lock = false;
        if (object.x < this.x && object.y < this.y && !lock) {
          this.velocityY -= this.speed * deltaTime.time;
          this.velocityX -= this.speed * deltaTime.time;
          lock = true;
        }
        if (object.x > this.x && object.y < this.y && !lock) {
          this.velocityY -= this.speed * deltaTime.time;
          this.velocityX += this.speed * deltaTime.time;
          lock = true;
        }
        if (object.x > this.x && object.y > this.y && !lock) {
          this.velocityY += this.speed * deltaTime.time;
          this.velocityX += this.speed * deltaTime.time;
          lock = true;
        }
        if (object.x < this.x && object.y > this.y && !lock) {
          this.velocityY += this.speed * deltaTime.time;
          this.velocityX -= this.speed * deltaTime.time;
          lock = true;
        }
        ///Stright movement
        if (object.y < this.y && !lock) {
          this.velocityY -= this.speed * deltaTime.time;
        }
        if (object.x > this.x && !lock) {
          this.velocityX += this.speed * deltaTime.time;
        }
        if (object.y > this.y && !lock) {
          this.velocityY += this.speed * deltaTime.time;
        }
        if (object.x < this.x && !lock) {
          this.velocityX -= this.speed * deltaTime.time;
        }

        ///Normalizes diagonal movement.
        if (this.velocityX !== 0 && this.velocityY !== 0) {
          this.velocityX * 0.6;
          this.velocityY * 0.6;
        }

        ///Applies the velocity to the position
        this.x += this.velocityX;
        this.y += this.velocityY;

        ///Resets velocity
        this.velocityX = 0;
        this.velocityY = 0;
      }
    }
  }
  targetNewRanObjectInList(object) {
    console.log(object);
    this.targetIndex = ranNum(0, object.arrayLength - 1);
    console.log(object.arrayLength);
    console.log("target index: " + this.targetIndex);
  }
  renderCords(showX, row, size, styleObj, canvas) {
    this.objCordsText.text =
      "X: " + Math.floor(this.x) + " Y: " + Math.floor(this.y);
    TextHandler(
      this.objCordsText,
      styleObj,
      showX,
      row * styleObj.fontSize + 5,
      canvas,
      size
    );
  }
  runCollisionDectection(onObject, objectIsList) {
    if (objectIsList == true) {
      //Saves index. Returns -1 if it can not find it. 
      let indexOfOnObject = this.collisions.findIndex(collisions => collisions.objectCollidedID === onObject.id); 
      //If ^ is -1 creates new object in the array. And changes indexOfOnObject to new index.
      if (indexOfOnObject === -1) {
        indexOfOnObject = this.collisions.length - 1;
        this.collisions[this.collisions.length] = {
          objectCollidedID: onObject.id,
          allIndexesOfCollides: [],
        };
      } 
      ///Checks all objects of onObject for a collision 
      for (let i = 0; i < onObject.arrayLength; i++) {
        if (
          this.x + this.width - onObject.array[i].x >= 0 &&
          onObject.array[i].x + onObject.array[i].width - this.x >= 0 &&
          this.y + this.height - onObject.array[i].y >= 0 &&
          onObject.array[i].y + onObject.array[i].height - this.y >= 0
        ){
          if (!this.collisions[indexOfOnObject].allIndexesOfCollides.includes(i)) {
          this.collisions[indexOfOnObject].allIndexesOfCollides.push(i); 
          }

        }
        else {
          let indexToRemove = this.collisions[indexOfOnObject].allIndexesOfCollides.indexOf(i);
          if (indexToRemove != -1) {
            this.collisions[indexOfOnObject].allIndexesOfCollides.splice(indexToRemove,1);
          }
        }

      }
      ///Checks all the lengths of allIndexesOfCollides in the collision array,
      ///if any are greater than 0, isCollision will be true.
      this.isCollision = false;
      for (let i = 0; i < this.collisions.length; i++) {
        if (this.collisions[i].allIndexesOfCollides.length > 0) {
          this.isCollision = true;
        }
      }
    }
  }
}

var obama = new CHARACTER(250, 400, 50, 50, 250, "red", "imgs/obamaFrames/obama-101.png");
//imgs\obamaFrames\obama-85.png

obama.frames = 115;



///Mouses coordinates. Show x,y are where it will be displayed.
var mouse = {
    x: 0,
    y: 0,
    height: 10,
    width: 10,
    color: "green",
    down: false,
}





/// Player object           // x , y , width , height , speed , color 
var player = new CHARACTER(150, 300, 100, 100, 750, "green");



////dect collisons on each other in the object list if the isSolid propertie is true
////Object List

  class OBJECTLIST {
    constructor(x, y, width, height,backUpImage) {
      ///Used by other functions to determine if a loop is needed. 
      this.isList = true;

      //Array stuff
      this.arrayLength = 0;
      this.array = {};
      this.patchCount = 0;

      //Global properties. These properties are shared by all objects in the list.
      this.isSolid = false;

      //used to get the variable name of the objectList, always set this upon class creation. 
      this.id = "";

      //Render:  1 = pixels  2 = image  3 = gif
      //blueprint. Every object will store these properties.
      this.typeBP = 1;
      this.renderBP = 1;
      this.toMoveXBP = x;
      this.toMoveYBP = y;
      this.xBP = x;
      this.yBP = y;
      this.widthBP = width;
      this.heightBP = height;
      this.speedBP = 0;
      this.colorBP = " ";
      this.hasGravityBP = false;
      this.isGravityAffectedBP = false;
      this.dragableBP = false;

      //image
      this.imageHolder = new Image(this.widthBP, this.heightBP);
      this.imgSrcBP = " ";
      this.framesBP = 0;
      this.currentFrame = 0;

      //Saving last postion, used in render.
      this.lastPosXBP = 0;
      this.lastPosYBP = 0;

      //Used in maintainMax, to stop from removing most recent created object. 
      this.increment = 0;
    }

    randomizeBlueprintXY() {
      ///So it doesn't clip the border.
      ///2 multiple and this width and height because
      ///Obama cant grab coin if he cant line up his x and y
      ///With the objects x and y. Trust. 
      this.xBP = ranNum(this.widthBP, (canvas.width) - this.widthBP * 2);
      this.yBP = ranNum(this.heightBP, (canvas.height) - this.heightBP * 2);
    }
    timeOut = 5; //Used to limit the amount of spawns per second when it is called in a loop. 
    createObjectAtObject(obj) {
      if (this.timeOut >= 5) {
        this.xBP = obj.x;
      this.yBP = obj.y;
      this.createObjects(1, false);
      this.timeOut = 0;
      }
      this.timeOut++;
    }

    ///Keeps deleting the last created object instead of the first one. 
    ///Maybe use increment and just cycle through the array. Starting at one. 
     maintainMax(max) {
      if (this.arrayLength <= this.increment) {
        this.increment = 0;
      }
      if (this.arrayLength > max) {
        for (let i = 0; i < this.arrayLength - max; i++) {
          this.removeObject(this.increment);
          this.increment++;
        }
      }
    } 

    //for (let i = this.arrayLength; i < this.arrayLength + amt; i++) {
    createObjects(amt, randomStartingLoc) {
      ///This is used because we can't update the array length inside the loop,
      //I thought it wasn't needed just trust that it is.
      let startingArrayLength = this.arrayLength;
      for (let i = this.arrayLength; i < startingArrayLength + amt; i++) {
        if (randomStartingLoc) {
          this.randomizeBlueprintXY();
        }
        ///Add a object to the end of the array with the blueprint.\\\
        this.array[i] = {
          type: this.typeBP,
          render: this.renderBP,
          frames: this.framesBP,
          imgSrc: this.imgSrcBP,
          color: this.colorBP,
          toMoveX: this.toMoveXBP,
          toMoveY: this.toMoveYBP,
          x: this.xBP,
          y: this.yBP,
          lastPosX: this.xBP,
          lastPosY: this.yBP,
          width: this.widthBP,
          height: this.heightBP,
          hasGravity: this.hasGravityBP,
          gravityAffected: this.gravityAffectedBP,
          dragable: this.dragableBP,
        };

        this.arrayLength++;
      }
    }

    removeObject(index) {
      //Removes the objects render from the screen.
      clearobj(this.array[index]);

      ///Copies the object at the end of the array to the selected index.
      this.array[index]["type"] = this.array[this.arrayLength - 1]["type"];
      this.array[index]["render"] = this.array[this.arrayLength - 1]["render"];
      this.array[index]["frames"] = this.array[this.arrayLength - 1]["frames"];
      this.array[index]["currentFrame"] = this.array[this.arrayLength - 1]["currentFrame"];
      this.array[index]["imgSrc"] = this.array[this.arrayLength - 1]["imgSrc"];
      this.array[index]["color"] = this.array[this.arrayLength - 1]["color"];
      this.array[index]["toMoveX"] = this.array[this.arrayLength - 1]["toMoveX"];
      this.array[index]["toMoveY"] = this.array[this.arrayLength - 1]["toMoveY"];
      this.array[index]["x"] = this.array[this.arrayLength - 1]["x"];
      this.array[index]["y"] = this.array[this.arrayLength - 1]["y"];
      this.array[index]["lastPosX"] = this.array[this.arrayLength - 1]["lastPosX"];
      this.array[index]["lastPosY"] = this.array[this.arrayLength - 1]["lastPosY"];
      this.array[index]["width"] = this.array[this.arrayLength - 1]["width"];
      this.array[index]["height"] = this.array[this.arrayLength - 1]["height"];
      this.array[index]["hasGravity"] = this.array[this.arrayLength - 1]["hasGravity"];
      this.array[index]["gravityAffected"] = this.array[this.arrayLength - 1]["gravityAffected"];
      this.array[index]["dragable"] = this.array[this.arrayLength - 1]["dragable"];

      ///deletes the last object in the array.
      delete this.array[this.arrayLength - 1];
      this.arrayLength--;
    }

    renderObjects() {
      for (let i = 0; i < this.arrayLength; i++) {
                  //self colision check.
          var colDec = collisionDetection(this.array[i],this,true)
          if (colDec[0]) {
            this.array[i]['y'] = this.array[colDec[1]]['y']; 
          }
          else{
          }
          //OutOfBounce Check and fix
          if(this.array[i]['y'] + this.array[i]['height'] > canvasBottomYAxis){
            this.array[i]['y'] = canvasBottomYAxis - this.array[i]['height'] 
          }
          if (this.array[i]['y'] < 0) {
              this.array[i]['y'] = 0;
          }
          if (this.array[i]['x'] < 0) {
              this.array[i]['x'] = 0;
          }
          if (this.array[i]['x'] + this.array[i]['width'] > canvas.width) {
            this.array[i]['x'] = canvas.width - this.array[i]['width'];
          }
        if (this.array[i]["render"] == 1) {
          //Pixels
          ///Future note: Just trust man it works just trust. Don't question why we saving,
          //the cords twice. Its because we are updating the objects x and y externally. This,
          //allows us to render on our on time.
          //Clear the last rendered rect
          /* ctxLayer1.clearRect(
            this.array[i]["lastPosX"],
            this.array[i]["lastposY"],
            this.array[i]["width"],
            this.array[i]["height"]
          ); */


          this.array[i]["lastPosX"] = this.array[i]["x"];
          this.array[i]["lastPoxY"] = this.array[i]["y"];

          ctxLayer1.fillRect(
            this.array[i]["lastPosX"],
            this.array[i]["lastPosY"],
            this.array[i]["width"],
            this.array[i]["height"]
          );
        }
        if (this.array[i]["render"] == 2) {
          //image

          /* ctxLayer1.clearRect(
            this.array[i]["lastPosX"],
            this.array[i]["lastPoxY"],
            this.array[i]["width"],
            this.array[i]["height"]
          ); */


          this.array[i]["lastPosX"] = this.array[i]["x"];
          this.array[i]["lastPoxY"] = this.array[i]["y"];

          this.imageHolder.src = this.array[i]["imgSrc"];

          ctxLayer1.drawImage(
            this.imageHolder,
            this.array[i]["lastPosX"],
            this.array[i]["lastPoxY"],
            this.array[i]["width"],
            this.array[i]["height"]
          );
        }

        if (this.array[i]["render"] == 3) {
          //Reset the frame Counter if it reaches the last frame.
          if (this.array[i]["currentFrame"] > this.array[i]["frames"] - 1) {
            this.array[i]["currentFrame"] = 0;
          }

          /* ctxLayer1.clearRect(
            this.array[i]["lastPosX"],
            this.array[i]["lastPosY"],
            this.array[i]["width"],
            this.array[i]["height"]
          ); */


          this.array[i]["lastPosX"] = this.array[i]["x"];
          this.array[i]["lastPosY"] = this.array[i]["y"];

          this.array[i]["currentFrame"]++;

          ///Adds the current frame number into the name of the file path,
          ///leading to the img. All frames of the gif should be in a folder, and ending,
          /// like this, EX:   5.png 6.png 7.png
          this.array[i]["imgSrc"] = insertText(
            this.array[i]["imgSrc"],
            this.array[i]["currentFrame"].toString(),
            this.array[i]["imgSrc"].length - 4
          );
          
          this.imgHolder = this.array[i]["imgSrc"];
            ctxLayer1.drawImage(this.imgHolder, this.array[i]["x"], this.array[i]["y"]);
        }
      }
    }
  } 








///  Coin object list.
///This is where the objectList is used to make the crates. 
///x, y, width, height

var redCrates = new OBJECTLIST(35,35,50,50);
redCrates.id = "redCrates";
redCrates.colorBP = "gold";
redCrates.imgSrcBP = "imgs/redCrate.png";

redCrates.renderBP = 2;
redCrates.dragableBP = true;
redCrates.hasGravityBP = true; 
redCrates.gravityAffectedBP = true;
redCrates.isSolid = true;
redCrates.createObjects(5,true);

var crates = new OBJECTLIST(35,35,50,50);

crates.id = "crates";
crates.colorBP = "gold";
crates.imgSrcBP = "imgs/crate.png";

crates.renderBP = 2;
crates.dragableBP = true;
crates.hasGravityBP = true; 
crates.gravityAffectedBP = true;
crates.isSolid = true;


var coins = new OBJECTLIST(35,35,35,35);

coins.id = "coins";
coins.imgSrcBP = "imgs/coin.png"
coins.isList = true;
coins.renderBP = 2;
coins.dragableBP = false;
coins.hasGravityBP = false;
coins.isGravityAffectedBP = false;
coins.isSolid = false;
coins.createObjects(10,true);
//crates.createObjects(10, true);









///There is a todo item for this object. 
//Score object
var score = {
  showX: 50,
  showY: 50,
  size: 35,
  playerScore: 0,
  obamaScore: 0,
  cash: 300,
  playerIncrement: 1,
  obamaIncrement: 1,
  playerScoreText: null,
  obamaScoreText: null,
 
  addScorePlayer: function (index) {
    if (index == 1) {
      this.cash += 20; ///Instead of doing a different currency just make the special coins give more points. 
      return;
    }
    this.playerScore += this.playerIncrement;
  },

  addScoreObama: function(){
    this.obamaScore += this.obamaIncrement;
  },

  resetScore: function(){
    this.playerScore = 0;
    this.obamaScore = 0;
  },



  renderScore: function () {
/*   ctxLayer1.clearRect(this.showX, this.showY - 50, 500, 100); */
/*   ctxLayer1.fillText("Your Coins", this.showX, this.showY);
  ctxLayer1.fillText(this.playerScore, this.showX + 325, this.showY);
  ctxLayer1.fillText("Obama's Coins", this.showX, this.showY + 50);
  ctxLayer1.fillText(this.obamaScore, this.showX + 325, this.showY + 50); */
  TextHandler(this.playerScoreText,makerStyle,this.showX,this.showY,ctxLayer1,this.size);
  TextHandler(this.obamaScoreText,makerStyle,this.showX,this.showY + this.size + 5,ctxLayer1,this.size);

  }
}
//Since we are referencing the own objects property inside of this property it has to
//be set outside of the object. 
score.playerScoreText = new TEXT("Your Coins " + score.playerScore);
score.obamaScoreText = new TEXT("obama's Coins " + score.obamaScore);

///Pauses the game when the specifed button is pressed, 
///and render a menu with prompts. Will only listen for those, 
///keys when the menu is open and game is paused. 
var menu = {
  showX: 50,
  showY: 250,
  showMenuX: 50,
  showMenuY: 200,
  menuWidth: 400,
  menuHeight: 500,
  backgroundColor: "black",
  textColor: "red",
  borderColor: "red",
  borderRadiusPX: 5,
  increment: 0,
  menuFontSize: 32,
  pause: false,
  imageHolder: new Image(),
  optionPrices: {
   price1: new TEXT(65), 
    price2: new TEXT(50), 
    price3: new TEXT(75),},
  coins: new TEXT(3000),
  optionPriceCords: [
    {
      x: 307 + this.showMenuX,
      y: 91 + this.showMenuY,
    },
    {
      x: 220 + this.showMenuX,
      y: 238 + this.showMenuY,
    },
    {
      x: 280 + this.showMenuX,
      y: 363 + this.showMenuY,
    },
  ],
  coinsTotalX: 180 + this.showMenuX,
  coinsTotalX: 437 + this.showMenuY,
  menuSrc: "imgs/menu.png",

  renderPrompt: function () {
/*     ctxLayer1.clearRect(this.showX, this.showY - 50, 300, 50); */
    ctxLayer1.fillText("( f ) for shop", this.showX, this.showY);
  },

  renderMenu2: function () {
/*     ctxLayer1.clearRect(
      this.showMenuX,
      this.showMenuY,
      this.menuWidth,
      this.menuHeight
    ); */
    imageRender("imgs/menu.png",this.showMenuX,this.showMenuY);
    TextHandler(this.optionPrices.price1,makerStyle,this.showMenuX+307,this.showMenuY+91,ctxLayer1,45);
    TextHandler(this.optionPrices.price2,makerStyle,this.showMenuX+220,this.showMenuY+238,ctxLayer1,45);
    TextHandler(this.optionPrices.price3,makerStyle,this.showMenuX+280,this.showMenuY+363,ctxLayer1,45);
    TextHandler(this.coins,makerStyle,this.showMenuX+180,this.showMenuY+455,ctxLayer1,65);
  },

  //No idea why -50 is used, but it works.
  renderMenu: function () {
    ctxLayer1.font = this.menuFontSize.toString() + "px serif";
/*     ctxLayer1.clearRect(
      this.showMenuX,
      this.showMenuY - 50,
      this.menuWidth,
      this.menuHeight
    );
 */
    ctxLayer1.fillRect(
      this.showMenuX - this.borderRadiusPX,
      this.showMenuY - 50 - this.borderRadiusPX,
      this.menuWidth + this.borderRadiusPX,
      this.menuHeight + this.borderRadiusPX
    );
    ctxLayer1.fillRect(
      this.showMenuX,
      this.showMenuY - 50,
      this.menuWidth - this.borderRadiusPX,
      this.menuHeight - this.borderRadiusPX
    );
    ctxLayer1.fillText(
      "( 1 ) Speed Increase $50",
      this.showMenuX + 1,
      this.showMenuY
    );
    this.increment++;
    ctxLayer1.fillText(
      "( 2 ) Size Increase $50",
      this.showMenuX + 1,
      this.showMenuY + this.menuFontSize
    );
    this.increment++;
    ctxLayer1.fillText(
      "( 3 ) Point Increase $50",
      this.showMenuX + 1,
      this.showMenuY + this.menuFontSize * 2
    );
    this.increment++;
    ctxLayer1.fillText(
      "( 4 ) Trump Bot $50",
      this.showMenuX + 1,
      this.showMenuY + this.menuFontSize * 3
    );
    this.increment++;
    ctxLayer1.fillText(
      "( 5 ) Exit Shop",
      this.showMenuX + 1,
      this.showMenuY + this.menuFontSize * 4
    );
    this.increment++;
    ctxLayer1.fillText(
      "Current big ones $" + score.cash,
      this.showMenuX + 1,
      this.showMenuY + this.menuFontSize * 5
    );
    this.increment++;
  },

  deleteMenu: function () {
    ctxLayer1.clearRect(
      this.showMenuX - this.borderRadiusPX,
      this.showMenuY - 50 - this.borderRadiusPX,
      this.menuWidth + this.borderRadiusPX,
      this.menuHeight + this.borderRadiusPX
    );
  },
  
  //Used so the same button can be used to open and close the menu. 
   timeOut: 0,
   subTimeOut: 0,
  showMenu: function () {
    if ((keyPress.f || this.pause == true) && this.timeOut == 0) {
      this.renderMenu2();
      this.pause = true;
      if (keyPress.one == true) {
        if (score.cash >= 25) {
          player.speed += 3;
          score.cash -= 25;
        }
      }
      if (keyPress.two == true) {
        if (score.cash >= 25) {
          player.width += 15;
          player.height += 15;
          score.cash -= 25;
        }
      }
      if (keyPress.three == true) {
        if (score.cash >= 25) {
          score.playerIncrement += 1;
          score.cash -= 25;
        }
      }
      if (keyPress.four == true) {
        if (score.cash >= 25) {
          ///To be added. Add obama but different color and gives points to player.
        }
      }
      if (keyPress.f == true &&this.subTimeOut >= 100) {
        this.pause = false;
        this.timeOut = 100;
        this.subTimeOut = 0;
        menu.deleteMenu();
        return;
      }
      this.subTimeOut++;
    }
    else {
      if (this.timeOut > 0) {
        this.timeOut--;
      }
    }
  },
};


//// Helper functions \\\\ 


///Takes a num and returns an array of the num’s digits.  
/// Ex  digSplit(572) =   [ 5 , 7 , 2]
function digSplit(num) {
    var list = [];
    for (let i = 0; num >= 1; i++ ){
        list.push(num % 10);
        num = Math.floor((num / 10));  
    }
    return list.reverse();
}


///Returns a random num between min and max, inclusive. 
function ranNum (min , max){
    seed = Math.random();
    seed = Math.floor(seed * (max - (min - 1))) + min;
    return seed;
}


///Incerts a string in the middle of another string. 
///Used in the process of render gifs, to add the increment, 
///to the file path variable. 
///Copy pasta. 
function insertText(originalString, textToInsert, index) {
     if (index < 0 || index > originalString.length) {
         return originalString; // Handle invalid index
     }
     return originalString.slice(0, index) + textToInsert + originalString.slice(index);
   }

///Clears the canvas
function clearScreen () {
    ctxLayer1.clearRect(0, 0, canvas.width, canvas.height);
}


///Clears a obj, assuming it has these properties.
function clearobj (obj) {
    ctxLayer1.clearRect(obj.x, obj.y, obj.width, obj.height);
}



///Variable for the gravity function. 
var grav = 8;

///Moves OBJs down until the bottom Y axis is hit and
///if the object's gravityAffect property is true. 
function gravity(obj, objIsList) {
  if (obj.gravityAffectedBP) {
  if (obj.y + obj.height < canvasBottomYAxis) {
    obj.y += grav;
  }
  if (objIsList) {
    for (let i = 0; i < obj.arrayLength; i++) {
      if(obj.array[i]['toMoveY'] + obj.array[i]['height'] < canvasBottomYAxis && obj.array[i].gravityAffected){
        obj.array[i]['toMoveY'] += grav; 
      }
      
    }
  }
}
}


///Displays the coordinates of an object. Assuming it has an x and y propertie.
function renderObjCords(obj, showX, showY) {
  /* ctxLayer1.clearRect(showX, showY - 50, 335, 50); */
  ctxLayer1.fillText("X", showX, showY);
  ctxLayer1.fillText(Math.floor(obj.x), showX + 70, showY);
  ctxLayer1.fillText("Y", showX + 180, showY);
  ctxLayer1.fillText(Math.floor(obj.y), showX + 235, showY);
}


///Variables used by the drag function. 
var dragKey = false;
var index = 0;

function drag(obj , passColFun , objIsList) {
  ///Will set a index varaible to the collision object, if the object is a list and collisionDec is true.
  

  ///When drag key is set this will be the only if statement that runs.
  ///Only if mouse down is false will it not be true.
  if ((dragKey && (objIsList == false || objIsList === undefined)) && obj.gravityAffectedBP) {
    obj.x = mouse.x - obj.width / 2;
    obj.y = mouse.y - obj.height / 2;
    console.log("hello");
    if (!mouse.down) {
      dragKey = false;
      if (obj.hasGravity) {
        obj.gravityAffected = true;
      }
      return;
    }
    return;
  }

  if (dragKey && objIsList == true) {
          obj.array[index].isGravityAffected = false;
    if (mouse.x > 0 && mouse.x <= canvas.width - 20) {  
      obj.array[index]['x'] = mouse.x - obj.array[index]["width"] / 2;
    }
    else {
      if (mouse.x <= 0) {
        obj.array[index]['x'] = 0;
      }
      if (mouse.x > canvas.width - 20) {
        obj.array[index]['x'] = canvas.width - obj.array[index]['width']
      }
    }
    
    if (mouse.y > 0 && mouse.y < canvasBottomYAxis) {  
      obj.array[index]['y'] = mouse.y - obj.array[index]["width"] / 2;
    }
    else {
      if (mouse.y < 0) {
        obj.array[index]['y'] = 0;
      }
      if (mouse.y > canvasBottomYAxis) {
        obj.array[index]['y'] = canvasBottomYAxis - obj.array[index]['height']
      }
    }
    renderObjCords(obj.array[index], 50, 500);
    if (!mouse.down) {
      dragKey = false;
       obj.array[index].hasGravity = true;
          obj.array[index].isGravityAffected = true;
      if (obj.array[index]['hasGravity']) {
        obj.array[index]['gravityAffected'] = true;
      }
      return;
    }
    return;
  }

  ///Collision is true and mouse down is true. This will set the drag key and set the positon the first time.
  if (passColFun[0] && mouse.down == true) {
    if (objIsList == false || objIsList === undefined) {
      if (obj.hasGravity) {
        obj.gravityAffected = false;
      }
      obj.x = mouse.x - obj.width / 2;
      obj.y = mouse.y - obj.height / 2;
      dragKey = true;
    }
    if (objIsList == true) {
        index = passColFun[1];
      if (obj.array[passColFun[1]]['hasGravity']) {
        obj.array[passColFun[1]]['gravityAffected'] = false;
      }
      obj.x = mouse.x - obj.width / 2;
      obj.y = mouse.y - obj.height / 2;
      dragKey = true;
    }
  } /* else {
    if (objIsList == false || objIsList === undefined) {
      if (obj.hasGravity) {
        obj.gravityAffected = true;
      }
    }
    if (objIsList == true) {
      console.log(passColFun[0]);
      console.log(passColFun[1]);
      if (obj.array[passColFun[1]]['hasGravity']) {
        obj.array[passColFun[1]]['gravityAffected'] = true;
      }
    }
  } */
}


var collisionDectectionNew = {

collisions: [
],

runOnObjectForObject: function (obj1,obj2,obj2IsList) {
  if (obj2IsList == true) {
    for (let i = 0; i < obj2.arrayLength; i++) {
      if (
        obj1.x + obj1.width - obj2.array[i].x >= 0 &&
        obj2.array[i].x + obj2.array[i].width - obj1.x >= 0 &&
        obj1.y + obj1.height - obj2.array[i].y >= 0 &&
        obj2.array[i].y + obj2.array[i].height - obj1.y >= 0
      ) {
        let hitIndexsPull = this.collisions.map(collisions => collisions.objectHitIndex);
        if (!hitIndexsPull.includes(i)) {
          this.collisions[this.collisions.length] = {
          objectTestedAndIndex: obj1, 
          objectHitIsList: true,
          ojectHit: obj2,
          objectHitIndex: i,
        }
        return [true, i];
        }

      }
      else {
        this.collisions = this.collisions.filter(collisions => collisions.objectHitIndex !== i);
      }
    }
    

    return [false];
  } else {
    if (
      obj1.x + obj1.width - obj2.x >= 0 &&
      obj2.x + obj2.width - obj1.x >= 0 &&
      obj1.y + obj1.height - obj2.y >= 0 &&
      obj2.y + obj2.height - obj1.y >= 0
    ) {
      return true;
    } else {
      return false;
    }
  }

}

}


//// Main functions \\\\ 
 function collisionDetection(obj1, obj2, obj2IsList) {
  if (obj2IsList == true) {
    for (let i = 0; i < obj2.arrayLength; i++) {
      if (
        obj1.x + obj1.width - obj2.array[i].x >= 0 &&
        obj2.array[i].x + obj2.array[i].width - obj1.x >= 0 &&
        obj1.y + obj1.height - obj2.array[i].y >= 0 &&
        obj2.array[i].y + obj2.array[i].height - obj1.y >= 0
      ) {
        return [true, i];
      }
    }
    return [false];
  } else {
    if (
      obj1.x + obj1.width - obj2.x >= 0 &&
      obj2.x + obj2.width - obj1.x >= 0 &&
      obj1.y + obj1.height - obj2.y >= 0 &&
      obj2.y + obj2.height - obj1.y >= 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}













//[0] bool [1] coin index if param true



///Excutes a list of functions if collisionDectection is true.
function onCollisionPlayer(passColFun){
  if(passColFun[0]){
 // coins.removeCoin(passColFun,false);
  score.addScorePlayer(coins.array[passColFun[1]]['index']);
  //coins.addCoins(1);
  }
  if (passColFun[1] == obama.targetIndex) {
    obama.targetNewRanCoin();
  }
}

var deltaTime = {
  lastUpdate: Date.now(),
  currentUpdate: this.lastUpdate,
  time: 0.1,
  
  update: function(){
    this.currentUpdate = Date.now();
    if (this.lastUpdate === 0) { this.lastUpdate = this.currentUpdate;}
    this.time = (this.currentUpdate - this.lastUpdate) / 1000;
    this.lastUpdate = this.currentUpdate;
  }
}

function onCollisionObama(passColFun){
  if (passColFun[0]) {
    
   // crates.removeObject(passColFun[1]);
    score.addScoreObama();
    //coins.addCoins(1);
    obama.targetNewRanObjectInList(crates);
 
  }
}

var rayObj = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}

function rayCaster (obj,side,length, render) {
  let colorHolder = ctxLayer1.fillStyle;
  var colDec = [];
switch (side) {
  case "left":
    if (render) {ctxLayer1.fillStyle = "red"}
    rayObj.x = obj.x;
    rayObj.y = obj.y;
    rayObj.height = obj.height;
    rayObj.width = 0;
    colDec = collisionDetection(rayObj,crates,true);

    for (let i = 0; i < length; i++) {
      colDec = collisionDetection(rayObj,crates,true);
      if(colDec[0]){
        return { direction: "left", index: colDec[1] };
      }
      rayObj.width += 1;
      rayObj.x -= 1;
      if (render) {ctxLayer1.fillRect(rayObj.x,rayObj.y,rayObj.width,rayObj.height)}
    }
    break;
  case "top": 
      if (render) {ctxLayer1.fillStyle = "green"}
    rayObj.x = obj.x;
    rayObj.y = obj.y;
    rayObj.height = 0;
    rayObj.width = obj.width;
    colDec = collisionDetection(rayObj,crates,true);

    for (let i = 0; i < length; i++) {
      colDec = collisionDetection(rayObj,crates,true);
      if(colDec[0]){
        if (crates.array[colDec[1]]['y'] < rayObj.y) {
          console.log("top");
          return { direction: "top", index: colDec[1] };
        }
        if (crates.array[colDec[1]]['y'] > rayObj.y) {
          console.log("bottom");
          return { direction: "bottom", index: colDec[1] };
        }
      }
      rayObj.y -= 1;
      rayObj.height +=1;
      if (render) {ctxLayer1.fillRect(rayObj.x,rayObj.y,rayObj.width,rayObj.height)}
    }
    break;
  case "right":
        if (render) {ctxLayer1.fillStyle = "blues"}
    rayObj.x = obj.x + obj.width;
    rayObj.y = obj.y;
    rayObj.height = obj.height;
    rayObj.width = 0;
    colDec = collisionDetection(rayObj,crates,true);
    for (let i = 0; i < length; i++) {
     colDec = collisionDetection(rayObj,crates,true);
      if(colDec[0]){
        console.log("right");
        return { direction: "right", index: colDec[1] };
      }
     // rayObj.x += 1;
      rayObj.width +=1;
      //console.log(i);
      if (render) {ctxLayer1.fillRect(rayObj.x,rayObj.y,rayObj.width,rayObj.height)}
    }
    break;
  case "bottom":
        if (render) {ctxLayer1.fillStyle = "orange"}
    rayObj.x = obj.x;
    rayObj.y = obj.y + obj.height;
    rayObj.height = 0;
    rayObj.width = obj.width;
    colDec = collisionDetection(rayObj,crates,true);
   // console.log(colDec);
    for (let i = 0; i < length; i++) {
      colDec = collisionDetection(rayObj,crates,true);
      if(colDec[0]){

          console.log("bottom");
          return { direction: "bottom", index: colDec[1] };
        
      }
      rayObj.height += 1;
      if (render) {ctxLayer1.fillRect(rayObj.x,rayObj.y,rayObj.width,rayObj.height)}
    }
    break;
  default:
    return { direction: "none", index: -1 };
}
ctxLayer1.fillStyle = colorHolder; 
return { direction: "none", index: -1 };
}


pause = false;
//// THE GAME LOOP \\\\ 

main = () => {
  window.requestAnimationFrame(main);
 // collisionDectectionNew.runOnObjectForObject(player,crates,true);
 // collisionDectectionNew.runOnObjectForObject(obama,coins,true);
 // console.log(collisionDectectionNew.collisions);
 player.runCollisionDectection(crates,true);
 console.log(player.collisions);
  // LOOP CONTENTS
  if (!menu.pause) {
        clearScreen();
    ////Main logic updates.
    deltaTime.update();
    console.log(coins.arrayLength);
    ////Update game logic. 
    gravity(crates, true);
    gravity(redCrates,true);
    console.log(obama.x , obama.y);
    drag(crates, collisionDetection(mouse, crates, true), true);
   // drag(redCrates, collisionDetection(mouse, redCrates, true), true);
    player.updateMovementKeyboard(crates);
    player.renderCords(500,0,20,makerStyle,ctxLayer1);
    obama.renderCords(500,2,20,makerStyle,ctxLayer1);
    //obama.moveTowardsTargetObject(mouse);
    crates.maintainMax(10);
    obama.moveTowardsTargetObject(coins);
    ////Render 
    ////Hierarchy dependent. 
  
    if (keyPress.one == true) {
      crates.createObjectAtObject(mouse);
      obama.targetNewRanObjectInList(coins);
    }
/*     renderObjCords(obama, 50, 200);
    renderObjCords(player, 50, 150);
    renderObjCords(mouse, 50, 250); */
    score.renderScore();
    player.renderObj(false, false);
    obama.renderObj(false, true);
    coins.renderObjects();
    crates.renderObjects();
    redCrates.renderObjects();
    menu.showMenu();



///testing stuff


   
    imageRender("imgs/coin.png", mouse.x, mouse.y);
  }

  //// Everything here will run during a pause.
  if (menu.pause) {
    //// Nothing inside currently
  }

  //// Everything here always runs.
  menu.showMenu();

  //// End of loop
};

////Add functions to call before game loop starts, here \\\\
obama.targetNewRanObjectInList(coins);




///Starts the game loop
main();






///Don't delete
});