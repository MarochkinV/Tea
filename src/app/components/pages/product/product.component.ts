import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ProductCard} from '../../../types/product.card';
import {delay} from "rxjs";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: ProductCard | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.loadProduct(productId);
    });
  }

  loadProduct(id: string): void {
    this.isLoading = true;
    this.error = null;

    this.http.get<ProductCard>(`https://testologia.ru/tea?id=${id}`)
      //Тестовая задержка для проверки лоадера
      .pipe(
        delay(1500)
      )
      .subscribe({
        next: (data) => {
          this.product = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Ошибка при загрузке товара:', err);
          this.error = 'Не удалось загрузить данные товара';
          this.isLoading = false;
        }
      });

  }
}
