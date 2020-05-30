import { Component, OnInit } from '@angular/core';
import { Governorate } from '../services/models/governorate';
import { GovernorateServiceService } from '../services/data/governorate-service.service';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {

  governorates: Governorate[];

  constructor(private govenorateService: GovernorateServiceService) { }

  ngOnInit() {
    console.log(sessionStorage.getItem('token'))
    this.getFlightsData()
  }

  // get the data from backend service api
  private getFlightsData() {
    this.govenorateService.getFlightsData().subscribe(data => {
      this.governorates = data;
    });
  }

}
