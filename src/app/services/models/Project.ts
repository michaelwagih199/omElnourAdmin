export class Project {
  id: number;
  projectName: string;
  projectCycleDuration:number
  projectCycleSlicing:number
  medicines: Medicine[];
}

export class Medicine {
  id: number;
  medicineName: string;
  medicineCycle: MedicineCycle;
}

export class MedicineCycle {
  id: number;
  durationBetWeenGift: number;
  numberMedecineBurches: number;
  medicineSupport: MedicineSupport;
}

export class MedicineSupport {
  id: number;
  supportType: string;
  suppportDescription: string;

}

