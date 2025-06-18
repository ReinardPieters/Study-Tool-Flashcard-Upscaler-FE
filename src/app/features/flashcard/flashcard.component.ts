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

  // flipBack() {
  //   this.isFlipped = false;
  //   this.selectedOption = null;
  // }
}
