import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";

type InteractionState = {
  loadingStates: any; // Map of loading states
};

const initialState: InteractionState = {
  loadingStates: {}
};

export const InteractionStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods((store) => ({
    turnOnNamedLoading: (loadingName: string) => {
      const loadingStates: any = { ...store.loadingStates() };
      loadingStates[loadingName] = true;
      patchState(store, (_) => ({ loadingStates }));
    },
    turnOffNamedLoading: (loadingName: string) => {
      const loadingStates: any = { ...store.loadingStates() };
      if (loadingStates[loadingName]) {
        delete loadingStates[loadingName];
      }
      patchState(store, (_) => ({ loadingStates }));
    }
  }))
);
