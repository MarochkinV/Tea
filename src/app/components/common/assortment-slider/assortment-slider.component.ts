import {Component, OnInit} from '@angular/core';
import {ProductSlide} from '../../../types/product.slide';

@Component({
  selector: 'assortment',
  templateUrl: './assortment-slider.component.html',
  styleUrls: ['./assortment-slider.component.scss']
})
export class AssortmentSliderComponent implements OnInit {

  //Массив с продуктами
  productSlides: ProductSlide[] = [
    {
      id: 1,
      title: 'Сладкий апельсин',
      description: 'Описание для сладкого апельсина...',
      price: 4.50,
      grams: 100,
      imagePack: '../../assets/images/tea_pack.png',
      imageScattering: '../../assets/images/tea_scatt_L.png',
      imageIcon: '../../assets/images/orange_item_image.png',
      imageIconAlt: 'апельсин'
    },
    {
      id: 2,
      title: 'Чай с облепихой и грушей',
      description: 'Описание для чая с облепихой и грушей...',
      price: 5.10,
      grams: 100,
      imagePack: '../../assets/images/tea_pack.png',
      imageScattering: '../../assets/images/tea_scatt_R.png',
      imageIcon: '../../assets/images/pear_item_image.png',
      imageIconAlt: 'груша'
    },
    {
      id: 3,
      title: 'Ароматный имбирь',
      description: 'Описание для ароматного имбиря...',
      price: 4.50,
      grams: 100,
      imagePack: '../../assets/images/tea_pack.png',
      imageScattering: '../../assets/images/tea_scatt_L.png',
      imageIcon: '../../assets/images/Имбирь_4.png',
      imageIconAlt: 'имбирь'
    },
    {
      id: 4,
      title: 'Чай с лимоном',
      description: 'Описание для чая с лимоном...',
      price: 4.50,
      grams: 100,
      imagePack: '../../assets/images/tea_pack.png',
      imageScattering: '../../assets/images/tea_scatt_L.png',
      imageIcon: '../../assets/images/Лимон_2.png',
      imageIconAlt: 'лимон'
    },
    {
      id: 5,
      title: 'Мятный чай',
      description: 'Описание для мятного чая...',
      price: 4.50,
      grams: 100,
      imagePack: '../../assets/images/tea_pack.png',
      imageScattering: '../../assets/images/tea_scatt_L.png',
      imageIcon: '../../assets/images/Мята_3.png',
      imageIconAlt: 'мята'
    },
    {
      id: 6,
      title: 'Клубничка',
      description: 'Описание для клубнички...',
      price: 4.50,
      grams: 100,
      imagePack: '../../assets/images/tea_pack.png',
      imageScattering: '../../assets/images/tea_scatt_L.png',
      imageIcon: '../../assets/images/Клубника_1.png',
      imageIconAlt: 'клубника'
    }
  ];

  //Группа слайдов
  slideGroups: ProductSlide[][] = [];

  //Регулирование веса чая
  adjustWeight(slide: ProductSlide, operation: 'plus' | 'minus'): void {
    const step = 100;
    const basePrice = slide.price / slide.grams * 100;
    if (operation === 'plus') {
      if (slide.grams < 10000) {
        slide.grams += step;
        slide.price = basePrice * (slide.grams / 100);
      }
    } else {
      if (slide.grams > 100) {
        slide.grams -= step;
        slide.price = basePrice * (slide.grams / 100);
      }
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.groupSlides();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private groupSlides(): void {
    this.slideGroups = [];
    const itemsPerSlide = window.innerWidth < 769 ? 1 : 2; // 1 на мобильном, 2 на десктопе

    for (let i = 0; i < this.productSlides.length; i += itemsPerSlide) {
      this.slideGroups.push(this.productSlides.slice(i, i + itemsPerSlide));
    }
  }

  private onResize(): void {
    this.groupSlides();
    this.currentIndex = Math.min(this.currentIndex, this.slideGroups.length - 1);
  }

  currentIndex = 0;

  goToSlide(index: number): void {
    if (index >= 0 && index < this.slideGroups.length) {
      this.currentIndex = index;
    }
  }

  goToPrevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slideGroups.length) % this.slideGroups.length;
  }

  goToNextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slideGroups.length;
  }
}

