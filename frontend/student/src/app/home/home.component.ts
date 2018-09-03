import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  courses: any[] = [{courseName: 'Select Course'}];
  feedbacks = [];
  studentId;
  coursesFound = true;
  // selectedCourse: any = this.courses[0];
  course: any;
  feedback: String;

  constructor(public apiService: ApiService,
              public snackBar: MatSnackBar) { }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      extraClasses: ['blue-snackbar']
    }).onAction().subscribe(() => {
    });
  }

  ngOnInit() {
  	this.studentId = JSON.parse(localStorage.getItem('userInfo')).user._id;
    this.getMySubmissions();
    const data = {
      id: this.studentId
    };
    this.apiService.post('mycourses/', data)
    .subscribe( (res: any) => {
      console.log(res);
      if(res.success === true){
        res.course.forEach(course => {
          this.courses.push(course);
        });
      } else {
        this.coursesFound = false;
      }
    }, (err) => {
      console.log('Error Occured: ', err);
    });
  }

  getMySubmissions(){
    this.apiService.get('myfeedbacks/' + this.studentId)
    .subscribe( (res: any) => {
      //console.log(res.feedbacks);
      this.feedbacks = res.feedbacks.reverse();
    }, (err) => {
      console.log(err);
    });
  }

  submitFeedback(){
    const data = {
      feedback: this.feedback,
      studentId: JSON.parse(localStorage.getItem('userInfo')).user._id,
      studentName: JSON.parse(localStorage.getItem('userInfo')).user.fullname,
      courseId: this.course,
      showStudentName: false
    }
    console.log(data);
    
    this.apiService.post('feedback', data)
    .subscribe( (res:any) => {
      console.log(res);
      this.feedback = '';
      this.course = this.courses[0];
      this.openSnackBar(res.message, '');
      this.getMySubmissions();
    }, (err) => {
      console.log('Error Occured:',err);
      this.openSnackBar(err.message, '');
    });

  }

}
