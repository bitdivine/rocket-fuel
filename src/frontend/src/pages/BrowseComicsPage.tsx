import { useState, useMemo } from 'react';
import { useComicEntries } from '@/hooks/comics/useComicEntries';
import ComicCard from '@/components/comics/ComicCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Search } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function BrowseComicsPage() {
  const { data: comics, isLoading, error } = useComicEntries();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const uniqueSeries = useMemo(() => {
    if (!comics) return [];
    const seriesSet = new Set(comics.map((comic) => comic.series));
    return Array.from(seriesSet).sort();
  }, [comics]);

  const filteredAndSortedComics = useMemo(() => {
    if (!comics) return [];

    let filtered = comics;

    if (searchTerm) {
      filtered = filtered.filter(
        (comic) =>
          comic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comic.series.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSeries !== 'all') {
      filtered = filtered.filter((comic) => comic.series === selectedSeries);
    }

    const sorted = [...filtered].sort((a, b) => {
      const timeA = Number(a.createdAt);
      const timeB = Number(b.createdAt);
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });

    return sorted;
  }, [comics, searchTerm, selectedSeries, sortOrder]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Alert variant="destructive" className="border-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load comics. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="mb-4 font-display text-4xl font-black uppercase text-banana-dark md:text-5xl">
            Browse Comics
          </h1>
          <p className="font-body text-lg text-muted-foreground">
            Explore our collection of hilarious banana moments in comics
          </p>
        </div>

        <div className="mb-8 grid gap-4 rounded-xl border-4 border-banana-dark bg-card p-6 shadow-comic md:grid-cols-3">
          <div>
            <Label htmlFor="search" className="mb-2 font-display text-sm font-bold uppercase">
              Search
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search comics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-2 pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="series" className="mb-2 font-display text-sm font-bold uppercase">
              Filter by Series
            </Label>
            <Select value={selectedSeries} onValueChange={setSelectedSeries}>
              <SelectTrigger id="series" className="border-2">
                <SelectValue placeholder="All Series" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Series</SelectItem>
                {uniqueSeries.map((series) => (
                  <SelectItem key={series} value={series}>
                    {series}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="sort" className="mb-2 font-display text-sm font-bold uppercase">
              Sort By
            </Label>
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as 'newest' | 'oldest')}>
              <SelectTrigger id="sort" className="border-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl border-4 border-banana-dark p-4">
                <Skeleton className="mb-4 h-48 w-full" />
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-2 h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : filteredAndSortedComics.length === 0 ? (
          <div className="rounded-xl border-4 border-banana-dark bg-card p-12 text-center shadow-comic">
            <p className="font-display text-xl font-bold uppercase text-muted-foreground">
              No comics found. Try adjusting your filters!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedComics.map((comic) => (
              <ComicCard key={comic.id.toString()} comic={comic} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
