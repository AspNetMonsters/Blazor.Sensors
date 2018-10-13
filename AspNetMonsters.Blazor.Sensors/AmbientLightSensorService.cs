using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetMonsters.Blazor.Sensors
{
    public class AmbientLightSensorService
    {
        static IDictionary<Guid, AmbientLightSensor> _activeSensors = new Dictionary<Guid, AmbientLightSensor>();
        public async Task<AmbientLightSensor> StartReading(Action onReading)
        {
            var requestId = Guid.NewGuid();
            AmbientLightSensor sensor = new AmbientLightSensor(requestId);
            sensor.OnReading = onReading;
            _activeSensors.Add(requestId, sensor);
            await JSRuntime.Current.InvokeAsync<string>(
                 "AspNetMonsters_Blazor_Sensors.startAmbientLightSensor", 
                 new DotNetObjectRef(this),
                 requestId);
            return sensor;
        }

        public async Task StopReading(AmbientLightSensor sensor)
        {
            await JSRuntime.Current.InvokeAsync<string>(
                 "AspNetMonsters_Blazor_Sensors.stopAmbientLightSensor",
                 sensor.Id);
        }

        [JSInvokable]
        public void ReceiveResponse(
            string id,
            string hasReading,
            string activated,
            string illuminance)
        {
            AmbientLightSensor sensor;
            var idVal = Guid.Parse(id);
            sensor = _activeSensors.First(x => x.Key == idVal).Value;
            sensor.HasReading = Convert.ToBoolean(hasReading);
            sensor.Activated = Convert.ToBoolean(activated);
            sensor.Illuminance = Convert.ToDecimal(illuminance);
            sensor.OnReading();
        }
    }
}
