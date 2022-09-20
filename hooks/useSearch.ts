import { useRouter } from 'next/router';

function useSearch(target: string) {
  return useRouter().query[target]?.toString();
}

export default useSearch;
