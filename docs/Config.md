# Config

## Usage

Add the following to your host app.module.ts

```javascript
export function initConfig(configService: CoreConfigLoaderService) {
  // load the config file in this function
  return () => configService.init(CoreConfigLoaderModels.AppConfigsEnum.YOUR_APP_NAME);
}
```

```javascript
providers: [
  {
    provide: APP_INITIALIZER,
    useFactory: initConfig,
    deps: [CoreConfigLoaderService],
    multi: true,
  },
],
```

Now you should be able to access the config like this

```javascript
public $config = this.coreConfigLoaderService.getConfig<CoreConfigLoaderModels.IHostDndConfig>();
constructor(private coreConfigLoaderService: CoreConfigLoaderService) {}
```

## Init

### Shared Assets

1. create the shared assets directory in `libs/shared/assets`
2. load this into your host app `project.json`'s `target/build/options/assets`

```json
{
  "glob": "**/*",
  "input": "./libs/shared/assets/",
  "output": "./assets"
}
```

### CoreConfigLoader

- `npx nx g @nx/angular:lib core/config-loader`

#### CoreConfigLoaderService

- `npx nx generate @schematics/angular:service data-access/core-config-loader --project=core-config-loader --no-interactive`
