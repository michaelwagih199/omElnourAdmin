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
  public href: string = "";

  doctorSelectValue?: any = null
  projectSelectValue?: any = "Select Project"

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
    this.href = this.router.url;
    if (this.href == '/patients')
      this.retrievePatient()
    else
      this.retrieveNewEnrolmentPatient()
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
    if (this.selectFilterSearchValue == 'PatientCode' && this.searchValue != null) {
      this.filterByCodes(this.searchValue)
    } else if (this.selectFilterSearchValue == null || this.searchValue == null) {
      this.retrievePatient()
      this.createNotification('warning', 'warninb', 'Search filter not selected')
    } else if (this.selectFilterSearchValue == 'PatientName' && this.searchValue != null) {
      this.filterByName(this.searchValue)
    }
    console.log(this.searchValue)

  }

  onSearchFilterChange(value: string) {
    if (value == 'PatientCode') {
      this.getCodes()
    } else if (value == 'PatientName') {
      this.getNames()
    } else
      this.retrievePatient()
    console.log(value)
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
    this.retrieveDoctor()
    this.getProjects()
    this.getStatues()
    this.getVouchers()
    this.findById(id)
    this.saveButtonCheck = 'Update'
    this.isVisible = true
  }

  onInfo(id) {
    this.router.navigate([`/PatientDetails/${id}`])
  }

  save() {
    const selectedDate: string = this.datePipe.transform(this.slectBirthDate, "dd-MM-yyy").toString()
    this.patient.dateOfBirth = selectedDate
    if (this.saveButtonCheck == 'Save') {
      console.log(this.patient)
      this.patientService.createPatient(this.patient, this.projectSelectValue, this.doctorSelectValue, this.vouchersSelectValue, this.statuesSelectValue)
        .subscribe(data => {
          console.log(data)
          this.retrievePatient()
          this.createNotification('success', 'Success', 'Patient added succesfully')
          this.isVisible = false
        }, error => console.log(error));

    } else if (this.saveButtonCheck == 'Update') {
      this.patientService.update(this.patient.id, this.patient)
        .subscribe(
          response => {
            console.log(response)
            this.retrievePatient()
            this.createNotification('Success', 'Success', 'Patient Updated Succesfully')
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

  retrieveNewEnrolmentPatient() {
    this.patientService.getNewEnrolMentPationt('NewEnrolment')
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

  findById(id: number) {
    this.patientService.getById(id).subscribe(
      response => {
        this.patient = response
        this.doctorSelectValue = response.doctor.doctorName
        this.projectSelectValue = response.projects[0].projectName

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

  getNames() {
    this.patientService.getNames()
      .subscribe(
        data => {
          this.options = data;
        },
        error => {
          console.log(error);
        });
  }

  getCodes() {
    this.patientService.getCodes()
      .subscribe(
        data => {
          this.options = data;
        },
        error => {
          console.log(error);
        });
  }


  filterByCodes(code: string) {
    this.patientService.filterByPatientCode(code)
      .subscribe(
        data => {
          this.patientList = data;
        },
        error => {
          console.log(error);
        });
  }

  filterByName(code: string) {
    this.patientService.filterByPatientName(code)
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
