//import QtQuick 1.0
import QtQuick 2.0
import QtMultimedia 5.0

import "vector.js" as Vector
import "mobile_objects.js" as Mobo


Rectangle {
    width:                      360
    height:                     360

    property int  num_balls:    2



    Item {
        id:             movible_objects
        anchors.fill:   parent

        Component.onCompleted: {
            for(var i=0; i<parent.num_balls; ++i)
                Mobo.create_balls();
        }
        function move() {
            Mobo.move()
        }



        Ball {
            id:                     ball
            radius:                 25
            color:                  "red"
            direction:              new Vector.Polar_degrees(Math.random()*360, 3)
            onBorder_bounce:        click_sound.play()
            Component.onCompleted:  Mobo.register(ball)     //  only when created from qml
        }
    }


    Timer {
        id: timer
        interval: 5; running: true; repeat: true;
        onTriggered: movible_objects.move()
    }

    SoundEffect {
        id:         click_sound
        source:     "click_one.wav"
    }
}
