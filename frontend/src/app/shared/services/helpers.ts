import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Helpers {

  signalDebounce(signal: Signal<string>, delay: number = 500) {
    const debounceObservable = toObservable(signal).pipe(
      debounceTime(delay),
      distinctUntilChanged()
    );
    return toSignal(debounceObservable);
  }

}
