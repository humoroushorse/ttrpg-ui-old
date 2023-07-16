import { Component, ViewEncapsulation } from '@angular/core';
import { ConfigLoaderModels, CoreConfigLoaderService } from '@ttrpg-ui/core/config-loader';

@Component({
  selector: 'ttrpg-ui-nx-welcome',
  template: `
    MFE-SPELLS: Welcome Component
    <pre><code> {{ $config | async | json }} </code></pre>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {
  public $config = this.coreConfigLoaderService.getConfig<ConfigLoaderModels.IHostDndConfig>();
  constructor(private coreConfigLoaderService: CoreConfigLoaderService) {}
}
