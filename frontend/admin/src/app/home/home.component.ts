import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public apiService: ApiService) { }
  
  courseCsv: any[];
  facultys: any[];
  students: any[];
  courses: any[];
  feedbacks: any[];

  afuConfig = {
    uploadAPI: {
      url: environment.api_url + "course/upload",
      multiple: false,
      formatsAllowed: ".csv"
    }
  };

  ngOnInit() {
  	this.getFacultys();
  	this.getFeedbacks();
  	this.getCourses();
  	this.getUsers();
  }

  getFacultys(){
  	this.apiService.get('facultys')
  	.subscribe( (res:any) => {
  		console.log(res.facultys);
  		this.facultys = res.facultys;
  	}, (err) => {
  		console.log(err);
  	});
  }
  
  getFeedbacks(){
  	this.apiService.get('feedbacks')
  	.subscribe( (res:any) => {
  		console.log(res.feedbacks);
  		this.feedbacks = res.feedbacks;
  	}, (err) => {
  		console.log(err);
  	});
  }

  getCourses(){
  	this.apiService.get('courses')
  	.subscribe( (res:any) => {
  		console.log(res.courses);
  		this.courses = res.courses;
  	}, (err) => {
  		console.log(err);
  	});
  }

  getUsers(){
  	this.apiService.get('users')
  	.subscribe( (res:any) => {
  		console.log(res.users);
  		this.students = res.users;
  	}, (err) => {
  		console.log(err);
  	});
  }

  submitFile(){
  	this.apiService.post('course/upload', this.courseCsv)
  	.subscribe( (res:any) => {
  		console.log(res);
  	}, (err) => {
  		console.log('Error occured:', err);
  	});
  }

}
