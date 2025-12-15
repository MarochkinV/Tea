//main.component.ts
import {Component, OnInit, OnDestroy} from '@angular/core';
import {timer, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

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

  ngOnInit(): void {
    this.showPopupWithDelay();
  }

  showPopupWithDelay(): void {
    if (!this.shouldShowPopup) {
      return;
    }

    // Создаем таймер на 10 секунд
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
