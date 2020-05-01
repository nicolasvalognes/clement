import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalisationFormComponent } from './localisation-form.component';

describe('LocalisationFormComponent', () => {
  let component: LocalisationFormComponent;
  let fixture: ComponentFixture<LocalisationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalisationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalisationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
