import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssortmentSliderComponent } from './assortment-slider.component';

describe('AssortmentSliderComponent', () => {
  let component: AssortmentSliderComponent;
  let fixture: ComponentFixture<AssortmentSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssortmentSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssortmentSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
