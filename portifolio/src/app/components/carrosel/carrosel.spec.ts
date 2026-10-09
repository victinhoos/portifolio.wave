import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carrosel } from './carrosel';

describe('Carrosel', () => {
  let component: Carrosel;
  let fixture: ComponentFixture<Carrosel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carrosel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carrosel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
