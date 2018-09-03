import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  
  username = '';
  
  constructor(public router: Router) { }

  ngOnInit() {
  	this.username = JSON.parse(localStorage.getItem('facultyInfo')).faculty.fullname;
  }

  logout() {
  	localStorage.removeItem('facultyInfo');
  	this.router.navigate['login'];
  }
}
