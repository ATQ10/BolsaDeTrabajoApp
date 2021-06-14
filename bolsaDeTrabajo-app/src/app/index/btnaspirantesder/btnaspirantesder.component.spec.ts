import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnaspirantesderComponent } from './btnaspirantesder.component';

describe('BtnaspirantesderComponent', () => {
  let component: BtnaspirantesderComponent;
  let fixture: ComponentFixture<BtnaspirantesderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnaspirantesderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnaspirantesderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
