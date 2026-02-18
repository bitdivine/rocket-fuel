import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { ComicEntry } from '@/backend';

export function useComicEntries() {
  const { actor, isFetching } = useActor();

  return useQuery<ComicEntry[]>({
    queryKey: ['comicEntries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listComicEntries();
    },
    enabled: !!actor && !isFetching,
  });
}
