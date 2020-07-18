import { Component, OnInit } from '@angular/core';
import { Patient, VoucherDetail, Project } from 'src/app/services/models/Patient';
import { PatientService } from 'src/app/services/data/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NzModalService, NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { SmsService } from 'src/app/services/data/sms.service';
import { Medicine } from 'src/app/services/models/medicin';
import { PatientCycleService } from 'src/app/services/data/patient-cycle.service';
import { DatePipe } from '@angular/common';
import { PatientCycle } from 'src/app/services/models/PatientCycle';
import { PatientTimeLine } from 'src/app/services/models/patientTimeLine';
@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})

export class PatientDetailsComponent implements OnInit {
  private routeSub: Subscription;
  patient: Patient = new Patient()
  patientCycle: PatientCycle = new PatientCycle()
  patientList: Patient[] = [];
  medecineList: Medicine[] = []
  voucherDetailsList: VoucherDetail[] = [];
  userPassList = []
  completeCycle = 0;
  currentCycleStatuse: any
  currentCycleRemaining: any
  currentCycleSpent: any
  cycleListSize = [2]

  timelineList:PatientTimeLine[]=[]

  index1 = 0;
  index2 = 0;
  patientSupportValue: any = null
  patientId: number
  patientUserName: any = null
  patientPassword: any = null
  dateFormat = 'yyyy-MM-dd';
  slectBirthDate = null
  patientActiveIsVisibale = false
  isVisible = false;
  isOkLoading = false;
  isActivePatientOkLoading = false
  confirmModal?: NzModalRef; // For testing by now
  messageText
  smsObject: Sms = new Sms()

  sms = {
    "messageText": this.messageText
  }

  constructor(
    private patientService: PatientService,
    private smsService: SmsService,
    private patientCycleService: PatientCycleService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private datePipe: DatePipe,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getPatientId()
    console.log(this.patientList)
  }

  /**
  * data
  */
  findPatientById(id: number) {
    this.patientService.getById(id).subscribe(
      response => {
        this.patient = response
        this.patientList.push(response)
        this.voucherDetailsList.push(response.voucherDetails[0])
      },
      error => {
        console.log(error);
      });
  }

  getUserPass(id: number) {

    this.patientService.getUserPass(id).subscribe(
      response => {
        this.patientUserName = response[0]
        this.patientPassword = response[1]
      },
      error => {
        console.log(error);
      });

  }

  getPatientId() {

    this.routeSub = this.route.params.subscribe(params => {
      this.patientId = params['id']

    });
    this.findPatientById(this.patientId)
    this.getUserPass(this.patientId)
    this.countCompleteCycle(this.patientId)
    this.countCurrentCycle(this.patientId)
    this.getSpentAndRemaining(this.patientId)
  }


  countCurrentCycle(patientId: number) {
    this.patientCycleService.countCurrentCycle(patientId).subscribe(
      response => {
        if (response == 0)
          this.currentCycleStatuse = 'Cycle Not Active'
        else if (response == 1)
          this.currentCycleStatuse = 'Cycle Active'
      },
      error => {
        console.log(error);
      });
  }

  countCompleteCycle(patientId: number) {
    this.patientCycleService.countCompleteCycle(patientId).subscribe(
      response => {
        this.completeCycle = response
      },
      error => {
        console.log(error);
      });
  }

  getSpentAndRemaining(patientId: number) {
    this.patientCycleService.getSpentAndRemaining(patientId).subscribe(
      response => {
        this.currentCycleRemaining = response[0]
        this.currentCycleSpent = response[1]
      },
      error => {
        console.log(error);
      });
  }


  /**
   * events
   */
  back() {
    this.router.navigate([`/patients`])
  }

  onPatientSupportChange(value: string) {
    this.patientSupportValue = null
    if (value == 'PatientCode') {
      this.showConfirm()
    } else if (value == 'PatientWarning') {
      this.showModal()
    }
    console.log(value)
  }

  onActivePatient() {
    if (this, this.currentCycleStatuse == 'Cycle Not Active')
      this.patientActiveIsVisibale = true;
    else
      this.info('Info message', 'Patient already active')
  }

  activePatient() {
    const selectedDate: string = this.datePipe.transform(this.slectBirthDate, "yyyy-MM-dd").toString()
    this.patientCycle.startCycleDate = selectedDate
    this.patientCycle.isComplete = 1;
    this.patientCycleService.createPatientCycle(this.patientId,this.patientCycle)
    .subscribe(data => {
      console.log(data)
    }, error => console.log(error));
    // active patient

  }

  activePatientStatus(){
    this.patientCycleService.activePation(this.patientId).subscribe(data =>{
      console.log(data)
    },error=>console.log(error))
  }

  sendSms(messageContnt) {
    this.smsService.sendSms('ahmed.dessouky@gentiumhealthcare.com',
      '@Gentium2019',
      'TabeaTetamn',
      '01229791906', messageContnt)
      .subscribe(data => {
        console.log(data)
        this.createNotification('Success', 'Success', 'Message Send Succesfully')
      }, error => console.log(error));
  }


  saveSms(messageContent, typeId) {
    this.sms.messageText = messageContent
    console.log(this.sms)
    this.smsService.saveSms(this.sms, this.patientId, typeId)
      .subscribe(data => {
        this.createNotification('Success', 'Success', 'Message Sa Succesfully')
        console.log(data)
      }, error => console.log(error));
  }



  showConfirm(): void {
    let messageContent = ' userName: ' + `${this.patientUserName} , Password: ${this.patientPassword}`
    this.confirmModal = this.modal.confirm({
      nzTitle: 'كود المريض',
      nzContent: messageContent,
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          // send sms
          //save sms
          this.sendSms(messageContent)
          this.saveSms(messageContent, 2)
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }

  info(title, content): void {
    this.modal.info({
      nzTitle: title,
      nzContent: content,
      nzOnOk: () => console.log('Info OK')
    });
  }


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      console.log(this.smsObject)
      this.sendSms(this.smsObject.messageText)
      this.saveSms(this.smsObject.messageText, 1)
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleActivePatientOk(): void {
    this.isActivePatientOkLoading = true;
    setTimeout(() => {
      this.activePatient();
      this.activePatientStatus()
      this.patientActiveIsVisibale = false;
      this.isActivePatientOkLoading = false;
      this.getPatientId()
    }, 3000);
  }

  handleActivePatientCancel(): void {
    this.patientActiveIsVisibale = false;
  }

  index = 0;
  disable = false;
  onIndexChange(index: number): void {
    this.index = index;
  }

  createNotification(type: string, title: string, description): void {
    this.notification.create(
      type,
      title,
      description
    );
  }


}


export class Sms {
  messageText: any;
}






