import { Component } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Import Router
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
  heading: string = 'Flashcard Dashboard';

  constructor(private router: Router) { }
  
  public redirect(){
    this.router.navigate(['/login']);
  }

  public showFlashCardsDashboard(): void {
    this.showNotes = false;
    this.showFlashCards = true;
    console.log(this.showFlashCards + " cards show");
    this.heading = 'Flashcards Dashboard';
  }

  public showNotesDashboard(): void {
    this.showFlashCards = false;
    this.showNotes = true;
    console.log(this.showNotes + " notes show");
    this.heading = 'Notes Dashboard';
  }

  /** ✅ Navigates to the login route */
  public navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}