import { Component, OnInit } from '@angular/core';
import { Patient, VoucherDetail, Project } from 'src/app/services/models/Patient';
import { PatientService } from 'src/app/services/data/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { SmsService } from 'src/app/services/data/sms.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  private routeSub: Subscription;
  patient: Patient = new Patient()
  patientList: Patient[] = [];
  voucherDetailsList: VoucherDetail[] = [];
  userPassList = []
  index1 = 0;
  index2 = 0;
  patientSupportValue: any = null
  patientId: number
  patientUserName: any = null
  patientPassword: any = null
  confirmModal?: NzModalRef; // For testing by now
  messageText
  sms = {
    "messageText": this.messageText
  }

  constructor(
    private patientService: PatientService,
    private smsService: SmsService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NzModalService

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
    }else if(value == 'PatientWarning'){
      this.showModal()
    }
    console.log(value)
  }

  sendSms(messageContnt) {
    this.smsService.sendSms('ahmed.dessouky@gentiumhealthcare.com',
      '@Gentium2019',
      'TabeaTetamn',
      '01229791906', messageContnt)
      .subscribe(data => {
        console.log(data)
      }, error => console.log(error));
  }


  saveSms(messageContent, typeId) {
    this.sms.messageText = messageContent
    console.log(this.sms)
    this.smsService.saveSms(this.sms, this.patientId, typeId)
      .subscribe(data => {
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

  smsObject:SmsObject = new SmsObject()
  isVisible = false;
  isOkLoading = false;
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

  index = 0;
  disable = false;
  onIndexChange(index: number): void {
    this.index = index;
  }

}



export class SmsObject{
  messageText: any;
}


