import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { Patient } from 'src/app/services/models/Patient';
import { PatientService } from 'src/app/services/data/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  searchValue: string = null
  selectFilterSearchValue: string = null
  isVisible = false;
  saveButtonCheck = 'Save'
  message = "Add Patient"
  patient: Patient = new Patient()
  patientList: Patient[];
  filteredOptions: string[] = [];

  constructor(private fb: FormBuilder,
    private patientService: PatientService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private router: Router
    ) {
    this.filteredOptions = this.options;
  }

  ngOnInit(): void {

    this.retrievePatient()

  }

  /**
  * events -----
  */

  options = [];
  onSearchChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }


  showModal(): void {
    this.isVisible = true;
  }

  search() {

  }

  onSearchFilterChange(value: string) {

  }

  onDelete(id) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this voucher order?',
      nzContent: '<b style="color: red;">order id  : ' + id + '</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK')
        this.patientService.delete(id).subscribe(
          response => {
            console.log(response)
            this.createNotification('success', 'Success', 'Order Deleted succesfully')
            this.retrievePatient()
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

  }

  onInfo(id) {
    this.router.navigate([`/PatientDetails/${id}`])
  }


  /**
   * datat
  */
  retrievePatient() {
    this.patientService.getAll()
      .subscribe(
        data => {
          this.patientList = data;
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
