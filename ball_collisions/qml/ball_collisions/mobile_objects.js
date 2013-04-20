 Qt.include("vector.js")







function assert(name, a, cond)
{
    if(a===cond)
        console.log("OK: ")
    else
        console.log("ERROR: " + name)
}

function test ()
{
    /*
    var v= new Vector()
    v.setPolarDegrees(45, 1)

    //v.XY.x = 19;
    console.log(JSON.stringify(v.XY))
    console.log(v.XY.x)
    */
    /*
    var v = vectorPolarDegrees(45, 1)
    console.log(JSON.stringify(v.x))
    console.log(JSON.stringify(v.y))
    console.log(JSON.stringify(v.getPolar().r))
    console.log(JSON.stringify(v.getX()))
    console.log(JSON.stringify(v.getY()))
    */
}










var component



function create_ball() {
    component = Qt.createComponent("Ball.qml")

    if (component.status === Component.Ready)
        finishCreationBall();
    else
        component.statusChanged.connect(finishCreationBall);
}


function finishCreationBall() {
    var ball = component.createObject(movible_objects);
    ball.radius = 25
    ball.velocity= new Polar_degrees(Math.random()*360, 3)

    ball.onBorder_bounce.connect(click_sound.play)
}



function move(container)
{
    for(var i=0; i<container.children.length; ++i)
        container.children[i].move()

    check_collisions(container)
}


function check_collisions(container)
{
    for(var i=0; i<container.children.length-1; ++i)
    {
        for(var j=i+1; j<container.children.length; ++j)
        {
            if(is_collision(container.children[i], container.children[j]))
                apply_collision(container.children[i], container.children[j])
        }
    }
}



function  is_collision (ball1, ball2)
{
    var distance_now  = vdifference(vectorXY(ball1.realx, ball1.realy), vectorXY(ball2.realx, ball2.realy)).Polar.r
    var distance_next = vdifference(vectorXY(ball1.nextx, ball1.nexty), vectorXY(ball2.nextx, ball2.nexty)).Polar.r

    return distance_now>distance_next  &&  distance_now < ball1.radius+ball2.radius
}



function apply_collision(ball1, ball2)
{
    var energy = ball1.velocity.Polar.r + ball2.velocity.Polar.r
    var velocity1 = ball1.velocity
    var velocity2 = ball2.velocity

    var vector_centers = vectorXY(ball1.realx-ball2.realx, ball1.realy-ball2.realy)


    var proyec_vcent_vel1 = vscalar_product(vector_centers, velocity1)/vector_centers.Polar.r
    var proyec_vcent_vel2 = vscalar_product(vector_centers, velocity2)/vector_centers.Polar.r
    var  reaction1 =  vectorPolar(vector_centers.Polar.a, proyec_vcent_vel1)
    var  action1   =  vectorPolar(vector_centers.Polar.a, proyec_vcent_vel2)
    ball1.velocity = vaddition(reaction1, action1)
    ball1.velocity = vaddition(ball1.velocity, velocity1)

    var  reaction2 =  vectorPolar(vector_centers.Polar.a+Math.PI, proyec_vcent_vel2)
    var  action2   =  vectorPolar(vector_centers.Polar.a+Math.PI, proyec_vcent_vel1)
    ball2.velocity = vaddition(reaction2, action2)
    ball2.velocity = vaddition(ball2.velocity, velocity2)

    //  energy adjustemt to avoid acumulated round errors
    var energy_dif = energy - ball1.velocity.Polar.r - ball2.velocity.Polar.r
    ball1.velocity = vectorPolar(ball1.velocity.Polar.a, ball1.velocity.Polar.r + energy_dif/2.)
    ball2.velocity = vectorPolar(ball2.velocity.Polar.a, ball2.velocity.Polar.r + energy_dif/2.)
}
