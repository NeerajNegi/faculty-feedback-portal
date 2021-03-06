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
  	this.username = JSON.parse(localStorage.getItem('userInfo')).user.fullname;
  }

  logout() {
  	localStorage.removeItem('userInfo');
  	this.router.navigate['login'];
  }
}
