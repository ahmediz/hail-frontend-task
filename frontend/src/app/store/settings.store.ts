import { effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { withLocalStorageSync } from './with-local-storage-sync';

type SettingsState = {
  isDark: boolean | undefined;
};

const initialState: SettingsState = {
  isDark: undefined,
};

export const SettingsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withLocalStorageSync('settings'),
  withMethods((store) => ({
    changeTheme: (isDark: boolean) => {
      patchState(store, (_) => ({
        isDark,
      }));
    },
  })),
  withHooks({
    onInit(store) {
      store.loadFromLocalStorage();

      patchState(store, (_) => ({
        isDark:
          store.isDark() === undefined
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
            : store.isDark(),
      }));

      effect(() => {
        store.saveToLocalStorage();
        // Theme
        document.documentElement.classList.toggle('dark', store.isDark());
      });
    },
  })
);
