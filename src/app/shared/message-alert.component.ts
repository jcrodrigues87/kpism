import { Component, Input } from '@angular/core';

@Component({
  selector: 'message-alert',
  templateUrl: './message-alert.component.html'
})
export class MessageAlertComponent {
  @Input() message: string;

  close() {
    this.message = "";
  }
}
