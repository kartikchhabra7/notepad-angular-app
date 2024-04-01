import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ALERT_NOTIFICATION, KARTIK } from '../../core/constants/Constants';
import { LocalStorageService } from '../../services/local.storage.service';
@Component({
  selector: 'app-notepad',
  standalone: true,
  imports: [FormsModule, CommonModule, ClipboardModule],
  templateUrl: './notepad.component.html',
  styleUrl: './notepad.component.scss',
})
export class NotepadComponent implements OnInit {
  textValue: string = this.service.getItemFromStorage('notepadText') || '';
  fontSize: string = this.service.getItemFromStorage('fontSize') || '';
  isBold: string | boolean =
    this.service.getItemFromStorage('isBold') === 'true' || false;
  isItalic: string | boolean =
    this.service.getItemFromStorage('isItalic') === 'true' || false;
  isUnderLine: string | boolean =
    this.service.getItemFromStorage('isUnderLine') === 'true' || false;
  fontFamily: string = this.service.getItemFromStorage('fontFamily') || '';
  placeHolder: string =
    "Welcome to my professional notepad. As a skilled web developer, I'm Kartik Chhabra. Explore more about my work on GitHub [github.com/kartikchhabra7]. Start typing here to create and manage your notes.";
  isCopied: boolean = false;

  ngOnInit(): void {
    // first way where i used ternary operator
    // const storedText = this.service.getItemFromStorage('notepadText');
    // this.textValue = storedText ? storedText : '';
    //second way i used OR operator this way is the better way because it reduce hard lines of code
    // this.fontSize = this.service.getItemFromStorage('fontSize') || '';
    // it is the simplest way to get local storage value
    // const storedFontFamily = this.service.getItemFromStorage('fontFamily');
    // if (storedFontFamily) {
    // this.fontFamily = storedFontFamily;
    // } else {
    // this.fontFamily = '';
    // }
    // this.isBold = this.service.getItemFromStorage('isBold') === 'true';
    // this.isItalic = this.service.getItemFromStorage('isItalic') === 'true';
    // this.isUnderLine =
    // this.service.getItemFromStorage('isUnderLine') === 'true';
  }

  constructor(private service: LocalStorageService) {}

  handleInputChange() {
    this.service.setItemInStorage('notepadText', this.textValue);
  }

  handleFontSize() {
    this.service.setItemInStorage('fontSize', this.fontSize);
  }

  handleFontFamily() {
    this.service.setItemInStorage('fontFamily', this.fontFamily);
  }

  handleToggleBold() {
    this.isBold = !this.isBold;
    this.service.setItemInStorage('isBold', this.isBold);
  }

  handleToggleItalic() {
    this.isItalic = !this.isItalic;
    this.service.setItemInStorage('isItalic', this.isItalic);
  }

  handleToggleUnderLine() {
    this.isUnderLine = !this.isUnderLine;
    this.service.setItemInStorage('isUnderLine', this.isUnderLine);
  }

  resetData() {
    this.clearLocalStorage();
  }

  printNotes() {
    window.print();
  }

  saveNotes(): void {
    const trimmedTextValue = this.textValue ? this.textValue.trim() : '';

    if (trimmedTextValue.length === 0) {
      window.alert(ALERT_NOTIFICATION);
    } else {
      const fileName = `${KARTIK}${this.textValue.slice(0, 7)}.txt`;
      this.downloadFile(this.textValue, fileName);
    }
  }

  downloadFile(data: string, filename: string): void {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  copyToClipBoard() {
    this.isCopied = true;

    setTimeout(() => {
      this.isCopied = false;
    }, 1500);
  }

  private clearLocalStorage() {
    this.textValue = '';
    this.fontSize = '';
    this.fontFamily = '';
    this.isBold = false;
    this.isItalic = false;
    this.isUnderLine = false;
    this.service.removeItemInStorage('notepadText');
    this.service.setItemInStorage('fontSize', this.fontSize);
    this.service.setItemInStorage('fontFamily', this.fontFamily);
    this.service.setItemInStorage('isBold', this.isBold);
    this.service.setItemInStorage('isItalic', this.isItalic);
    this.service.setItemInStorage('isUnderLine', this.isUnderLine);
  }
}
