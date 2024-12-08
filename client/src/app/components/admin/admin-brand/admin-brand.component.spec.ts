import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminBrandComponent } from './admin-brand.component';

describe('AdminBrandComponent', () => {
  let component: AdminBrandComponent;
  let fixture: ComponentFixture<AdminBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBrandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
