import { MainService } from './../../services/main.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';
import {Router } from '@angular/router';

@Component({
  selector: 'app-custom-snack-bar',
  templateUrl: './custom-snack-bar.component.html',
  styleUrls: ['./custom-snack-bar.component.scss']
})
export class CustomSnackBarComponent implements OnInit {

  constructor( 
    public snackBarRef: MatSnackBarRef<CustomSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,private router:Router) { }

  ngOnInit() {
  }
  logout(){
    this.router.navigate(["login"]);
    this.snackBarRef.dismiss()
    // location.reload();

    // this.mainSer.loginServ.logout();// .goTo('login')
  }
}
