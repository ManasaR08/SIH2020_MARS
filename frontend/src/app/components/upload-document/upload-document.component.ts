import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BackendService } from 'src/app/_services/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {
  srcResult: string; 
  name: FormControl;
  file: File;
  fetchedResponse = true;
  constructor(private _store: Store<any>, private backend: BackendService, private dialog: MatDialog, private bottomSheet: MatBottomSheet) {
    this.name = new FormControl('');
  }
  submit() {
    if (this.name.value == '' || this.name.value == undefined) return;
    if (this.file == undefined) return;
    this.fetchedResponse = false;
    const formData = new FormData();
    formData.append('name', this.name.value)
    formData.append('pdfDocument', this.file);
    this.backend.addUpload(formData).subscribe((val: any) => {
      console.log(val);
      if (val.success == true) {
        this._store.dispatch({
          type: 'ADD_UPLOAD',
          payload: {id: val.id, ppt:val.ppt, pdf:val.pdf, name:this.name.value}
        });        
        this.fetchedResponse = true;
        this.dialog.closeAll();
        this.bottomSheet.dismiss();
      }
    })
  }
  ngOnInit(): void {
  }
  onFileSelected(event) {
    this.file = event.target.files[0];
  }
}
