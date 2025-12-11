//reviews-slider.component.ts
import {Component} from '@angular/core';
import {ReviewSlide} from '../../types/review.slide';

@Component({
  selector: 'reviews-slider',
  templateUrl: './reviews-slider.component.html',
  styleUrls: ['./reviews-slider.component.scss']
})
export class ReviewsSliderComponent {

  reviewSlides: ReviewSlide[] = [
    {
      name: 'Анастасия',
      description: 'В сегодняшнем отзыве хочу поделиться своими впечатлениями от чёрного цейлонского чая IMPRA (мелколистовой 400 г). В этом году я ездила в свой родной город и купила там большую упаковку этого чая. Никогда не думала, что буду писать на него отзыв, для меня это не просто чай, это частичка детства, воспоминаний, кухня бабушки, чаинки в чае, которые я в детстве не любила, ассоциации с чем-то родным.',
      imagePhoto: '../../assets/images/Анастасия.png', // Исправлено
      imagePhotoAlt: 'Фото Анастасии'
    },
    {
      name: 'Константин',
      description: 'Чай с ароматом имбиря – согревает и бодрит! Недавно попробовал этот чай и очень доволен! Аромат имбиря чувствуется сразу – пряный, с легкой остротой, но при этом не резкий. Вкус мягкий, с приятной терпкостью и сладковатым послевкусием. Отлично согревает в холодную погоду и помогает взбодриться утром. Рекомендуйте любителям пряных и тонизирующих чаёв! Обязательно куплю еще.',
      imagePhoto: '../../assets/images/Константин.png', // Исправлено
      imagePhotoAlt: 'Фото Константина'
    },
    {
      name: 'Ксения',
      description: 'Обожаю этот чай! Аромат просто волшебный — как будто только что сорвали спелый апельсин и добавили в чашку. Вкус мягкий, с легкой сладостью и приятной цитрусовой ноткой, без горечи. Отлично согревает и поднимает настроение, особенно в холодные дни. А еще он чудесно сочетается с медом — получается настоящий витаминный напиток! Чай хорошего качества. Однозначно рекомендую всем, кто любит яркие и солнечные вкусы! Буду покупать еще.',
      imagePhoto: '../../assets/images/Ксения.png', // Исправлено
      imagePhotoAlt: 'Фото Ксении'
    }
  ];

  currentIndex = 0;

  goToSlide(index: number): void {
    if (index >= 0 && index < this.reviewSlides.length) {
      this.currentIndex = index;
    }
  }

  goToPrevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.reviewSlides.length) % this.reviewSlides.length;
  }

  goToNextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.reviewSlides.length;
  }
}
