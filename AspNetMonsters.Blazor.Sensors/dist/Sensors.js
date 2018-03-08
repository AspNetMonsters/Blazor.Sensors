"use strict";
var registerFunction = Blazor.registerFunction;
var platform = Blazor.platform;
var AmbientLightSensor;
registerFunction('AspNetMonsters_Blazor_StartAmbientLightSensor', function (requestId) {
    if ('AmbientLightSensor' in window) {
        var sensor = new AmbientLightSensor();
        sensor.onreading = function () {
            dispatchResponse(requestId, sensor.hasReading, sensor.activated, sensor.illuminance);
        };
        sensor.onerror = function (event) {
            console.log(event.error.name, event.error.message);
        };
        sensor.start();
    }
    else {
        return "No location finding";
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