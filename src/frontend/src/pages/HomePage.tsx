import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, PlusCircle } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-12rem)]">
      <section className="relative overflow-hidden border-b-4 border-banana-dark bg-gradient-to-br from-banana-light via-banana-medium to-banana-accent">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <img
              src="/assets/generated/banana-hero.dim_1600x600.png"
              alt="Banana Comics Hero"
              className="mx-auto mb-8 w-full max-w-3xl rounded-2xl border-4 border-banana-dark shadow-comic"
            />
            
            <h2 className="mb-6 font-display text-4xl font-black uppercase leading-tight text-banana-dark md:text-6xl">
              The Ultimate Banana Comics Showcase
            </h2>
            
            <p className="mb-8 font-body text-xl leading-relaxed text-banana-dark/90 md:text-2xl">
              From Minions to classic comic strips, discover the many hilarious uses of this bent fruit in comics throughout history. Share your favorites and explore the most a-peel-ing moments in comic art!
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={() => navigate({ to: '/browse' })}
                className="group w-full font-display text-xl font-bold uppercase shadow-comic sm:w-auto"
              >
                <BookOpen className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Browse Comics
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: '/submit' })}
                className="w-full border-4 border-banana-dark font-display text-xl font-bold uppercase hover:bg-banana-dark hover:text-white sm:w-auto"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Submit Your Own
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="rounded-xl border-4 border-banana-dark bg-card p-6 shadow-comic transition-transform hover:scale-105">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-banana-accent">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 font-display text-2xl font-bold uppercase text-banana-dark">
                Discover
              </h3>
              <p className="font-body text-muted-foreground">
                Explore a curated collection of the funniest banana moments from comics, cartoons, and pop culture.
              </p>
            </div>

            <div className="rounded-xl border-4 border-banana-dark bg-card p-6 shadow-comic transition-transform hover:scale-105">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-banana-accent">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 font-display text-2xl font-bold uppercase text-banana-dark">
                Browse
              </h3>
              <p className="font-body text-muted-foreground">
                Filter by series, sort by newest, and find your favorite banana-themed comic moments.
              </p>
            </div>

            <div className="rounded-xl border-4 border-banana-dark bg-card p-6 shadow-comic transition-transform hover:scale-105">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-banana-accent">
                <PlusCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 font-display text-2xl font-bold uppercase text-banana-dark">
                Contribute
              </h3>
              <p className="font-body text-muted-foreground">
                Share your own favorite banana comic moments and help grow this hilarious collection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
