const stage = acgraph.create('stage');

udonya_coords = {
    0:{"x":100, "y":150},
    1:{"x":100, "y":50},
    2:{"x":355, "y":300},
}

stage.rect(0,0,400,400).fill("#008000");

var xy = 50
for (i=0; i<8; i++){
    stage.path().moveTo(xy, 0).lineTo(xy, 400)
    stage.path().moveTo(0, xy).lineTo(400, xy)
    xy += 50
}

// draw my position
my_coord = {"x":200, "y":200}
stage.circle(my_coord["x"], my_coord["y"], 10).fill("#ffff00") 

// draw udonya position
for (i=0; i<3; i++){
    x_coord = udonya_coords[i]["x"]
    y_coord = udonya_coords[i]["y"]
    console.log(x_coord, y_coord)
    stage.circle(x_coord, y_coord, 10).fill("#ffa500")    
}