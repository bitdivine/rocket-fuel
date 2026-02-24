import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import type { ComicEntry } from '@/backend';

interface ComicCardProps {
  comic: ComicEntry;
}

export default function ComicCard({ comic }: ComicCardProps) {
  const navigate = useNavigate();

  const formattedDate = new Date(Number(comic.createdAt) / 1000000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-4 border-banana-dark shadow-comic transition-all hover:scale-105 hover:shadow-comic-lg"
      onClick={() => navigate({ to: '/comic/$id', params: { id: comic.id.toString() } })}
    >
      {comic.imageUrl && (
        <div className="aspect-video overflow-hidden border-b-4 border-banana-dark bg-muted">
          <img
            src={comic.imageUrl}
            alt={comic.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
        </div>
      )}
      <CardHeader>
        <div className="mb-2 flex items-center justify-between gap-2">
          <Badge className="border-2 border-banana-dark bg-banana-accent font-display text-xs font-bold uppercase">
            {comic.series}
          </Badge>
          <div className="flex items-center gap-1 font-body text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </div>
        </div>
        <CardTitle className="font-display text-2xl font-bold uppercase leading-tight text-banana-dark group-hover:text-banana-accent">
          {comic.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="font-body text-base leading-relaxed">
          {truncateDescription(comic.description)}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
