import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faculty = {
  	username: '',
  	password: ''
  }

  constructor(public apiService: ApiService, 
  			  public router: Router,
  			  public snackBar: MatSnackBar) { }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      extraClasses: ['blue-snackbar']
    }).onAction().subscribe(() => {
    });
  }

  ngOnInit() {
  }

  login(){
  	this.apiService.post('faculty/login', this.faculty)
  	.subscribe( (res:any) => {
  		console.log(res);
  		localStorage.setItem('facultyInfo' , JSON.stringify(res));
  		this.router.navigate(['home']);
  	}, (err) => {
  		console.log(err);
  		this.openSnackBar(err.message, '');
  	})
  }

}
