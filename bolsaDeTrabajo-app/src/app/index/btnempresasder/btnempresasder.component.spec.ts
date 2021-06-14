import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnempresasderComponent } from './btnempresasder.component';

describe('BtnempresasderComponent', () => {
  let component: BtnempresasderComponent;
  let fixture: ComponentFixture<BtnempresasderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnempresasderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnempresasderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
