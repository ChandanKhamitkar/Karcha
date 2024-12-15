import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetCustomComponent } from './bottom-sheet-custom.component';

describe('BottomSheetCustomComponent', () => {
  let component: BottomSheetCustomComponent;
  let fixture: ComponentFixture<BottomSheetCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSheetCustomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSheetCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
