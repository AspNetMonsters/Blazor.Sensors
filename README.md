# AspNetMonsters.Blazor.Sensors
This package provides Blazor applications with access to the browser sensor apis. Currently only the [AmbientLightSensor api](https://developer.mozilla.org/en-US/docs/Web/API/AmbientLightSensor) is supported. 

## Usage
1) In your Blazor app, add the `AspNetMonsters.Blazor.Sensors` [NuGet package](https://www.nuget.org/packages/AspNetMonsters.Blazor.Sensors/)

    ```
    Install-Package AspNetMonsters.Blazor.Sensors -IncludePrerelease
    ```

1) In your Blazor app's `Program.cs`, register the `AmbientLightSensorService`.

    ```
    var serviceProvider = new BrowserServiceProvider(configure =>
    {
        configure.AddSingleton<AmbientLightSensorService>();
    });
    ```

1) Now you can inject the `AmbientLightSensorService` into any Blazor page and use it like this:

    ```
    @using AspNetMonsters.Blazor.Sensors
    @inject AmbientLightSensorService sensorService
    <h1>Let there be light!</h1>

    <h3>@sensor?.Illuminance</h3>


    <button onclick=@Stop>Stop</button>
    <button onclick=@Start>Start</button>


    @functions 
    {
        AmbientLightSensor sensor;

        protected override void OnInit()
        {
            Start();
        }

        private void Start()
        {
            sensor = sensorService.StartReading(() =>
            {
                StateHasChanged();
            });
        }

        private void Stop()
        {
            if (sensor != null)
            {
                sensorService.StopReading(sensor);
                sensor = null;
            }
        }
    }

    ```
