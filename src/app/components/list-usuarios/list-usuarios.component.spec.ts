import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsuariosComponent } from './list-usuarios.component';

describe('ListUsuariosComponent', () => {
  let component: ListUsuariosComponent;
  let fixture: ComponentFixture<ListUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
