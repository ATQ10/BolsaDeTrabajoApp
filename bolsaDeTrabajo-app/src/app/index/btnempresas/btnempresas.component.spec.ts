import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnempresasComponent } from './btnempresas.component';

describe('BtnempresasComponent', () => {
  let component: BtnempresasComponent;
  let fixture: ComponentFixture<BtnempresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnempresasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnempresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
