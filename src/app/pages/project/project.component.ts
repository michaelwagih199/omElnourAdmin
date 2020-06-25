import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/services/models/Project';
import { ProjectService } from 'src/app/services/data/project.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectList: Project[];

  constructor(private projectService:ProjectService,) { }

  ngOnInit(): void {
    this.retrieveProject()
  }


  showModal(){

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
