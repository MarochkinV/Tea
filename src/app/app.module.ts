import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from './components/footer/footer.component';
import { ReviewsSliderComponent } from './components/reviews-slider/reviews-slider.component';
import { AssortmentSliderComponent } from './components/assortment-slider/assortment-slider.component';
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AssortmentSliderComponent,
    ReviewsSliderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent]
})
export class AppModule { }
