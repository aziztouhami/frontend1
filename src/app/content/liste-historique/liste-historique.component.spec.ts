import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeHistoriqueComponent } from './liste-historique.component';

describe('ListeHistoriqueComponent', () => {
  let component: ListeHistoriqueComponent;
  let fixture: ComponentFixture<ListeHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeHistoriqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
