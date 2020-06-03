import { Component, OnInit } from '@angular/core';
import { VoucherOrder } from 'src/app/services/models/VoucherOrder';
import { FormBuilder } from '@angular/forms';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { VoucherOrderServiceService } from 'src/app/services/data/voucher-order-service.service';
import { Doctor } from 'src/app/services/models/doctor';
import { Governorate } from 'src/app/services/models/governorate';
import { Router } from '@angular/router';
import { DoctorServiceService } from 'src/app/services/data/doctor-service.service';
import { GovernorateServiceService } from 'src/app/services/data/governorate-service.service';
import { VoucherStatuesService } from 'src/app/services/data/voucher-statues.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {
  searchValue: string = null
  selectFilterSearchValue: string = null
  statuesSelectValue:any = null
  isVisible = false;
  saveButtonCheck = 'Save'
  message = "Add vouchers order"
  voucherOrde: VoucherOrder = new VoucherOrder(null,null)
  voucherOrdeList: VoucherOrder[]
  doctorList: Doctor[]
  goverList: Governorate[]
  filteredOptions: string[] = []
  statuesList: string[] = []
  options: string[]
  dateFormat = 'dd/MM/yyy';
  goverSelectValue?: any = null
  doctorSelectValue?: any = null

  constructor(private fb: FormBuilder,
    private voucherService: VoucherOrderServiceService,
    private modal: NzModalService,
    private doctorService: DoctorServiceService,
    private governorateService: GovernorateServiceService,
    private notification: NzNotificationService,
    private voucherStatuesService:VoucherStatuesService,
    private router: Router) {

    this.filteredOptions = this.options;

  }

  ngOnInit(): void {
    this.retrieveVoucherOrder()
  }
  /**
   * events -----
   */

  onSearchChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  onSearchFilterChange(value: string) {
    if (value == 'DoctorCode') {
      this.getCodes()
    } else if (value == 'DoctorName') {
      this.getNames()
    } else
      this.retrieveVoucherOrder()
    console.log(value)
  }

  showModal() {
    this.isVisible = true
    this.retrieveDoctor()
    this.retrieveGovernorate()
    this.retrieveStatues()

  }

  handleCancel(): void {
    this.isVisible = false
    this.voucherOrde = new VoucherOrder()
  }

  onSubmit() {
    this.save()
    this.voucherOrde = new VoucherOrder()
  }

  search() {

    if (this.selectFilterSearchValue == 'DoctorCode' && this.searchValue != null) {
      this.filterByCodes(this.searchValue)
    } else if (this.selectFilterSearchValue == null || this.searchValue == null) {
      this.retrieveVoucherOrder()
      this.createNotification('warning', 'warninb', 'Search filter not selected')
    } else if (this.selectFilterSearchValue == 'DoctorName' && this.searchValue != null) {
      this.filterByName(this.searchValue)
    }
    console.log(this.searchValue)

  }

  onDelete(id) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Pharmacy?',
      nzContent: '<b style="color: red;">Pharmacy Name : ' + name + '</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK')
        this.voucherService.delete(id).subscribe(
          response => {
            console.log(response)
            this.createNotification('success', 'Success', 'Pharmacy Deleted succesfully')
            this.retrieveVoucherOrder()
          },
          error => {
            console.log(error);
          });
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  onEdit(id) {
    this.findById(id)
    this.saveButtonCheck = 'Update'
    this.isVisible = true
  }

  onInfo(id) {
    this.router.navigate(['/voucherDetails'])
  }


  save() {
    if (this.saveButtonCheck == 'Save') {
      this.voucherService.createObject(this.goverSelectValue,this.doctorSelectValue,this.statuesSelectValue,this.voucherOrde)
        .subscribe(data => {
          console.log(data)
          this.retrieveVoucherOrder()
          this.createNotification('success', 'Success', 'Pharmacy added succesfully')
          this.isVisible = false
        }, error => console.log(error));

    } else if (this.saveButtonCheck == 'Update') {
      this.voucherService.update(this.voucherOrde.id, this.voucherOrde).subscribe(
        response => {
          console.log(response)
          this.retrieveVoucherOrder()
          this.createNotification('Success', 'Success', 'Pharmacy Updated Succesfully')
          this.isVisible = false
        },
        error => {
          console.log(error);
        });

    }

  }


  /**
   * data
   */

  retrieveVoucherOrder() {
    this.voucherService.getAll()
      .subscribe(
        data => {
          this.voucherOrdeList = data;
        },
        error => {
          console.log(error);
        });
  }

  retrieveDoctor() {
    this.doctorService.getAll()
      .subscribe(
        data => {
          this.doctorList = data;
        },
        error => {
          console.log(error);
        });
  }

  retrieveStatues() {
    this.voucherStatuesService.getAll()
      .subscribe(
        data => {
          this.statuesList = data;
        },
        error => {
          console.log(error);
        });
  }


  retrieveGovernorate() {
    this.governorateService.getFlightsData()
      .subscribe(
        data => {
          this.goverList = data;
          //console.log(data);
        },
        error => {
          console.log(error);
        });
  }



  findById(id: number) {
    this.voucherService.getById(id).subscribe(
      response => {
        this.voucherOrde = response
      },
      error => {
        console.log(error);
      });

  }

  filterByCodes(code: string) {
    this.voucherService.filterByCode(code)
      .subscribe(
        data => {
          this.voucherOrdeList = data;
        },
        error => {
          console.log(error);
        });
  }

  filterByName(name: string) {
    this.voucherService.filterByName(name)
      .subscribe(
        data => {
          this.voucherOrdeList = data;
        },
        error => {
          console.log(error);
        });
  }


  getCodes() {
    this.voucherService.getCodes()
      .subscribe(
        data => {
          this.options = data;
        },
        error => {
          console.log(error);
        });
  }

  getNames() {
    this.voucherService.getNames()
      .subscribe(
        data => {
          this.options = data;
        },
        error => {
          console.log(error);
        });
  }


  /**
   * helper UIUX
   */
  createNotification(type: string, title: string, description): void {
    this.notification.create(
      type,
      title,
      description
    );
  }

  dateToday: any = Date.now();



}
