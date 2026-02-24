import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-banana-dark bg-banana-light shadow-comic">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
          <img
            src="/assets/generated/banana-logo.dim_512x512.png"
            alt="Banana Logo"
            className="h-14 w-14 drop-shadow-comic"
          />
          <h1 className="font-display text-3xl font-black uppercase tracking-tight text-banana-dark">
            Banana
          </h1>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate({ to: '/browse' })}
            className="font-display text-lg font-bold uppercase hover:bg-banana-accent hover:text-white"
          >
            Browse Comics
          </Button>
          <Button
            size="lg"
            onClick={() => navigate({ to: '/submit' })}
            className="font-display text-lg font-bold uppercase shadow-comic"
          >
            Submit
          </Button>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-8 w-8 text-banana-dark" />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t-2 border-banana-dark bg-banana-light md:hidden">
          <nav className="container mx-auto flex flex-col gap-2 p-4">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => {
                navigate({ to: '/browse' });
                setMobileMenuOpen(false);
              }}
              className="w-full font-display text-lg font-bold uppercase"
            >
              Browse Comics
            </Button>
            <Button
              size="lg"
              onClick={() => {
                navigate({ to: '/submit' });
                setMobileMenuOpen(false);
              }}
              className="w-full font-display text-lg font-bold uppercase"
            >
              Submit
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
