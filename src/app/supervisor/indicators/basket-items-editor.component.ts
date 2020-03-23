import { Component, OnInit, Input } from '@angular/core';
import { Indicator, IndicatorsService, BasketItemsService, Basket, BasketItem } from '../../core';

@Component({
  selector: 'basket-items-editor',
  templateUrl: './basket-items-editor.component.html'
})
export class BasketItemsEditorComponent implements OnInit {
  @Input() indicator: Indicator;
  errors: Object;
  isSubmitting = false;
  basket: Basket = {} as Basket;
  indicators: Array<Indicator> = [];
  selectedItem: BasketItem;
  selectedWeight: Number = 0;
  inputedIndicator: Indicator;
  inputedWeight: Number = 0;

  constructor (
    private indicatorsService: IndicatorsService,
    private basketItemsService: BasketItemsService
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.indicatorsService.query().subscribe(
      data => {
        this.indicators = data;
    });
  }

  loadBasket(): void {
    this.basketItemsService.get(this.indicator.id).subscribe(
      data => {
        this.basket = data;
        console.log(this.basket)
      });
        // this.indicatorsService.query().subscribe(indicators => {
        //   this.indicators = indicators.filter(
        //     e => {
        //       let toReturn = true;
        //       if (e.id === this.indicator.id)
        //         return false;
        //       this.basketItens.forEach(i => {
        //         if (i.indicator.id === e.id) {
        //           toReturn = false;
        //         }
        //       });
        //       return toReturn;
        //     }
        //   );
        // });
    //   }
    // );
  }

  add(): void {
    // this.isSubmitting = true;
    // this.errors = null;

    // console.log(this.inputedIndicator)
    // console.log(this.inputedWeight)

    // console.log('ahhhhhhhhhhh')
    // console.log(this.inputedIndicator.id)

    // var newIndicator: BasketItem;
    // newIndicator.indicator = this.inputedIndicator;
    // console.log('bbbbb')
    // newIndicator.weight = this.inputedWeight;
    // console.log('ccccc')
    // // Object.assign(newIndicator, {indicator: this.inputedIndicator.id, weight: this.inputedWeight});
    // // console.log(newIndicator)
    // this.basket.indicators.push(newIndicator)

    // this.basketItemsService.put(
    //   this.indicator.id,
    //   this.basket.indicators
    // ).subscribe(
    //   basketItem => {
    //     this.inputedIndicator = null;
    //     this.inputedWeight = 0;
    //     this.loadBasket();
    //     console.log(basketItem);

    //     this.isSubmitting = false;
    //   }
    // );

    // this.basketItemsService.set(
    //   this.indicator.id,
    //   this.inputedIndicator.id,
    //   this.inputedWeight
    // ).subscribe(
    //   basketItem => {
    //     this.inputedIndicator = null;
    //     this.inputedWeight = 0;

    //     this.loadBasket();

    //     console.log(basketItem);

    //     this.isSubmitting = false;
    //   }
    // );
  }

  remove(indicatorId): void {
    this.isSubmitting = true;
    this.errors = [];

    this.basketItemsService.destroy(this.indicator.id, indicatorId).subscribe(
      data => {
        this.loadBasket();
        this.isSubmitting = false;
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  select(basketItem): void {
    if (!this.selectedItem || basketItem.id !== this.selectedItem.id) {
      this.selectedItem = basketItem;
      this.selectedWeight = basketItem.weight;
    }
  }

  updateWeight(): void {
    this.basketItemsService.set(this.indicator.id,this.selectedItem.indicator.id,this.selectedWeight).subscribe(
      basketItem => {
        this.selectedItem.weight = basketItem.weight;
        this.selectedWeight = basketItem.weight;

        this.loadBasket();
      }
    );
  }
}