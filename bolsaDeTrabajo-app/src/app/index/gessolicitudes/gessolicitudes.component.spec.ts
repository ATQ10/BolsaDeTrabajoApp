import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GessolicitudesComponent } from './gessolicitudes.component';

describe('GessolicitudesComponent', () => {
  let component: GessolicitudesComponent;
  let fixture: ComponentFixture<GessolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GessolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GessolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
