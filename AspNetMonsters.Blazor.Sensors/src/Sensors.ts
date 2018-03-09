declare var Blazor: any;

var registerFunction: (identifier: string, implementation: Function) => void = Blazor.registerFunction;
var platform = Blazor.platform;
var AmbientLightSensor: any;
var sensors: object;

registerFunction('AspNetMonsters_Blazor_StartAmbientLightSensor', (requestId) => {
    if ('AmbientLightSensor' in window) {
        var sensor = new AmbientLightSensor();
        sensors[requestId] = sensor;
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
        return "No ambient light sensor available";
    }
});

registerFunction('AspNetMonsters_Blazor_StopAmbientLightSensor', (requestId) => {
    if ('AmbientLightSensor' in window) {
        if (sensors[requestId]) {
            sensors[requestId].stop();
            delete sensors[requestId];
        }
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