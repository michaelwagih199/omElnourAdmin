import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Governorate } from 'src/app/services/models/governorate';
import { GovernorateServiceService } from 'src/app/services/data/governorate-service.service';
import { PharmacyService } from 'src/app/services/data/pharmacy.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { Pharmacy } from 'src/app/services/models/pharmacy';

@Component({

  selector: 'app-pharmacies',
  templateUrl: './pharmacies.component.html',
  styleUrls: ['./pharmacies.component.css']

})

export class PharmaciesComponent implements OnInit {

  selectedGovernorateValue = null;
  goverFilterValue = null;
  selectFilterSearchValue = null;
  goverId: number = null;
  isVisible = false;
  message = "Add pharmacy"
  pharmacyForm: FormGroup
  saveButtonCheck = 'Save'
  searchValue: string = null;

  pharmacy: Pharmacy = new Pharmacy()

  // data
  pharmacyCodeList: Array<string> = new Array();;
  pharmacyNameList: any;
  governoratesList: Governorate[];
  // pharmacyList: Observable<Pharmacy[]>;
  pharmacyList: Pharmacy[];


  constructor(private fb: FormBuilder,
    private govenorateService: GovernorateServiceService,
    private pharmacyService: PharmacyService,
    private modal: NzModalService,
    private notification: NzNotificationService) {

    this.filteredOptions = this.options;
  }

  ngOnInit(): void {
    // this.resetForm()
    this.retrievePharmacies()
    this.retrieveGovernorate()
    // console.log(this.goverFilterValue)
  }

  showModal(): void {
    // this.resetForm()
    this.isVisible = true
  }


  handleCancel(): void {
    this.isVisible = false;
    this.pharmacy = new Pharmacy()
  }

  getGoverIdSubmit() {
    this.governoratesList.filter(s => {
      if (s.governorateName == this.selectedGovernorateValue) {
        return this.goverId = s.id;
      }
    });
  }


  onSubmit() {
    //console.log(this.pharmacy.pharmacyCode)
    this.getGoverIdSubmit()
    this.save();
    this.pharmacy = new Pharmacy()
  }

  /**
   * create pharmacy
   */
  save() {
    if (this.saveButtonCheck == 'Save') {
      this.pharmacyService.createPharmacy(this.pharmacy, this.goverId)
        .subscribe(data => {
          console.log(data)
          this.retrievePharmacies()
          this.createNotification('success', 'Success', 'Pharmacy added succesfully')
          this.isVisible = false
        }, error => console.log(error));

    } else if (this.saveButtonCheck == 'Update') {
      this.pharmacyService.update(this.pharmacy.id, this.pharmacy).subscribe(
        response => {
          console.log(response)
          this.retrievePharmacies()
          this.createNotification('Success', 'Success', 'Pharmacy Updated Succesfully')
          this.isVisible = false
        },
        error => {
          console.log(error);
        });

    }

  }



  /**
   * get service data
   */

  retrievePharmacies() {
    this.pharmacyService.getAll()
      .subscribe(
        data => {
          this.pharmacyList = data;
        },
        error => {
          console.log(error);
        });
  }

  retrieveGovernorate() {
    this.govenorateService.getFlightsData()
      .subscribe(
        data => {
          this.governoratesList = data;
          //console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  onDelete(id, name) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Pharmacy?',
      nzContent: '<b style="color: red;">Pharmacy Name : ' + name + '</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK')
        this.pharmacyService.delete(id).subscribe(
          response => {
            console.log(response)
            this.createNotification('success', 'Success', 'Pharmacy Deleted succesfully')
            this.retrievePharmacies()
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
    this.findFarmacyById(id)
    this.saveButtonCheck = 'Update'
    this.isVisible = true;
  }


  findFarmacyById(id: number) {
    this.pharmacyService.getPharmcyById(id).subscribe(
      response => {
        this.pharmacy = response
      },
      error => {
        console.log(error);
      });

  }

  //helper uiux
  createNotification(type: string, title: string, description): void {
    this.notification.create(
      type,
      title,
      description
    );
  }

  /*
  getPharmacyCode() {
   for (let index = 0; index < this.pharmacyList.length; index++) {
    this.pharmacyCodeList.push(this.pharmacyList[index].pharmacyCode)
   }
    console.log(this.pharmacyCodeList)
  }
  */

  search() {
    if (this.selectFilterSearchValue == 'pharmacyCode' && this.searchValue != null) {
      this.filterPharmcyByPharmacyCodes(this.searchValue)
    } else if (this.selectFilterSearchValue == null || this.searchValue == null) {
      this.retrievePharmacies()
      this.createNotification('warning', 'warninb', 'Search filter not selected')
    }else if(this.selectFilterSearchValue == 'PharmacyName' && this.searchValue != null){
      this.filterPharmcyByPharmacyName(this.searchValue)
    }
    console.log(this.searchValue)
  }


  onChange(value: number): void {
    if (value == null) {
      this.retrievePharmacies()
    } else {
      this.filterPharmcyByGoverId(value)
    }
  }

  onSearchFilterChange(value: any): void {
    if (value == 'pharmacyCode') {
      this.getPharmacyCodes()
    } else if (value == 'PharmacyName') {
      this.getPharmacyNames()
    } else
      this.retrievePharmacies()

    console.log(value)
  }

  filterPharmcyByGoverId(goverId: number) {
    this.pharmacyService.filterPharmcyByGoverId(goverId)
      .subscribe(
        data => {
          this.pharmacyList = data;
        },
        error => {
          console.log(error);
        });
  }

  filterPharmcyByPharmacyCodes(code: string) {
    this.pharmacyService.filterPharmcyByPharmacyCode(code)
      .subscribe(
        data => {
          this.pharmacyList = data;
        },
        error => {
          console.log(error);
        });
  }

  filterPharmcyByPharmacyName(code: string) {
    this.pharmacyService.filterPharmcyByPharmacyName(code)
      .subscribe(
        data => {
          this.pharmacyList = data;
        },
        error => {
          console.log(error);
        });
  }


  filteredOptions: string[] = [];
  options = [];
  onSearchChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  getPharmacyCodes() {
    this.pharmacyService.getPharmacyCodes()
      .subscribe(
        data => {
          this.options = data;
        },
        error => {
          console.log(error);
        });
  }

  getPharmacyNames() {
    this.pharmacyService.getPharmacyNames()
      .subscribe(
        data => {
          this.options = data;
        },
        error => {
          console.log(error);
        });
  }

}

