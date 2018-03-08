using Microsoft.AspNetCore.Blazor.Browser.Interop;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AspNetMonsters.Blazor.Sensors
{
    public class AmbientLightSensorService
    {
        static IDictionary<Guid, Action<AmbientLightSensorReading>> _activeSensors = new Dictionary<Guid, Action<AmbientLightSensorReading>>();
        public void StartReading(Action<AmbientLightSensorReading> onReading)
        {
            var requestId = Guid.NewGuid();

            _activeSensors.Add(requestId, onReading);
            RegisteredFunction.Invoke<object>("AspNetMonsters_Blazor_StartAmbientLightSensor", requestId);
    
        }

        private static void ReceiveResponse(
            string id,
            string hasReading,
            string activated,
            string illuminance)
        {
            Action<AmbientLightSensorReading> callback;
            var idVal = Guid.Parse(id);
            callback = _activeSensors.First(x => x.Key == idVal).Value;
            callback(new AmbientLightSensorReading
            {
                HasReading = Convert.ToBoolean(hasReading),
                Activated = Convert.ToBoolean(activated),
                Illuminance = Convert.ToDecimal(illuminance)
            });
        }
    }
}
