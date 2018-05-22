"use strict";
var registerFunction = Blazor.registerFunction;
var platform = Blazor.platform;
var AmbientLightSensor;
var sensors = {};
registerFunction('AspNetMonsters_Blazor_StartAmbientLightSensor', function (requestId) {
    if ('AmbientLightSensor' in window) {
        var sensor = new AmbientLightSensor();
        sensors[requestId] = sensor;
        sensor.onreading = function () {
            dispatchResponse(requestId, sensor.hasReading, sensor.activated, sensor.illuminance);
        };
        sensor.onerror = function (event) {
            console.log(event.error.name, event.error.message);
        };
        sensor.start();
    }
    else {
        return "No ambient light sensor available";
    }
});
registerFunction('AspNetMonsters_Blazor_StopAmbientLightSensor', function (requestId) {
    if ('AmbientLightSensor' in window) {
        if (sensors[requestId]) {
            sensors[requestId].stop();
            delete sensors[requestId];
        }
    }
});
var assemblyName = "AspNetMonsters.Blazor.Sensors";
var namespace = "AspNetMonsters.Blazor.Sensors";
var type = "AmbientLightSensorService";
function dispatchResponse(id, hasReading, activated, illuminance) {
    var receiveResponseMethod = platform.findMethod(assemblyName, namespace, type, "ReceiveResponse");
    platform.callMethod(receiveResponseMethod, null, [
        platform.toDotNetString(id),
        platform.toDotNetString(hasReading.toString()),
        platform.toDotNetString(activated.toString()),
        platform.toDotNetString(illuminance.toString())
    ]);
}
//# sourceMappingURL=Sensors.js.map