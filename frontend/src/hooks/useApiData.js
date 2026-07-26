import { useState, useEffect } from 'react';

/**
 * Corre uma função de API (de services/api.js) e devolve { data, loading, error }.
 * `fallback` é usado enquanto carrega ou se o pedido falhar, para a UI nunca
 * ficar vazia/partida (ex: backend ainda não está no ar).
 */
export function useApiData(fetchFn, fallback = null, deps = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchFn()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) {
          console.error(err);
          setError(err);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}