 Qt.include("vector.js")

var components = [];
var balls = [];

function create_balls() {
    var component = Qt.createComponent("Ball.qml")
    components.push(component)

    if (component.status === Component.Ready)
        finishCreation();
    else
        component.statusChanged.connect(finishCreation);
}


function finishCreation() {
    var ball = components[components.length-1].createObject(movible_objects);
    balls.push(ball)
    ball.radius = 15
    ball.direction= new Polar_degrees(Math.random()*360, 3)

    ball.onBorder_bounce.connect(click_sound.play)
}

function move() {
    for(var i=0; i<balls.length; ++i)
        balls[i].move();
}
