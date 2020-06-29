import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menue',
  templateUrl: './menue.component.html',
  styleUrls: ['./menue.component.css']
})
export class MenueComponent implements OnInit {
  isCollapsed = false;
  isLoggedIn = false;
  viewMenue = false
  userName = sessionStorage.getItem('username')
  public href: string = "";


  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.href = this.router.url;
    if (this.href == '/login' || this.href == ''  ) {
      console.log(this.href)
      this.viewMenue = false
    }
    else
    this.viewMenue = true
  }

  log(): void {
    this.authService.logOut()
    this.router.navigateByUrl('/login')
  }

}
