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
  public isEditing: boolean = false;
  public editNoteId: number | null = null;

  // Use objects instead of strings to preserve focus
  public newKeypoints: { value: string }[] = [
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' }
  ];
  public newTopic: string = '';
  public newDescription: string = '';

  constructor(private noteService: NotesService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  private loadNotes(): void {
    this.noteService.getAllNotes().subscribe({
      next: (response: NoteDto[]) => this.notes = response,
      error: err => console.error('Error fetching notes:', err)
    });
  }

  public toggleAddNewNote(): void {
    this.showNotes = !this.showNotes;
    this.isEditing = false;
    this.editNoteId = null;
    this.resetFormFields();
  }

  public saveNewNote(): void {
    if (
      this.newTopic &&
      this.newDescription &&
      this.newKeypoints.some(k => k.value.trim() !== '')
    ) {
      const newNote: NoteDto = {
        id: 0,
        topic: this.newTopic,
        description: this.newDescription,
        points: this.newKeypoints.map(k => k.value.trim()).filter(k => k !== '')
      };

      this.noteService.addNote(newNote).subscribe({
        next: () => {
          this.loadNotes();
          this.toggleAddNewNote();
        },
        error: err => console.error('Error adding note:', err)
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  public deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe({
      next: () => this.loadNotes(),
      error: err => console.error('Error deleting note:', err)
    });
  }

  public editNote(id: number, note: NoteDto): void {
    this.isEditing = true;
    this.showNotes = false;
    this.editNoteId = id;
    this.newTopic = note.topic;
    this.newDescription = note.description;
    this.newKeypoints = note.points.map(p => ({ value: p }));
  }

  public updateNote(): void {
    if (this.editNoteId === null) return;

    const updatedNote: NoteDto = {
      id: this.editNoteId,
      topic: this.newTopic,
      description: this.newDescription,
      points: this.newKeypoints.map(k => k.value.trim()).filter(k => k !== '')
    };

    this.noteService.updateNote(updatedNote).subscribe({
      next: () => {
        this.loadNotes();
        this.resetNoteForm();
      },
      error: err => console.error('Error updating note:', err)
    });
  }

  public addKeypoint(): void {
    this.newKeypoints.push({ value: '' });
  }

  public removeKeypoint(index: number): void {
    if (this.newKeypoints.length > 1) {
      this.newKeypoints.splice(index, 1);
    }
  }


  public cancelNoteForm(): void {
    this.resetNoteForm();
  }

  private resetNoteForm(): void {
    this.showNotes = true;
    this.isEditing = false;
    this.editNoteId = null;
    this.resetFormFields();
  }

  private resetFormFields(): void {
    this.newTopic = '';
    this.newDescription = '';
    this.newKeypoints = [
      { value: '' },
      { value: '' },
      { value: '' },
      { value: '' }
    ];
  }

  trackByIndex(index: number): number {
    return index;
  }
}
