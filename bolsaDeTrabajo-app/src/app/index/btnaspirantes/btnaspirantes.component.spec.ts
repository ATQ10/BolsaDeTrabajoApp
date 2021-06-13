import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnaspirantesComponent } from './btnaspirantes.component';

describe('BtnaspirantesComponent', () => {
  let component: BtnaspirantesComponent;
  let fixture: ComponentFixture<BtnaspirantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnaspirantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnaspirantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
