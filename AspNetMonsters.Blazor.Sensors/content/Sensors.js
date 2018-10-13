var AspNetMonsters_Blazor_Sensors =
    function () {

        "use strict";
        var sensors = {};


        function dispatchResponse(dotnetHelper, id, hasReading, activated, illuminance) {
            dotnetHelper.invokeMethodAsync('ReceiveResponse', id, hasReading.toString(), activated.toString(), illuminance.toString())
                .then(r => console.log(r));
        }

        return {
            startAmbientLightSensor: function (dotnetHelper, requestId) {
                if ('AmbientLightSensor' in window) {
                    var sensor = new AmbientLightSensor();
                    sensors[requestId] = sensor;
                    sensor.onreading = function () {
                        dispatchResponse(dotnetHelper, requestId, sensor.hasReading, sensor.activated, sensor.illuminance);
                    };
                    sensor.onerror = function (event) {
                        console.log(event.error.name, event.error.message);
                    };
                    sensor.start();
                }
                else {
                    return "No ambient light sensor available";
                }
            },
            stopAmbientLightSensor: function (requestId) {
                if ('AmbientLightSensor' in window) {
                    if (sensors[requestId]) {
                        sensors[requestId].stop();
                        delete sensors[requestId];
                    }
                }
            }
        };
    }();
