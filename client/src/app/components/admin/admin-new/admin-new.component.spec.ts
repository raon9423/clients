import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewComponent } from './admin-new.component';

describe('AdminNewComponent', () => {
  let component: AdminNewComponent;
  let fixture: ComponentFixture<AdminNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
