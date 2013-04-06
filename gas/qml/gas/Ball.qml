import QtQuick 2.0
import "vector.js" as Vector

Rectangle {
    radius: 5

    x: realx - radius
    y: realy - radius
    width: radius*2
    height: radius*2
    color: "blue"

    property  real    realx : parent.width/2
    property  real    realy : parent.height/2

    property  variant  direction: new Vector.Polar_degrees(45, 1)
    signal    border_bounce


    function move() {
        var temp_direction = direction;

        if(realx+direction.x-radius <=0   &&  direction.x<0)
            temp_direction.x *= -1
        if(realx+direction.x+radius >= parent.width  &&  direction.x>0)
            temp_direction.x *= -1

        if(realy+direction.y-radius <=0   &&  direction.y<0)
            temp_direction.y *= -1
        if(realy+direction.y+radius >= parent.height  &&  direction.y>0)
            temp_direction.y *= -1

        if(direction.x !== temp_direction.x  ||  direction.y !== temp_direction.y)
        {
            direction = temp_direction
            border_bounce()
        }

        realx += direction.x;   x = realx - radius
        realy += direction.y;   y = realy - radius
    }
}
