import { Component } from '@angular/core';
import { NoteDto } from '../../models/notes';
import { NotesService } from '../../services/note.service';
import { NotesComponent } from "../notes/notes.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes-dashboard',
  imports: [NotesComponent, NotesComponent,CommonModule, FormsModule],
  templateUrl: './notes-dashboard.component.html',
  styleUrl: './notes-dashboard.component.css'
})
export class NotesDashboardComponent {

  public notes: NoteDto[] = [];

  public showNotes: boolean = true;

  newTopic: string = '';
  newDescription: string = '';
  newKeypoints: string[] = ['', '', '', ''];

  constructor(private noteService: NotesService) { }

  public ngOnInit() {
    this.loadNotes();
  }

  private loadNotes(): void {
    this.noteService.getAllNotes().subscribe({
      next: (responseData: NoteDto[]) => {
        this.notes = responseData;
        console.log(this.notes)
      },
      error: (error: any) => {
        console.error('Error fetching notes:', error);
      }
    });
  }

  public saveNewNote(): void {

    const newNote: NoteDto = {
      topic: this.newTopic,
      description: this.newDescription,
      points: this.newKeypoints.filter(option => option !== ''),
      id: 0
    };

    this.noteService.addNote(newNote).subscribe({
      next: (responseData: NoteDto) => {
        this.loadNotes();
        this.resetNewNoteForm();
      },
      error: (error: any) => {
        console.error('Error adding Note:', error);
      }
    });
  }

 public deleteNote(id: number): void {
  this.noteService.deleteNote(id).subscribe(() => {
    this.notes = this.notes.filter(note => note.id !== id);
  });
}
  private resetNewNoteForm() {
    this.newTopic = '';
    this.newDescription = '';
    this.newKeypoints = ['', '', '', ''];
  }


  public toggleAddNewNote(): void {
    this.showNotes = !this.showNotes;
  }
}
