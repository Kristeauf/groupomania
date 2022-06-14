import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggComponent } from './logg.component';

describe('LoggComponent', () => {
  let component: LoggComponent;
  let fixture: ComponentFixture<LoggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
