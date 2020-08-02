import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  baseUrl: string;
  loginUrl: string;
  signupUrl: string;
  sendOTPUrl: string;
  verifyOTPUrl: string;
  popularTeachersUrl: string;
  getSuggestionsUrl: string;
  studentSearchUrl: string;
  studentAccessTeacherUrl: string;
  studentForTeacherUrl: string;
  addDocumentUrl: string;
  teacherUploadsUrl: string;
  viewTeacherUrl: string;
  addSuggestionUrl: string;
  getResultUrl: string;
  questionUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3000/api';
    this.loginUrl = `${this.baseUrl}/auth/login`;
    this.signupUrl = `${this.baseUrl}/auth/signup`;
    this.sendOTPUrl = `${this.baseUrl}/auth/otp/generate`;
    this.verifyOTPUrl = `${this.baseUrl}/auth/otp/verfy`
    
    this.popularTeachersUrl = `${this.baseUrl}/student/teachers/popular`;
    this.getSuggestionsUrl = `${this.baseUrl}/student/suggestion`;
    this.studentSearchUrl = `${this.baseUrl}/student/search`;
    this.studentAccessTeacherUrl = `${this.baseUrl}/student/teachers`;
    this.viewTeacherUrl = `${this.baseUrl}/student/teachers/view`;
    this.getResultUrl = `${this.baseUrl}/student/result`;
    
    this.studentForTeacherUrl = `${this.baseUrl}/teacher/students`;
    this.teacherUploadsUrl = `${this.baseUrl}/teacher/upload`;
    this.addDocumentUrl = `${this.baseUrl}/teacher/upload/add`;
    this.addSuggestionUrl = `${this.baseUrl}/teacher/students/suggestion`;

    this.questionUrl = `${this.baseUrl}/user/questions`
  }
}
