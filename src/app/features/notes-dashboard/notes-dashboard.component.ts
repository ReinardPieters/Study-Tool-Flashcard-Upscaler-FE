import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteDto } from '../../models/notes';
import { NotesComponent } from "../notes/notes.component";
import { NotesService } from '../../services/note.service';

@Component({
  selector: 'app-notes-dashboard',
  standalone: true,
  imports: [NotesComponent, CommonModule, FormsModule],
  templateUrl: './notes-dashboard.component.html',
  styleUrls: ['./notes-dashboard.component.css']
})
export class NotesDashboardComponent {

  public notes: NoteDto[] = [];
  public showNotes: boolean = true;

  newTopic: string = '';
  newDescription: string = '';
  newKeypoints: string[] = ['', '', '', ''];

  constructor(private noteService: NotesService) { }

  public ngOnInit(): void {
    this.loadNotes();
  }

  private loadNotes(): void {
    this.noteService.getAllNotes().subscribe({
      next: (responseData: NoteDto[]) => {
        this.notes = responseData;
      },
      error: (error: any) => {
        console.error('Error fetching notes:', error);
      }
    });
  }

  public toggleAddNewNote(): void {
    this.showNotes = !this.showNotes;
  }

  public saveNewNote(): void {
    if (this.newTopic && this.newDescription && this.newKeypoints.some(k => k.trim() !== '')) {
      const newNote: NoteDto = {
        id: 0,
        topic: this.newTopic,
        description: this.newDescription,
        points: this.newKeypoints.filter(k => k.trim() !== '')
      };

      this.noteService.addNote(newNote).subscribe({
        next: (responseData: NoteDto) => {
          this.loadNotes();
          this.toggleAddNewNote();
          this.resetNewNoteForm();
        },
        error: (error: any) => {
          console.error('Error adding note:', error);
        }
      });
    } else {
      alert('Please fill in the topic, description, and at least one key point.');
    }
  }

  public deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe(() => {
      this.notes = this.notes.filter(note => note.id !== id);
    });
    this.loadNotes();
  }

  private resetNewNoteForm(): void {
    this.newTopic = '';
    this.newDescription = '';
    this.newKeypoints = ['', '', '', ''];
  }
  
  // addKeypoint() {
  //   this.newKeypoints.push('');
  // }

}
