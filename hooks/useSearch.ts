import { useRouter } from 'next/router';

function useSearch(target: string) {
  return useRouter().query[target]?.toString() || '';
}

function useMultipleSearch(targets: readonly string[]) {
  // TODO: add typescript code array to tuple
  const router = useRouter();
  return targets.map((target) => router.query[target]?.toString() || '');
}

export { useSearch, useMultipleSearch };
