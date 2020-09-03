
//== Main Initialization ==\\

var app = new PIXI.Application({width: 800, height: 500, backgroundColor:0xf1f1f1});
document.getElementById("game-canvas").append(app.view);

//== Initialize Supporting Structures ==\\
let interb = new PIXI.Graphics();
interb.beginFill(0).drawRect(0, 0, 800, 500);

interb.interactive = true;
interb.buttonMode = true;

let background;
let overlay = new PIXI.Graphics();
app.stage.addChild(interb, overlay);

app.stage.interactive=true;

let updateImageReg = [];
window.updateImages = (url) => {
  textureCache.addTexturePromise("background", url).then(() => {
    if (background) {
      background.destroy();
    }

    background = new PIXI.Sprite(textureCache.getTexture("background"));
    interb.addChild(background);
    updateImageReg.forEach(callback => callback());
  });
}

document.getElementById("file-input").addEventListener("input", (e) => {
  let file = e.target.files[0];
  console.log(file);
  
  var reader = new FileReader();
   reader.readAsDataURL(file);

   reader.onload = readerEvent => {
      var content = readerEvent.target.result;
      updateImages(content);
   }
});

document.getElementById("export").addEventListener("pointerdown", (e) => {
  console.log(JSON.stringify(points.map(point => [point.x, point.y])));
  alert('check your console log (F12)');
});
document.getElementById("reset").addEventListener("pointerdown", (e) => {
  while (points.length > 0) {
    points.shift().destroy();
  }
  overlay.clear();
});


initGame();