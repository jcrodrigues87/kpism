import { Component, OnInit, Input } from '@angular/core';
import { Indicator, IndicatorsService, BasketItemsService, BasketItem } from '../../core';

@Component({
  selector: 'basket-items-editor',
  templateUrl: './basket-items-editor.component.html'
})
export class BasketItemsEditorComponent implements OnInit {
    
  @Input() indicator: Indicator;
  errors: Object;
  isSubmitting = false;

  indicators: Array<Indicator> = [];
  inputedIndicator: Indicator;
  inputedWeight: Number = 0;

  basketItens: Array<BasketItem> = [];

  selectedItem: BasketItem;

  selectedWeight: Number = 0;

  constructor (
    private indicatorsService: IndicatorsService,
    private basketItemsService: BasketItemsService
  ) {}

  ngOnInit(): void {
    this.loadBasketItems(); 
  }

  add(): void {
    this.isSubmitting = true;
    this.errors = null;

    this.basketItemsService.set(
      this.indicator.id,
      this.inputedIndicator.id,
      this.inputedWeight
    ).subscribe(
      basketItem => {
        this.inputedIndicator = null;
        this.inputedWeight = 0;

        this.loadBasketItems();

        console.log(basketItem);

        this.isSubmitting = false;
      }
    );
  }

  loadBasketItems(): void {
    this.basketItemsService.query(this.indicator.id).subscribe(
      basketItems => {
        this.basketItens = basketItems;

        this.indicatorsService.query().subscribe(indicators => {
          this.indicators = indicators.filter(
            e => {
              let toReturn = true;
              
              if (e.id === this.indicator.id)
                return false;

              this.basketItens.forEach(i => {
                if (i.indicator.id === e.id) {
                  toReturn = false;
                }
              });
  
              return toReturn;
            }
          );
        });
      }
    );
  }

  remove(basketItem): void {
    this.isSubmitting = true;
    this.errors = [];

    this.basketItemsService.destroy(this.indicator.id,basketItem.indicator.id).subscribe(
      data => {
        this.loadBasketItems();
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

        this.loadBasketItems();
      }
    );
  }
}