import { Component } from '@angular/core';
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
  public showNotes: boolean = true;


  public showFlashCardsDashboard(): void {
    this.showNotes = false;
    this.showFlashCards = true;
    console.log(this.showFlashCards+ "cards show")
  }

  public showNotesDashboard(): void {
    this.showFlashCards = false;
    this.showNotes = true;
    console.log(this.showNotes+ "notes show")
  }
}
