//import QtQuick 1.0
import QtQuick 2.0
import QtMultimedia 5.0

import "vector.js" as Vector
import "mobile_objects.js" as Mobo


Rectangle {
    width: 360
    height: 360


    Item {
        id:             movible_objects
        anchors.fill:   parent

        Component.onCompleted: {
            for(var i=0; i<10; ++i)
                Mobo.create_balls();
        }
        function move() {
            Mobo.move()
        }



        Ball {
            radius: 15
            color: "red"
            direction: new Vector.Polar_degrees(Math.random()*360, 3)
            onBorder_bounce: click_sound.play()
            Timer {
                interval: 2; running: true; repeat: true;
                onTriggered: parent.move()
            }
        }
    }


    Timer {
        interval: 2; running: true; repeat: true;
        onTriggered: movible_objects.move()
    }

    SoundEffect {
        id:         click_sound
        source:     "click_one.wav"
    }
}
