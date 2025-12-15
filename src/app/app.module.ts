import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./components/common/header/header.component";
import { FooterComponent } from './components/common/footer/footer.component';
import { ReviewsSliderComponent } from './components/common/reviews-slider/reviews-slider.component';
import { AssortmentSliderComponent } from './components/common/assortment-slider/assortment-slider.component';
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID } from '@angular/core';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { MainComponent } from './components/pages/main/main.component';
import { CardComponent } from './components/pages/card/card.component';
import {HttpClientModule} from "@angular/common/http";
import { ProductComponent } from './components/pages/product/product.component';
import {RouterModule} from "@angular/router";
import { BackToTopButtonComponent } from './components/common/back-to-top-button/back-to-top-button.component';


registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AssortmentSliderComponent,
    ReviewsSliderComponent,
    CatalogComponent,
    MainComponent,
    CardComponent,
    ProductComponent,
    BackToTopButtonComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent,BackToTopButtonComponent]
})
export class AppModule { }
