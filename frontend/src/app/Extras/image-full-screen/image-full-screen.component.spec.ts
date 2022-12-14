import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFullScreenComponent } from './image-full-screen.component';

describe('ImageFullScreenComponent', () => {
  let component: ImageFullScreenComponent;
  let fixture: ComponentFixture<ImageFullScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageFullScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
