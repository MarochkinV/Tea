import {Component, OnInit, OnDestroy, PLATFORM_ID, Inject} from '@angular/core';
import {timer, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  showPopup = false;
  private destroy$ = new Subject<void>();
  private popupSubscription: Subscription | null = null;

  get shouldShowPopup(): boolean {
    const dontShow = localStorage.getItem('dontShowTeaPopup');
    return !dontShow || dontShow !== 'true';
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
    this.showPopupWithDelay();
    this.initWow();
  }

  initWow(): void {
    // Проверяем, что в браузере
    if (isPlatformBrowser(this.platformId)) {
      // @ts-ignore
      import('wow.js').then(WowModule => {
        const WOW = WowModule.default;

        new WOW({
          boxClass: 'wow',
          animateClass: 'animate__animated',
          offset: 0,
          mobile: true,
          live: true
        }).init();

        // После инициализации, если есть динамический контент
        setTimeout(() => {
          if (typeof (window as any).WOW !== 'undefined') {
            (window as any).WOW.sync();
          }
        }, 1000);
      }).catch(error => {
        console.error('Не удалось загрузить WOW.js:', error);
      });
    }
  }

  showPopupWithDelay(): void {
    if (!this.shouldShowPopup) {
      return;
    }

    this.popupSubscription = timer(10000)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.showPopup = true;
      });
  }

  closePopup(): void {
    this.showPopup = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }
}
