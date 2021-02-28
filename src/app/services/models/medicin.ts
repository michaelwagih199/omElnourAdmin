
export class Medicine {
  id: number;
  medicineName: string;
  medicineCycle: MedicineCycle;
}

export interface MedicineCycle {
  id: number;
  duration: number;
  allNumber: number;
  medicineSupport: MedicineSupport;
  hibernateLazyInitializer: HibernateLazyInitializer2;
}

export interface MedicineSupport {
  id: number;
  supportType: string;
  hibernateLazyInitializer: HibernateLazyInitializer;
}

export interface HibernateLazyInitializer {}

export interface HibernateLazyInitializer2 {}
