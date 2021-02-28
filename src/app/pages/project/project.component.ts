import { Component, OnInit } from '@angular/core';
import { Project, Medicine, MedicineCycle, MedicineSupport } from 'src/app/services/models/Project';
import { ProjectService } from 'src/app/services/data/project.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  projectList: Project[] = [];
  isVisible = false;
  project = new Project();
  selectProjectCycleDuration: any

  validateForm!: FormGroup;

  monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  projectId: number;

  constructor(private projectService: ProjectService,
    private fb: FormBuilder) { }


  ngOnInit() {
    this.retrieveProject();
    this.validForm();
  }
  /**
   * events
   */

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.saveProject()
    console.log(this.validateForm.controls['projectName'].value)

  }

  validForm() {
    this.validateForm = this.fb.group({
      projectName: [null, [Validators.required]],
      ProjectCycleDuration: [null, [Validators.required]],
      projectCycleSlicing: [null, [Validators.required]],
      medicineName: [null, [Validators.required]],
      durationBetWeenGift: [null, [Validators.required]],
      medecineBurches: [null, [Validators.required]],
      supportType: [null, [Validators.required]],
      suppportDescription: [null, [Validators.required]]
    });
  }

  handleCancel() {
    this.isVisible = false;

  }

  onEdit(id: number) {
    this.isVisible = true
    this.projectId = id
    this.retrieveProject()
  }


  /**
   * data
   */
  retrieveProject() {
    this.projectList=[]
    this.projectService.getAll()
      .subscribe(
        data => {
          this.projectList.push(data);
          this.project = data[0];
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  saveProject() {
    this.project.projectName = this.validateForm.controls['projectName'].value
    this.project.projectCycleDuration = this.validateForm.controls['ProjectCycleDuration'].value
    this.project.projectCycleSlicing = this.validateForm.controls['projectCycleSlicing'].value
    this.project.medicines[0].medicineName = this.validateForm.controls['medicineName'].value
    this.project.medicines[0].medicineCycle.durationBetWeenGift = this.validateForm.controls['durationBetWeenGift'].value
    this.project.medicines[0].medicineCycle.numberMedecineBurches = this.validateForm.controls['medecineBurches'].value
    this.project.medicines[0].medicineCycle.medicineSupport.supportType = this.validateForm.controls['supportType'].value
    this.project.medicines[0].medicineCycle.medicineSupport.suppportDescription = this.validateForm.controls['suppportDescription'].value

    this.projectService.update(this.projectId, this.project)
      .subscribe(
        data => {
          console.log(data)

        },
        error => {
          console.log(error);
        });

    this.handleCancel()
    this.retrieveProject()

  }


}
