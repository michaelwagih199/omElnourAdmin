import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { Patient, Doctor, Project, PatientStatues, VoucherDetail } from 'src/app/services/models/Patient';
import { PatientService } from 'src/app/services/data/patient.service';
import { Router } from '@angular/router';
import { DoctorServiceService } from 'src/app/services/data/doctor-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  searchValue: string = null
  selectFilterSearchValue: any = null
  vouchersSelectValue: any = null
  statuesSelectValue: any = null
  isVisible = false;
  saveButtonCheck = 'Save'
  message = "Add Patient"
  patient: Patient = new Patient()
  patientList: Patient[];
  filteredOptions: string[] = [];
  doctorList: Doctor[]
  projectList: Project[]
  patientStatuesList: PatientStatues[]
  voucherDetailsList: VoucherDetail[]
  dateFormat = 'dd-MM-yyy';
  slectBirthDate = null

  doctorSelectValue?: any = null
  projectSelectValue?: any = null

  constructor(private fb: FormBuilder,
    private patientService: PatientService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private router: Router,
    private doctorService: DoctorServiceService,
    private datePipe: DatePipe,

  ) {
    this.filteredOptions = this.options;
  }

  ngOnInit(): void {
    this.retrievePatient()
    this.retrieveDoctor()
    this.getProjects()
    this.getStatues()
    this.getVouchers()
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

  handleCancel(): void {
    this.isVisible = false;
    this.patient = new Patient()
  }

  onSubmit() {
    this.save();
    this.patient = new Patient()
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

  save() {
    const selectedDate: string = this.datePipe.transform(this.slectBirthDate, "dd-MM-yyy").toString()
    this.patient.dateOfBirth = selectedDate
    if (this.saveButtonCheck == 'Save') {
      console.log(this.patient)
      this.patientService.createPatient(this.patient,this.projectSelectValue, this.doctorSelectValue, this.vouchersSelectValue, this.statuesSelectValue)
        .subscribe(data => {
          console.log(data)
          this.retrievePatient()
          this.createNotification('success', 'Success', 'Patient added succesfully')
          this.isVisible = false
        }, error => console.log(error));

    } else if (this.saveButtonCheck == 'Update') {
      // this.voucherService.update(this.voucherOrde.id, this.voucherOrde)
      // .subscribe(
      //   response => {
      //     console.log(response)
      //     this.retrievePatient()
      //     this.createNotification('Success', 'Success', 'Pharmacy Updated Succesfully')
      //     this.isVisible = false
      //   },
      //   error => {
      //     console.log(error);
      //   });
    }

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


  getProjects() {
    this.patientService.getProjects()
      .subscribe(
        data => {
          this.projectList = data;
        },
        error => {
          console.log(error);
        });
  }

  getStatues() {
    this.patientService.getStatues()
      .subscribe(
        data => {
          this.patientStatuesList = data;
        },
        error => {
          console.log(error);
        });
  }

  getVouchers() {
    this.patientService.getVouchers()
      .subscribe(
        data => {
          this.voucherDetailsList = data;
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
