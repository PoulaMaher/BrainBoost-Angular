import { Component, OnInit } from '@angular/core';
import { IcourseNotApproved } from '../../models/icourse-not-approved';
import { AdminDashboardServiceService } from '../../Services/AdminDashboard/admin-dashboard-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-non-approved-coureses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './non-approved-coureses.component.html',
  styleUrl: './non-approved-coureses.component.css'
})
export class NonApprovedCouresesComponent implements OnInit{
constructor(private admindashboardservice:AdminDashboardServiceService ,private router: Router,){
}
NotApprovedCourses!:IcourseNotApproved[];
  ngOnInit(): void {
    this.GetNotApprovedCourses();
  }
  GetNotApprovedCourses() {
    this.admindashboardservice.GetNotApprovedCourses().subscribe(
      (data: IcourseNotApproved[]) => {
        this.NotApprovedCourses = data;
      },
      (error) => {
        console.error('Error fetching not approved courses', error);
      }
    );
  }
  GoToCourseDetails(id: number) {
    this.router.navigate(['/courseDetails', id]);
  }
  ApproveCourse(CourseId:number)
  {
    this.admindashboardservice.ApproveCourse(CourseId).subscribe(
      () => {
        this.GetNotApprovedCourses();
      },
      (error) => {
        console.error(error);
      }
    );

  }
}
