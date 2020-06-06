import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { VoucherOrderDetails } from 'src/app/services/models/voucherDetails';
import { VoucherDetailsService } from 'src/app/services/data/voucher-details.service';

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
    private voucherDetailsService:VoucherDetailsService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.orderId = params['id']
      console.log(this.orderId)
    });
    this.retriveOrderDetails(this.orderId)
  }

  /**
   * data
   */

  retriveOrderDetails(id) {
    this.voucherDetailsService.getAll()
    .subscribe(
      data => {
        this.voucherDetsilsList = data;
      },
      error => {
        console.log(error);
      });

  }

  toVouchers(){
    this.router.navigate([`/voucher`])
  }

}
