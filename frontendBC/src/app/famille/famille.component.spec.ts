import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilleComponent } from './famille.component';

describe('FamilleComponent', () => {
  let component: FamilleComponent;
  let fixture: ComponentFixture<FamilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
