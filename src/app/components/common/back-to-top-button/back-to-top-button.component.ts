import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'back-to-top-button',
  templateUrl: './back-to-top-button.component.html',
  styleUrls: ['./back-to-top-button.component.scss']
})
export class BackToTopButtonComponent {
  showBackToTopButton: boolean = false;
  isMobileScreen: boolean = false;
  private readonly MOBILE_BREAKPOINT = 766;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.isMobileScreen = window.innerWidth <= this.MOBILE_BREAKPOINT;
    this.showBackToTopButton = window.pageYOffset > 300 && this.isMobileScreen;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.isMobileScreen = window.innerWidth <= this.MOBILE_BREAKPOINT;
    this.showBackToTopButton = window.pageYOffset > 300 && this.isMobileScreen;
  }

  scrollToTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

}
