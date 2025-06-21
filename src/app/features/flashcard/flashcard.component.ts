import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlashcardDto } from '../../models/flashcard';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flashcard',
  imports: [CommonModule, FormsModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {

  @Input() public flashCard!: FlashcardDto;

  isFlipped = false;
  selectedOption: string | null = null;

  submitAnswer() {
    this.isFlipped = true;
  }
isEditing = false;
editableQuestion = '';
editableOptions: string[] = [];

editFlashcard() {
  this.isEditing = true;
  this.editableQuestion = this.flashCard.question;
  this.editableOptions = [...this.flashCard.options]; // Clone the options
}

saveFlashcard() {
  this.flashCard.question = this.editableQuestion;
  this.flashCard.options = [...this.editableOptions];
  this.isEditing = false;
}

cancelEdit() {
  this.isEditing = false;
}



  flipBack() {
    this.isFlipped = false;
    this.selectedOption = null;
  }
}
