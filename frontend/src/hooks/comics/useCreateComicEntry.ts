import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { CreateRequest, ComicEntry } from '@/backend';

export function useCreateComicEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<ComicEntry, Error, CreateRequest>({
    mutationFn: async (request: CreateRequest) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      return actor.createComicEntry(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comicEntries'] });
    },
  });
}
