export class Patient {
  id: number;
  patientCode: string;
  age: string;
  dateOfBirth: string;
  gender: string;
  home: string;
  phone: string;
  phone2: string;
  phone3: string;
  email1: string;
  email2: string;
  createdDate: string;
  patientName: string;
  patientInitial: string;
  idno: string;
  address: string;
  diagnosis: string;
  region: string;
  doctor: Doctor;
  projects: Project[];
  voucherDetails: VoucherDetail[];
  patientStatues: PatientStatues;

}
export interface Doctor {
  id: number;
  doctorCode: string;
  phone1: string;
  phone2: string;
  email1: string;
  doctorAddress: string;
  doctorName: string;
}


export interface Project {
  id: number;
  projectName: string;
  projectCycleDuration: number;
  projectCycleSlicing: number;
  medicines: Medicine[];
}

export interface Medicine {
  id: number;
  medicineName: string;
  medicineCycle: MedicineCycle;
}

export interface MedicineCycle {
  id: number;
  durationBetWeenGift: number;
  numberMedecineBurches: number;
  medicineSupport: MedicineSupport;
}

export interface MedicineSupport {
  id: number;
  supportType: string;
  suppportDescription: string;
}



export interface VoucherDetail {
  id: number;
  voucherCode: string;
}

export interface PatientStatues {
  id: number;
  patientStatues: string;
}
