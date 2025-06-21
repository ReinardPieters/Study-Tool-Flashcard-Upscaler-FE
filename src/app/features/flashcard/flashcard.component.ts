import { Component, inject, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlashcardDto } from '../../models/flashcard';
import { FormsModule } from '@angular/forms';
import { FlashcardService } from '../../services/flashcard.service';

@Component({
  selector: 'app-flashcard',
  imports: [CommonModule, FormsModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css'
})
export class FlashcardComponent {

  @Input() public flashCard!: FlashcardDto;
    flashcardService = inject(FlashcardService);
  isFlipped = false;
  selectedOption: string | null = null;

  submitAnswer() {
    this.isFlipped = true;
  }
isEditing = false;
editableQuestion = '';
editableOptions: string[] = [];
editableAnswer = '';


editFlashcard() {
  this.isEditing = true;
  this.editableQuestion = this.flashCard.question;
  this.editableOptions = [...this.flashCard.options];
  this.editableAnswer = this.flashCard.answer;
}


saveFlashcard() {
  this.flashCard.question = this.editableQuestion;
  this.flashCard.options = [...this.editableOptions];
  this.flashCard.answer = this.editableAnswer;
  this.isEditing = false;

  this.flashcardService.saveFlashcard(this.flashCard.id, this.flashCard).subscribe({
    next: (response) => {
      console.log('Flashcard updated successfully:', response);
    },
    error: (error) => {
      console.error('Error updating flashcard:', error);
    }
  });
}


cancelEdit() {
  this.isEditing = false;
}

  flipBack() {
    this.isFlipped = false;
    this.selectedOption = null;
  }
}
