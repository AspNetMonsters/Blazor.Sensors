using System;

namespace AspNetMonsters.Blazor.Sensors
{
    public class AmbientLightSensor
    {
        private readonly Guid id;
        public AmbientLightSensor(Guid id)
        {
            this.id = id;
        }
        public Guid Id { get; }

        public bool Activated { get; set; }
        public bool HasReading { get; set; }
        public decimal Illuminance { get; set; }

        public Action OnReading { get; set; }
    }
}
