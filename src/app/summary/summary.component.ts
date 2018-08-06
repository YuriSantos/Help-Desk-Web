import { Component, OnInit } from '@angular/core';
import {Summary} from '../model/summary.model';
import {TicketService} from '../services/ticket.service';
import {ResponseApi} from '../model/response-api';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  classCss: {};
  message: {};
  summary: Summary = new Summary();

  constructor(
    private ticketService: TicketService
  ) { }

  ngOnInit() {
    this.ticketService.summary()
      .subscribe((responseApi: ResponseApi) => {
        this.summary = responseApi.data;
      }, err => {
        this.showMessage({
            type: 'error',
            text: err['error']['errors'][0]
          });
        });
  }

  private showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 6000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    };
    this.classCss['alert-' +  type] = true;
  }

}
