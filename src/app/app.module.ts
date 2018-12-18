import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {MaxTimeValidator} from './directives/max-time.directive';
import {MinTimeValidator} from './directives/min.directive';
import {MaterialModule} from './material.module';

@NgModule({
    declarations: [
        AppComponent,
        MinTimeValidator,
        MaxTimeValidator
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
