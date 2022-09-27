import { useRouter } from 'next/router';

function useSearch(target: string) {
  return useRouter().query[target]?.toString() || null;
}

function useMultipleSearch(targets: string[]) {
  // TODO: add typescript code array to tuple
  const router = useRouter();
  return targets.map((target) => router.query[target]?.toString() || null);
}

export { useSearch, useMultipleSearch };
