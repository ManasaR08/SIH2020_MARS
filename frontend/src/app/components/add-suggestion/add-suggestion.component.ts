import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DisplaySizeService } from 'src/app/_services/display-size.service';

@Component({
  selector: 'app-add-suggestion',
  templateUrl: './add-suggestion.component.html',
  styleUrls: ['./add-suggestion.component.css']
})
export class AddSuggestionComponent implements OnInit {
  text: FormControl
  constructor(private dialog: MatDialogRef<AddSuggestionComponent>, private bottomSheet: MatBottomSheetRef<AddSuggestionComponent>, private display: DisplaySizeService) {
    this.text = new FormControl('');
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.text.value == '') return;
    if (this.display.displayType == 'mobile') {
      this.bottomSheet.dismiss({text: this.text.value});
      return;
    }
    this.dialog.close({text: this.text.value});
  }

}
