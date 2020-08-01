import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService extends UrlService {

  constructor(private http: HttpClient) {
    super();
  }

  login(access, phone, password) {
    return this.http.post(this.loginUrl, {access, phone, password});
  }
  signup(name, access, phone, password) {
    return this.http.post(this.signupUrl, {name, access, phone, password});
  }
  getOTP(access, phone) {
    return this.http.post(this.sendOTPUrl, {access, phone});
  }
  verifyOTP(access, phone, otp) {
    return this.http.post(this.verifyOTPUrl, {access, phone, otp});
  }

  popularTeachers() {
    return this.http.get(this.popularTeachersUrl);    
  }
  getSuggestions() {
    return this.http.get(this.getSuggestionsUrl);
  }
  getSearches() {
    return this.http.get(this.studentSearchUrl);
  }
  addSearch(text, type) {
    return this.http.post(this.studentSearchUrl, {text, type});
  }
  teachersForStudent() {
    return this.http.get(this.studentAccessTeacherUrl);
  }
  addTeacherToStudent(userId) {
    return this.http.post(this.studentAccessTeacherUrl, {teacherId: userId});
  }
  viewTeacher(id) {
    return this.http.post(this.viewTeacherUrl, {teacherId: id});
  }

  getStudents() {
    return this.http.get(this.studentForTeacherUrl);
  }
  viewStudent(id) {
    return this.http.post(this.studentForTeacherUrl, {studentId: id});
  }
  getUploads() {
    return this.http.get(this.teacherUploadsUrl);
  }
  deleteUpload(id) {
    return this.http.post(this.teacherUploadsUrl, {uploadId: id});
  }
  addUpload(formData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(this.addDocumentUrl, formData, {headers: headers});
  }
  addSuggestion(studentId, text) {
    return this.http.post(this.addSuggestionUrl, {studentId, text});    
  }
}
