import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardDashboardComponent } from './flashcard-dashboard.component';

describe('FlashcardDashboardComponent', () => {
  let component: FlashcardDashboardComponent;
  let fixture: ComponentFixture<FlashcardDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashcardDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
