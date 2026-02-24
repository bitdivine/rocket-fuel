import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t-4 border-banana-dark bg-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="font-body text-sm text-banana-dark">
          © 2026. Built with{' '}
          <Heart className="inline h-4 w-4 fill-banana-accent text-banana-accent" /> using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-banana-dark underline hover:text-banana-accent"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
