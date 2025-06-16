import { Component, Input } from '@angular/core';
import { NoteDto } from '../../models/notes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {

  @Input() public note!: NoteDto;

  isFlipped = false;

}
