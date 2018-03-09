# AspNetMonsters.Blazor.Sensors
This package provides Blazor applications with access to the browser sensor apis. Currently only the `AmbientLightSensor` api is supported

## Usage
1) In your Blazor app, add the `AspNetMonsters.Blazor.Sensors` [NuGet package](https://www.nuget.org/packages/AspNetMonsters.Blazor.Sensors/)

    ```
    Install-Package AspNetMonsters.Blazor.Sensors -IncludePrerelease
    ```

1) In your app's `index.html`, reference `https://blazor.blob.core.windows.net/bjs/Sensors.js`. Place this reference _after_ the `blazor-boot` script. 

    ```
    <script type="blazor-boot"></script>
    <script src="https://blazor.blob.core.windows.net/bjs/Sensors.js"> </script>
    ```

    *Note:* Eventually, this JS file will be embedded in the nuget package but that feature of Blazor isn't released yet. For now, we are hosting the file in Azure blob storage to make it easy for you to reference the file.

1) In your Blazor app's `Program.cs`, register the 'AmbientLightSensorService'.

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

    <button @onclick(Stop)>Stop</button>
    <button @onclick(Start)>Start</button>

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
