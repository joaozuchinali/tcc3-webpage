import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingcompComponent } from './loadingcomp.component';

describe('LoadingcompComponent', () => {
  let component: LoadingcompComponent;
  let fixture: ComponentFixture<LoadingcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingcompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
