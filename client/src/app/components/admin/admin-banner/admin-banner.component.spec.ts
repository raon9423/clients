import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBannerComponent } from './admin-banner.component';

describe('AdminBannerComponent', () => {
  let component: AdminBannerComponent;
  let fixture: ComponentFixture<AdminBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
