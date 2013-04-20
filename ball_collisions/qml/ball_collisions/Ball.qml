import QtQuick 2.0
import "vector.js" as V

Rectangle {
    radius:                         5
    property  int       mass  :     1
    property  real      realx :     parent.width/2
    property  real      realy :     parent.height/2

    x:                              realx - radius
    y:                              realy - radius
    width:                          radius*2
    height:                         radius*2
    color:                          "blue"

    property  real      nextx :     realx + velocity.XY.x
    property  real      nexty :     realy + velocity.XY.y

    property  variant   velocity:   V.vectorPolarDegrees(45, 1)

    signal              border_bounce


    function move() {
        var temp_velocity = velocity;

        if(realx+velocity.XY.x-radius <=0   &&  velocity.XY.x<0)
            temp_velocity.XY.x *= -1
        if(realx+velocity.XY.x+radius >= parent.width  &&  velocity.XY.x>0)
            temp_velocity.XY.x *= -1

        if(realy+velocity.XY.y-radius <=0   &&  velocity.XY.y<0)
            temp_velocity.XY.y *= -1
        if(realy+velocity.XY.y+radius >= parent.height  &&  velocity.XY.y>0)
            temp_velocity.XY.y *= -1

        if(velocity.XY.x !== temp_velocity.XY.x  ||  velocity.XY.y !== temp_velocity.XY.y)
        {
            velocity = temp_velocity
            border_bounce()
        }

        realx = nextx;          x = realx - radius
        realy = nexty;          y = realy - radius
        nextx += velocity.XY.x
        nexty += velocity.XY.y
    }
}
