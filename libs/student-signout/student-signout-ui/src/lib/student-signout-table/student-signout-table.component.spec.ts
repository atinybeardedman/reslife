import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  SimpleChange,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableHarness } from '@angular/material/table/testing';
import { MatTableModule } from '@angular/material/table';

import { StudentSignoutTableComponent } from './student-signout-table.component';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StudentSignout } from '@reslife/student-signout/student-signout-model';
describe('StudentSignoutTableComponent', () => {
  let component: StudentSignoutTableComponent;
  let fixture: ComponentFixture<StudentSignoutTableComponent>;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentSignoutTableComponent],
      imports: [
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(StudentSignoutTableComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSignoutTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no results if no signouts exist', async () => {
    expect(fixture.nativeElement.textContent).toContain(
      'No Students Signed Out'
    );
    expect(await loader.getAllHarnesses(MatTableHarness)).toHaveLength(0);
  });

  describe('if signouts exist', () => {
    const testSignout1: StudentSignout = {
      student: {
        name: 'Test Boarder',
        uid: '1234',
      },
      timeOut: new Date().toISOString(),
      isCurrentlyOut: true,
      uid: 'abc',
      destination: 'Starbucks',
      transport: 'Car',
      transportNote: 'Uber',
    };
    const testSignout2: StudentSignout = {
      student: {
        name: 'Test Boarder 2',
        uid: '12345',
      },
      timeOut: new Date().toISOString(),
      isCurrentlyOut: true,
      uid: 'abcd',
      destination: 'Store',
      transport: 'Walk',
    };
    beforeEach(() => {
      component.signouts = [testSignout1, testSignout2];
      component.ngOnChanges({
        signouts: new SimpleChange(null, [testSignout1, testSignout2], false),
      });
      fixture.detectChanges();
    });

    it('should show the table when signouts exist', async () => {
      const table = await loader.getHarness(MatTableHarness);
      expect(table).toBeTruthy();
      const rows = await table.getRows();
      expect(rows.length).toBe(2);

      const [row1Name] = await rows[0].getCellTextByIndex({
        columnName: 'name',
      });
      const [row2Name] = await rows[1].getCellTextByIndex({
        columnName: 'name',
      });
      expect(row1Name).toBe(testSignout1.student.name);
      expect(row2Name).toBe(testSignout2.student.name);
    });

    it('should show the details of the car signout', async () => {
      const table = await loader.getHarness(MatTableHarness);
      const rows = await table.getRows();
      const [carDetails] = await rows[0].getCellTextByIndex({
        columnName: 'transport',
      });
      expect(carDetails).toBe(testSignout1.transportNote + ' (Car)');
    });

    it('should emit the signout when an action is clicked', async () => {
      const editSpy = jest.spyOn(component.edit, 'emit');
      const signInSpy = jest.spyOn(component.signIn, 'emit');
      const editButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'edit' })
      );
      await editButton.click();
      expect(editSpy).toHaveBeenCalledWith(testSignout1);

      const signInButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'check' })
      );
      await signInButton.click();
      expect(signInSpy).toHaveBeenCalledWith(testSignout1);
    });
  });
});
