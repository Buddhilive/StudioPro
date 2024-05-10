import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicVaeComponent } from './music-vae.component';

describe('MusicVaeComponent', () => {
  let component: MusicVaeComponent;
  let fixture: ComponentFixture<MusicVaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicVaeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MusicVaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
