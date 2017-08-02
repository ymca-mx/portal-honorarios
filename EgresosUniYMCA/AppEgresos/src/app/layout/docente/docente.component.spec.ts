import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FileComponent } from '../file/file.component';

import { PageHeaderModule } from './../../shared';

import { AltaDocenteComponent } from './altadocente.component';

describe('AltaDocenteComponent', () => {
    let component: AltaDocenteComponent;
    let fixture: ComponentFixture<AltaDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      PageHeaderModule
    ],
    declarations: [AltaDocenteComponent, FileComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(AltaDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
