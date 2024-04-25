import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitifyComponent } from './splitify.component';

describe('SplitifyComponent', () => {
  let component: SplitifyComponent;
  let fixture: ComponentFixture<SplitifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SplitifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
