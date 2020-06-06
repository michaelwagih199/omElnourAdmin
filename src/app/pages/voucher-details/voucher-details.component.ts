import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { VoucherOrderDetails } from 'src/app/services/models/voucherDetails';

@Component({
  selector: 'app-voucher-details',
  templateUrl: './voucher-details.component.html',
  styleUrls: ['./voucher-details.component.css']
})
export class VoucherDetailsComponent implements OnInit {

  private routeSub: Subscription;
  orderId:number
  voucherDetsilsList:VoucherOrderDetails[]

  constructor(private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.orderId = params['id']
      console.log(this.orderId)
    });
    this.retriveOrderDetails()
  }

  retriveOrderDetails() {
    throw new Error("Method not implemented.");
  }


}
