import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEquipeComponent } from './item-equipe.component';

describe('ItemEquipeComponent', () => {
  let component: ItemEquipeComponent;
  let fixture: ComponentFixture<ItemEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemEquipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
