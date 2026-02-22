import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loading } from './loading';

describe('Loading', () => {
  let component: Loading;
  let fixture: ComponentFixture<Loading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loading],
    }).compileComponents();

    fixture = TestBed.createComponent(Loading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading-message p').textContent).toContain(
      'Loading...',
    );
  });

  it('should show spinner when isLoading is true', () => {
    const compiled = fixture.nativeElement;
    const spinner = compiled.querySelector('.spinner');
    expect(spinner).toBeTruthy();
  });

  it('should hide loading when isLoading is false', () => {
    fixture.componentRef.setInput('isLoading', false);
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.loading-wrapper');
    expect(wrapper).toBeFalsy();
  });

  it('should apply correct size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.loading-container');
    expect(container.classList.contains('size-lg')).toBe(true);
  });

  it('should show backdrop when showBackdrop is true', () => {
    fixture.componentRef.setInput('showBackdrop', true);
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('.loading-wrapper');
    expect(wrapper.classList.contains('show-backdrop')).toBe(true);
  });
});
