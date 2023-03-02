import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchEngineComponent } from './search-engine.component';

describe('SearchEngineComponent', () => {
  let component: SearchEngineComponent;
  let fixture: ComponentFixture<SearchEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchEngineComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filter event when search input changes', () => {
    const spy = spyOn(component.filterEvent, 'emit');
    const searchInput = fixture.nativeElement.querySelector('input');
    searchInput.value = 'test';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith('test');
    }, 400);
  });

  it('should debounce search input changes by 500ms', (done) => {
    const spy = spyOn(component.filterEvent, 'emit');
    const searchInput = fixture.nativeElement.querySelector('input');
    searchInput.value = 'test';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    setTimeout(() => {
      searchInput.value = 'testing';
      searchInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }, 200);
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith('testing');
      done();
    }, 800);
  });

  it('should not emit same search term multiple times', (done) => {
    const spy = spyOn(component.filterEvent, 'emit');
    const searchInput = fixture.nativeElement.querySelector('input');
    searchInput.value = 'test';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    setTimeout(() => {
      searchInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }, 200);
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 800);
  });
});
