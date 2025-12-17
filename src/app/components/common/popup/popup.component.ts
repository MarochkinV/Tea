import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Input() isVisible = false;
  @Output() closePopup = new EventEmitter<void>();
  constructor(private router: Router) {}

  close(): void {
    this.closePopup.emit();
  }

  goToCatalog(): void {
    this.close();
    this.router.navigate(['/catalog']);
  }
}
