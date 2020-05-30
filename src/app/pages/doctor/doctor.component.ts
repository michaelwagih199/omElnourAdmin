import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/services/models/doctor';
import { FormBuilder } from '@angular/forms';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { DoctorServiceService } from 'src/app/services/data/doctor-service.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  searchValue: string = null
  selectFilterSearchValue: string = null
  isVisible = false;
  saveButtonCheck = 'Save'
  message = "Add pharmacy"

  doctor: Doctor = new Doctor()
  doctorList: Doctor[];
  filteredOptions: string[] = [];

  constructor(private fb: FormBuilder,
    private doctorService: DoctorServiceService,
    private modal: NzModalService,
    private notification: NzNotificationService) {
    this.filteredOptions = this.options;
  }

  ngOnInit(): void {
    this.retrievePharmacies()
  }

  /**
   * events -----
   */

  options = [];
  onSearchChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  onSearchFilterChange(value: string) {
    if (value == 'DoctorCode') {
      this.getCodes()
    } else if (value == 'DoctorName') {
      this.getNames()
    } else
      this.retrievePharmacies()
    console.log(value)
  }

  showModal() {
    this.isVisible = true;

  }
  handleCancel(): void {
    this.isVisible = false;
    this.doctor = new Doctor()
  }

  onSubmit() {
    this.save();
    this.doctor = new Doctor()
  }

  search() {

    if (this.selectFilterSearchValue == 'DoctorCode' && this.searchValue != null) {
      this.filterByCodes(this.searchValue)
    } else if (this.selectFilterSearchValue == null || this.searchValue == null) {
      this.retrievePharmacies()
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
        this.doctorService.delete(id).subscribe(
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


  save() {
    if (this.saveButtonCheck == 'Save') {
      this.doctorService.createDoctor(this.doctor)
        .subscribe(data => {
          console.log(data)
          this.retrievePharmacies()
          this.createNotification('success', 'Success', 'Pharmacy added succesfully')
          this.isVisible = false
        }, error => console.log(error));

    } else if (this.saveButtonCheck == 'Update') {
      this.doctorService.update(this.doctor.id, this.doctor).subscribe(
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
   * datat
   */

  retrievePharmacies() {
    this.doctorService.getAll()
      .subscribe(
        data => {
          this.doctorList = data;
        },
        error => {
          console.log(error);
        });
  }

  findFarmacyById(id: number) {
    this.doctorService.getDoctorById(id).subscribe(
      response => {
        this.doctor = response
      },
      error => {
        console.log(error);
      });

  }

  filterByCodes(code: string) {
    this.doctorService.filterByDoctorCode(code)
      .subscribe(
        data => {
          this.doctorList = data;
        },
        error => {
          console.log(error);
        });
  }

  filterByName(code: string) {
    this.doctorService.filterByDoctorName(code)
      .subscribe(
        data => {
          this.doctorList = data;
        },
        error => {
          console.log(error);
        });
  }


  getCodes() {
    this.doctorService.getCodes()
      .subscribe(
        data => {
          this.options = data;
        },
        error => {
          console.log(error);
        });
  }

  getNames() {
    this.doctorService.getNames()
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


}
