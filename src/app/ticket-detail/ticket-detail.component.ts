import { Component, OnInit } from '@angular/core';
import {Ticket} from '../model/ticket.model';
import {SharedService} from '../services/shared.service';
import {TicketService} from '../services/ticket.service';
import {ActivatedRoute} from '@angular/router';
import {ResponseApi} from '../model/response-api';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  ticket = new Ticket('', 0, '', '', '', '', null, null, '', null);
  shared: SharedService;
  classCss: {};
  message: {};

  constructor(private ticketService: TicketService,
              private route: ActivatedRoute) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];
    if (id !== undefined) {
      this.findById(id);
    }
  }

  findById(id: string) {
    this.ticketService.findById(id)
      .subscribe((responseApi: ResponseApi)  => {
          this.ticket = responseApi.data;
          this.ticket.data = new Date(this.ticket.data).toISOString();
        }, err => {
          this.showMessage({
            type: 'error',
            text: err['error']['errors'][0]
          });
        }
      );
  }

  changeStatus(status: string): void {
    this.ticketService.changeStatus(status, this.ticket)
      .subscribe((responseApi: ResponseApi) => {
        this.ticket = responseApi.data;
        this.ticket.data = new Date(this.ticket.data).toISOString();
        this.showMessage({
          type: 'success',
          text: 'Successfully changed status'
        });
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
    }
    this.classCss['alert-' +  type] = true;
  }

}
