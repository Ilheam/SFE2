import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesByFamilleComponent } from './articles-by-famille.component';

describe('ArticlesByFamilleComponent', () => {
  let component: ArticlesByFamilleComponent;
  let fixture: ComponentFixture<ArticlesByFamilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesByFamilleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticlesByFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
