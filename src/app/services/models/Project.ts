export class Project {
  id: number;
  projectName: string;
  medicines: Medicine[];
}

export interface Medicine {
  id: number;
  medicineName: string;
  medicineCycle: MedicineCycle;
}

export interface MedicineCycle {
  id: number;
  duration: number;
  allNumber: number;
  medicineSupport: MedicineSupport;
}

export interface MedicineSupport {
  id: number;
  supportType: string;
}

