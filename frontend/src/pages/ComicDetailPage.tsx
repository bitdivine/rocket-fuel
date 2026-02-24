import { useParams, useNavigate } from '@tanstack/react-router';
import { useComicEntry } from '@/hooks/comics/useComicEntry';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, ExternalLink, Calendar, Tag, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ComicDetailPage() {
  const { id } = useParams({ from: '/comic/$id' });
  const navigate = useNavigate();
  const { data: comic, isLoading, error } = useComicEntry(BigInt(id));

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-12rem)] bg-background py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <Skeleton className="mb-8 h-10 w-32" />
          <div className="rounded-xl border-4 border-banana-dark bg-card p-8 shadow-comic">
            <Skeleton className="mb-6 h-96 w-full" />
            <Skeleton className="mb-4 h-10 w-3/4" />
            <Skeleton className="mb-4 h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !comic) {
    return (
      <div className="min-h-[calc(100vh-12rem)] bg-background py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/browse' })}
            className="mb-8 font-display font-bold uppercase"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Browse
          </Button>
          <Alert variant="destructive" className="border-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Comic Not Found</AlertTitle>
            <AlertDescription>
              The comic you're looking for doesn't exist or has been removed.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(Number(comic.createdAt) / 1000000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-background py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/browse' })}
          className="mb-8 font-display font-bold uppercase hover:bg-banana-accent hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Browse
        </Button>

        <article className="rounded-xl border-4 border-banana-dark bg-card shadow-comic">
          {comic.imageUrl && (
            <div className="border-b-4 border-banana-dark">
              <img
                src={comic.imageUrl}
                alt={comic.title}
                className="h-auto w-full rounded-t-lg object-cover"
                style={{ maxHeight: '500px' }}
              />
            </div>
          )}

          <div className="p-8">
            <div className="mb-6">
              <h1 className="mb-4 font-display text-4xl font-black uppercase leading-tight text-banana-dark md:text-5xl">
                {comic.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4">
                <Badge className="border-2 border-banana-dark bg-banana-accent font-display text-sm font-bold uppercase">
                  <Tag className="mr-1 h-3 w-3" />
                  {comic.series}
                </Badge>
                <div className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="mb-3 font-display text-xl font-bold uppercase text-banana-dark">
                Description
              </h2>
              <p className="whitespace-pre-wrap font-body text-lg leading-relaxed text-foreground">
                {comic.description}
              </p>
            </div>

            {comic.link && (
              <div>
                <h2 className="mb-3 font-display text-xl font-bold uppercase text-banana-dark">
                  Source Link
                </h2>
                <a
                  href={comic.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-lg text-banana-accent underline hover:text-banana-dark"
                >
                  View Original Source
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
