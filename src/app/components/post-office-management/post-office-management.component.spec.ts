import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOfficeManagementComponent } from './post-office-management.component';

describe('PostOfficeManagementComponent', () => {
  let component: PostOfficeManagementComponent;
  let fixture: ComponentFixture<PostOfficeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostOfficeManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostOfficeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
