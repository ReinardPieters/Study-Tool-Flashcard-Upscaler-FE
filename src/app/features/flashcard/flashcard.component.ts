import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlashcardDto } from '../../models/flashcard';
import { FlashcardService } from '../../services/flashcard.service';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flashcard.component.html',
  styleUrl: './flashcard.component.css',
})
export class FlashcardComponent {
  @Input() public flashCard!: FlashcardDto;

  flashcardService = inject(FlashcardService);

  isFlipped = false;
  isEditing = false;

  selectedOption: string | null = null;

  editableQuestion = '';
  editableOptions: string[] = [];
  editableAnswer = '';

  /** Called when answer is submitted */
  submitAnswer() {
    this.isFlipped = true;
  }

  /** Called when user clicks "Flip Back" */
  flipBack() {
    this.isFlipped = false;
    this.selectedOption = null;
  }

  /** Starts editing the flashcard */
  editFlashcard() {
    this.isEditing = true;
    this.editableQuestion = this.flashCard.question;
    this.editableOptions = [...this.flashCard.options];
    this.editableAnswer = this.flashCard.answer;
  }

  /** Updates an individual option when edited */
  updateOption(index: number, value: string) {
    this.editableOptions[index] = value;
  }

  /** Adds a new blank option (max 4) */
  addOption() {
    if (this.editableOptions.length < 4) {
      this.editableOptions.push('');
    }
  }

  /** Removes an option (min 1) */
  removeOption(index: number) {
    if (this.editableOptions.length > 1) {
      this.editableOptions.splice(index, 1);
    }
  }

  /** Used to prevent input flicker during ngFor rendering */
  trackByIndex(index: number, item: string): number {
    return index;
  }

  /** Saves the edited flashcard */
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

  /** Cancels edit mode */
  cancelEdit() {
    this.isEditing = false;
  }
}
