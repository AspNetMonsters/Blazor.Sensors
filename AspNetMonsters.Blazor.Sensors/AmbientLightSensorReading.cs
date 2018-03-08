namespace AspNetMonsters.Blazor.Sensors
{
    public class AmbientLightSensorReading
    {
        public bool Activated { get; set; }
        public bool HasReading { get; set; }
        public decimal Illuminance { get; set; }
    }
}
