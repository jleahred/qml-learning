 Qt.include("vector.js")

var component
var mobile_objs = [];

function create_balls() {
    component = Qt.createComponent("Ball.qml")
    //components.push(component)

    if (component.status === Component.Ready)
        finishCreation();
    else
        component.statusChanged.connect(finishCreation);
}


function finishCreation() {
    var ball = component.createObject(movible_objects);
    ball.radius = 25
    ball.direction= new Polar_degrees(Math.random()*360, 3)

    ball.onBorder_bounce.connect(click_sound.play)
    register(ball)
}


function register(mob_object) {
    mobile_objs.push(mob_object)
}



function move() {
    for(var i=0; i<mobile_objs.length; ++i)
        mobile_objs[i].move();
}
