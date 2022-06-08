import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app-component/app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { AppEffects } from './effects/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InitialPageComponent } from './pages/initial-page/initial-page.component';
import { SmallMainMenuComponent } from './components/small-main-menu/small-main-menu.component';
import { PuzzleBuilderModule } from './puzzle-builder/puzzle-builder.module';
import { AspectTestComponent } from './aspect-test/aspect-test.component';
import { AspectTestNodeComponent } from './aspect-test-node/aspect-test-node.component';
import { AspectTestNode2Component } from './aspect-test-node2/aspect-test-node2.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavigationComponent,
    InitialPageComponent,
    SmallMainMenuComponent,
    AspectTestComponent,
    AspectTestNodeComponent,
    AspectTestNode2Component
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    PuzzleBuilderModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
