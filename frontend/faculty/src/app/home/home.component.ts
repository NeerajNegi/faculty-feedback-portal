import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  feedbacks:any;
  myCourse: String;
  showFeedbacks = true;

  constructor(public apiService: ApiService) { }

  ngOnInit() {
  	this.myCourse = JSON.parse(localStorage.getItem('facultyInfo')).faculty.course;
  		this.apiService.get('facultyfeedbacks/' + this.myCourse)
  		.subscribe( (res:any) => {
        console.log(res);
  		  if(res.success === true){
          this.feedbacks = res.feedbacks;
        } else {
          this.showFeedbacks = false;
        }
  		}, (err) => {
        this.showFeedbacks = false;
  			console.log('Error occured: ', err);
  		});
  }

}
