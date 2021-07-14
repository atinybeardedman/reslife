import { ComponentFixture, TestBed } from '@angular/core/testing';

import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatToolbarHarness} from '@angular/material/toolbar/testing';
import {MatIconHarness} from '@angular/material/icon/testing';
import {MatButtonHarness} from '@angular/material/button/testing';

import {HarnessLoader} from '@angular/cdk/testing';

import { TopBarComponent } from './top-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy } from '@angular/core';
describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatToolbarModule, MatIconModule, MatButtonModule],
      declarations: [ TopBarComponent ]
    })
    .overrideComponent(TopBarComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a mat-toolbar', async () => {
    const toolbars = await loader.getAllHarnesses(MatToolbarHarness);
    expect(toolbars.length).toBe(1);
  });

  it('should render the title', async () => {
    component.title = 'My App';
    fixture.detectChanges();
    const toolbars = await loader.getAllHarnesses(MatToolbarHarness.with({text: 'My App'}));
    expect(toolbars.length).toBe(1);
  });

  it('should render the hamburger menu', async () => {
    const button = await loader.getHarness(MatButtonHarness);
    expect(button).toBeTruthy();
    // const buttonLoader = await button.getChildLoader('mat-icon')
    const icon = await loader.getHarness(MatIconHarness);
    const name = await icon.getName();
    expect(name).toEqual('menu');
  });
});
