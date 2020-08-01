import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatBottomSheetModule, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { StoreModule } from '@ngrx/store';
import {UserDataReducer, UserStateReducer} from './_redux/reducer';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { DashboardAddComponent } from './pages/dashboard-add/dashboard-add.component';
import { DashboardViewComponent } from './pages/dashboard-view/dashboard-view.component';
import { DashboardUserComponent } from './pages/dashboard-user/dashboard-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardResultComponent } from './pages/dashboard-result/dashboard-result.component';
import { LoadingComponent } from './components/loading/loading.component';
import { UploadDocumentComponent } from './components/upload-document/upload-document.component';
import { AddSuggestionComponent } from './components/add-suggestion/add-suggestion.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthComponent,
    HomeComponent,
    NavbarComponent,
    DashboardHomeComponent,
    DashboardAddComponent,
    DashboardViewComponent,
    DashboardUserComponent,
    DashboardResultComponent,
    LoadingComponent,
    UploadDocumentComponent,
    AddSuggestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatBottomSheetModule,
    StoreModule.forRoot({ UserStateReducer, UserDataReducer })    
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MatBottomSheetRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
