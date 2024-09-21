import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { coreAuthRoutes } from './lib.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUser from './+state/user.reducer';
import { UserEffects } from './+state/user.effects';
import { UserFacade } from './+state/user.facade';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { CoreConfigLoaderService } from '@ttrpg-ui/core/config-loader';

export function getFirebaseConfig(coreConfigLoaderService: CoreConfigLoaderService) {
  return coreConfigLoaderService.getAppConfig<any>()().firebase;
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(coreAuthRoutes),
    RouterModule,
    StoreModule.forFeature(fromUser.USER_FEATURE_KEY, fromUser.userReducer),
    EffectsModule.forFeature([UserEffects]),
    AngularFireModule,
    HttpClientModule,
  ],
  providers: [
    UserFacade,
    {
      provide: FIREBASE_OPTIONS,
      deps: [CoreConfigLoaderService],
      useFactory: getFirebaseConfig,
    },
  ],
})
export class CoreAuthModule {}
