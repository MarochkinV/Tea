import {Component, OnInit} from '@angular/core';
import {ProductCard} from "../../../types/product.card";
import {HttpClient} from "@angular/common/http";
import {delay} from "rxjs";

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  products: ProductCard[] = [];
  isLoading = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;

    this.http.get<ProductCard[]>('https://testologia.ru/tea')
      //Тестовая задержка для проверки лоадера
      .pipe(
        delay(1500)
      )
      .subscribe({
        next: (data) => {
          this.products = data;
          this.isLoading = false;
        },
      });
  }
}
