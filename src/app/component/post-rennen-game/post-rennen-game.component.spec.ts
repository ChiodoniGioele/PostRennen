import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PostRennenGameComponent} from './post-rennen-game.component';

describe('PostRennenGameComponent', () => {
  let component: PostRennenGameComponent;
  let fixture: ComponentFixture<PostRennenGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostRennenGameComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PostRennenGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
