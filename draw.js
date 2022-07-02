const stage = acgraph.create('stage');

stage.rect(0,0,400,400).fill("#008000");

var xy = 50
for (i=0; i<8; i++){
    stage.path().moveTo(xy, 0).lineTo(xy, 400)
    stage.path().moveTo(0, xy).lineTo(400, xy)
    xy += 50
}