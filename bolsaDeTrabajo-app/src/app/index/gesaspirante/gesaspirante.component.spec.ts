import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GesaspiranteComponent } from './gesaspirante.component';

describe('GesaspiranteComponent', () => {
  let component: GesaspiranteComponent;
  let fixture: ComponentFixture<GesaspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GesaspiranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GesaspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
