//import QtQuick 1.0
import QtQuick 2.0
import QtMultimedia 5.0

import "vector.js" as V
import "mobile_objects.js" as Mobo


Rectangle {
    width:                      360
    height:                     360

    property int  num_balls:    0



    Item {
        id:             movible_objects
        anchors.fill:   parent

        Component.onCompleted: {
            Mobo.test()
            for(var i=0; i<parent.num_balls; ++i)
                Mobo.create_ball()
        }


        Ball {
            radius:                 40
            color:                  "red"
            //velocity:              new Vector.Polar_degrees(Math.random()*360, 3)
            onBorder_bounce:        click_sound.play()

            velocity:  V.vectorPolarDegrees(90, 1)
            //velocity:  new Vector.Vpolar_degrees(0, 0)
        }
        Ball {
            radius:                 40
            color:                  "blue"
            realx: 230
            realy: 300

            velocity:  V.vectorPolarDegrees(0, 0)
            //velocity:  V.vectorPolarDegrees(0, 0.2)

        }
    }


    Timer {
        id: timer
        interval: 1; running: true; repeat: true;
        onTriggered: Mobo.move(movible_objects)
    }

    SoundEffect {
        id:         click_sound
        source:     "click_one.wav"
    }
}
