import { Component, OnInit, Input } from '@angular/core';
import { Indicator, IndicatorsService, BasketItemsService, Basket, BasketItem } from '../../core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  basketItemForm: FormGroup;
  basketItem: BasketItem;

  selectedItem: BasketItem;
  selectedWeight: number = 0;
  inputedIndicator: Indicator;
  inputedWeight: number = 0;
  totalWeight : number = 0;

  constructor (
    private indicatorsService: IndicatorsService,
    private basketItemsService: BasketItemsService,
    private fb: FormBuilder
  ) {
    this.basketItemForm = this.fb.group({
      indicator: '',
      weight: ''
    });
  }

  ngOnInit(): void {
    this.loadBasket();
  }

  loadBasket(): void {
    this.basketItemsService.get(this.indicator.id).subscribe(
      data => {
        this.basket = data;
        this.totalWeight = 0
        for (var i = 0; i < this.basket.basketItems.length; i++) {
          this.totalWeight += this.basket.basketItems[i].weight;
        }
        this.indicatorsService.query().subscribe(indicators => {
          this.indicators = indicators.filter(
            e => {
              let toReturn = true;
              if (e.id === this.indicator.id)
                return false;
              this.basket.basketItems.forEach(i => {
                if (i.indicator.id === e.id) {
                  toReturn = false;
                }
              });
              return toReturn;
            }
          );
        });
      });
  }

  add(): void {
    this.isSubmitting = true;
    this.errors = null;
    this.basket.basketItems.push(this.basketItemForm.value)
    this.basketItemsService.put(this.indicator.id, this.basket.basketItems).subscribe(
      basketItem => {
        this.basketItemForm.reset();
        this.loadBasket();
        this.isSubmitting = false;
      },
      err => {
        this.errors = err;
        this.basket.basketItems.pop();
        this.isSubmitting = false;
      }
    );
  }

  remove(indicatorId): void {
    this.isSubmitting = true;
    this.errors = [];

    this.basketItemsService.destroy(this.indicator.id, indicatorId).subscribe(
      data => {
        this.selectedItem = undefined;
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
    var temp: number;
    for (var i = 0; i < this.basket.basketItems.length; i++) {
      if (this.basket.basketItems[i].indicator.id == this.selectedItem.indicator.id) {
        temp = this.basket.basketItems[i].weight; 
        this.basket.basketItems[i].weight = this.selectedWeight;
        break;
      }
    }

    this.basketItemsService.put(this.indicator.id, this.basket.basketItems).subscribe(
      basketItem => {
        this.loadBasket();
        this.selectedItem = undefined;
        this.isSubmitting = false;
      },
      err => {
        this.errors = err;
        this.basket.basketItems[i].weight = temp;
        this.selectedItem = undefined;
        this.isSubmitting = false;
      }
    );
  }

}