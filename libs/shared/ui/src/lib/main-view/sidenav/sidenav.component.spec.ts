import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatListHarness, MatNavListHarness, MatNavListItemHarness } from '@angular/material/list/testing';
import { SidenavComponent } from './sidenav.component';
import { RouterTestingModule } from '@angular/router/testing';

import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatListModule } from '@angular/material/list';
describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      imports: [
        RouterTestingModule,
        MatListModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(SidenavComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when there are links given', () => {
    let linkList: MatNavListHarness;
    let links: MatNavListItemHarness[];
    beforeEach(async () => {
      component.links = [
        {
          path: '/check-in',
          name: 'Check In',
          icon: 'check',
        },
        {
          path: '/signout',
          name: 'Signout',
          icon: 'person_pin_circle',
        },
        {
          path: 'excusals',
          name: 'Excusals',
          icon: 'verified_user',
        },
      ];
      fixture.detectChanges();
      linkList = await loader.getHarness(MatNavListHarness);
      links = await linkList.getItems();
    })
    it('should render the links given', async () => {
      expect(links).toHaveLength(component.links.length);
      expect(await parallel(() => links.map(l => l.getText()))).toEqual(component.links.map(l => l.name));
      expect(await parallel(() => links.map(l => l.hasIcon()))).toEqual(component.links.map(l => !!l.icon));
    });
    it('should only render the protected routes if the user has the right role', async () => {
      component.links[2].roles = ['superadmin', 'aod'];
      fixture.detectChanges();
      links = await linkList.getItems();
      expect(links).toHaveLength(2);
      component.role = 'aod';
      fixture.detectChanges();
      links = await linkList.getItems();
      expect(links).toHaveLength(3);
      expect(await links[2].getText()).toBe(component.links[2].name);
    });
  })

});
