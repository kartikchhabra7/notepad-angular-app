import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ALERT_NOTIFICATION, KARTIK } from '../../core/constants/Constants';
@Component({
  selector: 'app-notepad',
  standalone: true,
  imports: [FormsModule, CommonModule, ClipboardModule],
  templateUrl: './notepad.component.html',
  styleUrl: './notepad.component.scss',
})
export class NotepadComponent {
  textValue!: string;
  fontSize: string = '';
  isBold: boolean = false;
  isItalic: boolean = false;
  isUnderLine: boolean = false;
  fontFamily: string = '';
  placeHolder: string = 'Start typing here..';
  isCopied: boolean = false;

  handleToggleBold() {
    this.isBold = !this.isBold;
  }

  handleToggleItalic() {
    this.isItalic = !this.isItalic;
  }

  handleToggleUnderLine() {
    this.isUnderLine = !this.isUnderLine;
  }

  resetData() {
    this.textValue = '';
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
}
