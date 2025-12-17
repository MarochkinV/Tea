import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  isSubmitting: boolean = false;
  orderSuccess: boolean = false;
  submitError: boolean = false;

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const digitsOnly = value.replace(/[^\d]/g, '');
    const validPattern: boolean = /^\+?\d+$/.test(value);
    const validLength: boolean = digitsOnly.length === 11;

    if (!validPattern || !validLength) {
      return {phoneValidator: true};
    }
    return null;
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s]*$/)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ\s]*$/)]],
      phone: ['', [Validators.required, this.phoneValidator.bind(this)]],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      product: [{value: '', disabled: true}, Validators.required],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ0-9\s\-\/]*$/)]],
      comment: ['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const productName = params['product'] || 'Чайный набор';
      this.orderForm.get('product')?.setValue(productName);
    });
  }

  onSubmit(): void {
    if (this.orderForm.invalid) {
      Object.keys(this.orderForm.controls).forEach(key => {
        const control = this.orderForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitError = false;

    const formData: string = this.orderForm.getRawValue();

    this.http.post<{ success: number }>('https://testologia.ru/order-tea', formData)
      .pipe(
        catchError(error => {
          console.error('Ошибка при отправке заказа:', error);
          this.isSubmitting = false;
          this.submitError = true;
          return throwError(() => new Error(error));
        })
      )
      .subscribe(response => {
        this.isSubmitting = false;
        if (response && response.success === 1) {
          this.orderSuccess = true;
          //Закрываем сообщение через десять сек
          setTimeout((): void => {
            this.goToCatalog();
          }, 10000);
        } else {
          this.submitError = true;
        }
      });
  }

  goToCatalog(): void {
    this.router.navigate(['/catalog']);
  }
}
