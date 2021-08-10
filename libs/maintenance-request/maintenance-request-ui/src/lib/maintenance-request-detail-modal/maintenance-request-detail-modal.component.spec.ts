import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { testRequests } from '@reslife/maintenance-request-model';
import { MaintenanceRequestDetailModalComponent } from './maintenance-request-detail-modal.component';
import { MaintenanceRequestDetailModalModule } from './maintenance-request-detail-modal.module';

describe('MaintenanceRequestDetailModalComponent', () => {
  let component: MaintenanceRequestDetailModalComponent;
  let fixture: ComponentFixture<MaintenanceRequestDetailModalComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        NoopAnimationsModule,
        MaintenanceRequestDetailModalModule
      ],
      declarations: [ MaintenanceRequestDetailModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .overrideComponent(MaintenanceRequestDetailModalComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceRequestDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the request data', () => {
    component.request = testRequests[0];
    fixture.detectChanges();
    
    const spans = fixture.debugElement.queryAll(By.css('span')).map(d => d.nativeElement.textContent);
    
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toBe(component.request.subject);
    expect(spans).toEqual([component.request.building, component.request.room, component.request.requestor.name, component.request.date] )
    expect(fixture.debugElement.query(By.css('p')).nativeElement.textContent).toBe(component.request.request);
  });
});
