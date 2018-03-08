declare var Blazor: any;

var registerFunction: (identifier: string, implementation: Function) => void = Blazor.registerFunction;
var platform = Blazor.platform;
var AmbientLightSensor: any;

registerFunction('AspNetMonsters_Blazor_StartAmbientLightSensor', (requestId) => {
    if ('AmbientLightSensor' in window) {
        var sensor = new AmbientLightSensor();
        sensor.onreading = function () {
            dispatchResponse(requestId, sensor.hasReading,
                sensor.activated,
                sensor.illuminance);
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

let assemblyName = "AspNetMonsters.Blazor.Sensors";
let namespace = "AspNetMonsters.Blazor.Sensors";
let type = "AmbientLightSensorService";
function dispatchResponse(id: string, hasReading, activated, illuminance) {
    let receiveResponseMethod = platform.findMethod(
        assemblyName,
        namespace,
        type,
        "ReceiveResponse"
    );


    platform.callMethod(receiveResponseMethod, null, [
        platform.toDotNetString(id),
        platform.toDotNetString(hasReading.toString()),
        platform.toDotNetString(activated.toString()),
        platform.toDotNetString(illuminance.toString())
    ]);
}