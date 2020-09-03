let points = [];

function initGame() {  
  interb.addListener('pointerdown', e => {
    let location = e.data.getLocalPosition(app.stage);
    createDot(Math.round(location.x), Math.round(location.y));
  });
  // interb.addListener('pointerup', e => {

  // });
  // interb.addListener('pointermove', e => {

  // });
}

function createDot(x, y) {
  let dot = new PIXI.Graphics();
  dot.beginFill(0xff0000).lineStyle(0).drawCircle(0, 0, 15);
  let label = new PIXI.Text(points.length + 1, {fill: 0xffffff, fontSize: 25});
  label.position.set(-15 + (30 - label.width) / 2, -15 + (30 - label.height) / 2);
  dot.addChild(label);
  app.stage.addChild(dot);
  let lastPoint = points[points.length - 1];
  points.push(dot);
  dot.position.set(x, y);
  if (lastPoint) {
    overlay.lineStyle(3, 0xffffff).moveTo(lastPoint.x, lastPoint.y).lineTo(x, y);
  }
}