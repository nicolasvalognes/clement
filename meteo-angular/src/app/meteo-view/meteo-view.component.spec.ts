import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoViewComponent } from './meteo-view.component';

describe('MeteoViewComponent', () => {
  let component: MeteoViewComponent;
  let fixture: ComponentFixture<MeteoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
