import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User, Role } from 'src/app/services/models/user';
import { User_service } from 'src/app/services/data/user_service.service';
import { RoleService } from 'src/app/services/data/role-service.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  userList: User[] = [];
  rolesList: Role[] = [];

  isVisible = false;
  validateForm!: FormGroup;
  user: User = new User()

  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];

  constructor(private userService: User_service,
    private roleService: RoleService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.retrieveUser()
    this.retriveRoles()
    this.validForm()
  }


  /**
   * event
   */

  showUserModal() {
    this.isVisible = true
  }

  showRoleModal() {
    this.isVisible = true
  }

  onDelete(id: number) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this medecine?',
      nzContent: '<b style="color: red;">order id  : ' + id + '</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK')
        // this.medicineService.delete(id).subscribe(
        //   response => {
        //     console.log(response)
        //     this.createNotification('success', 'Success', 'medecine Deleted succesfully')
        //     this.retrieveMedicine()
        //   },
        //   error => {
        //     console.log(error);
        //   });
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  onEdit(id: number) {

  }

  onInfo(id: number) {

  }

  onRolesDelete(id: number) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this medecine?',
      nzContent: '<b style="color: red;">order id  : ' + id + '</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK')
        this.roleService.delete(id).subscribe(
          response => {
            console.log(response)
            this.createNotification('success', 'Success', 'Roles Deleted succesfully')
            this.retriveRoles()
          },
          error => {
            console.log(error);
          });
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  onRolesInfo(id: number) {

  }

  submitForm() {

  }

  handleCancel() {
    this.isVisible = false;
  }

  validForm() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],

    });
  }


  /**
   * data
   */
  retrieveUser() {
    this.userService.getAll()
      .subscribe(
        data => {
          this.userList = data;
          console.log(data)
        },
        error => {
          console.log(error);
        });
  }


  retriveRoles() {
    this.roleService.getAll()
      .subscribe(
        data => {
          this.rolesList = data;
          console.log(data)
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
