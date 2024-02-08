import React from 'react';

function getInitialValue<T>(key: string, fallback: T): T {
  const persistedValue = localStorage.getItem(key);
  if (!persistedValue) {
    return fallback;
  }
  try {
    const parsed = JSON.parse(persistedValue);
    return typeof parsed === typeof fallback ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export default function usePeristedState<T>(key: string, fallback: T) {
  const state = React.useState(getInitialValue(key, fallback));

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state[0]));
  }, [state[0]]);

  return state
}
