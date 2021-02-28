import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/services/models/medicin';
import { MedecineServiceService } from 'src/app/services/data/medecine-service.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  searchValue: string = null
  selectFilterSearchValue: string = null
  medicinList: Medicine[]
  filteredOptions: string[] = []
  options = [];

  constructor(
    private medicineService: MedecineServiceService,
    private notification: NzNotificationService,
    private modal: NzModalService,
  ) {
    this.filteredOptions = this.options;
  }

  ngOnInit(): void {
    this.retrieveMedicine()
  }

  /**
   * events
   * @param value
   */

  onSearchChange(value: string) {

  }

  search() {

  }

  onSearchFilterChange(value: string) {

  }

  showModal() {

  }
  onDelete(id) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this medecine?',
      nzContent: '<b style="color: red;">order id  : ' + id + '</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        console.log('OK')
        this.medicineService.delete(id).subscribe(
          response => {
            console.log(response)
            this.createNotification('success', 'Success', 'medecine Deleted succesfully')
            this.retrieveMedicine()
          },
          error => {
            console.log(error);
          });
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  onEdit(id) {

  }

  /**
 * data
 */

  retrieveMedicine() {
    this.medicineService.getAll()
      .subscribe(
        data => {
          this.medicinList = data;
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
