import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { ComicEntry, Id } from '@/backend';

export function useComicEntry(id: Id) {
  const { actor, isFetching } = useActor();

  return useQuery<ComicEntry | null>({
    queryKey: ['comicEntry', id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getComicEntry(id);
      } catch (error) {
        console.error('Error fetching comic entry:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!id,
    retry: false,
  });
}
