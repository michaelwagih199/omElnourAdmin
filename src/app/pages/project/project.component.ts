import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/services/models/Project';
import { ProjectService } from 'src/app/services/data/project.service';
import { User } from 'src/app/services/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectList: Project[];
  isVisible = false;
  userModal = new User();
  project = new Project();

  constructor(private projectService: ProjectService,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService) { }



  onEdit(id) {
    this.isVisible = true;
  }


  handleCancel() {
    this.isVisible = false;

  }
  registerForm: FormGroup;
  submitted = false;


  ngOnInit() {
    this.retrieveProject()
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.registerForm.value);
    }
  }

  retrieveProject() {
    this.projectService.getAll()
      .subscribe(
        data => {
          this.projectList = data;
        },
        error => {
          console.log(error);
        });
  }



}
