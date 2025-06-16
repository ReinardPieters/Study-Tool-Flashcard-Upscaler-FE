import { Component } from '@angular/core';
import { NotesComponent } from '../notes/notes.component';
import { FlashcardDashboardComponent } from '../flashcard-dashboard/flashcard-dashboard.component';
import { NotesDashboardComponent } from '../notes-dashboard/notes-dashboard.component';
@Component({
  selector: 'app-dashboard',
  imports: [FlashcardDashboardComponent, NotesDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public showFlashCards: boolean = true;


  public showFlashCardsDashboard(): void {
    this.showFlashCards = true;
  }

  public showNotesDashboard(): void {
    this.showFlashCards = false;
  }
}
