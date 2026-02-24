import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCreateComicEntry } from '@/hooks/comics/useCreateComicEntry';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SubmitComicPage() {
  const navigate = useNavigate();
  const { mutate: createComic, isPending } = useCreateComicEntry();

  const [formData, setFormData] = useState({
    title: '',
    series: '',
    description: '',
    imageUrl: '',
    link: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.series.trim()) {
      newErrors.series = 'Series/Source is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    if (formData.link && !isValidUrl(formData.link)) {
      newErrors.link = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    createComic(
      {
        title: formData.title.trim(),
        series: formData.series.trim(),
        description: formData.description.trim(),
        imageUrl: formData.imageUrl.trim() || undefined,
        link: formData.link.trim() || undefined,
      },
      {
        onSuccess: () => {
          setSubmitSuccess(true);
          toast.success('Comic submitted successfully!');
          setTimeout(() => {
            navigate({ to: '/browse' });
          }, 2000);
        },
        onError: (error) => {
          toast.error('Failed to submit comic. Please try again.');
          console.error('Submit error:', error);
        },
      }
    );
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-[calc(100vh-12rem)] bg-background py-12">
        <div className="container mx-auto max-w-2xl px-4">
          <Alert className="border-4 border-banana-dark bg-banana-light shadow-comic">
            <CheckCircle2 className="h-5 w-5 text-banana-accent" />
            <AlertTitle className="font-display text-xl font-bold uppercase">
              Success!
            </AlertTitle>
            <AlertDescription className="font-body text-lg">
              Your comic has been submitted successfully. Redirecting to browse page...
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-background py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="mb-8">
          <h1 className="mb-4 font-display text-4xl font-black uppercase text-banana-dark md:text-5xl">
            Submit a Comic
          </h1>
          <p className="font-body text-lg text-muted-foreground">
            Share your favorite banana moment from comics with the community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border-4 border-banana-dark bg-card p-8 shadow-comic">
          <div className="space-y-6">
            <div>
              <Label htmlFor="title" className="mb-2 font-display text-sm font-bold uppercase">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Minions Love Bananas"
                className={`border-2 ${errors.title ? 'border-destructive' : ''}`}
                disabled={isPending}
              />
              {errors.title && (
                <p className="mt-1 flex items-center gap-1 font-body text-sm text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="series" className="mb-2 font-display text-sm font-bold uppercase">
                Series/Source <span className="text-destructive">*</span>
              </Label>
              <Input
                id="series"
                value={formData.series}
                onChange={(e) => handleChange('series', e.target.value)}
                placeholder="e.g., Despicable Me, Peanuts, etc."
                className={`border-2 ${errors.series ? 'border-destructive' : ''}`}
                disabled={isPending}
              />
              {errors.series && (
                <p className="mt-1 flex items-center gap-1 font-body text-sm text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors.series}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="mb-2 font-display text-sm font-bold uppercase">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe the hilarious banana moment..."
                rows={6}
                className={`border-2 ${errors.description ? 'border-destructive' : ''}`}
                disabled={isPending}
              />
              {errors.description && (
                <p className="mt-1 flex items-center gap-1 font-body text-sm text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="imageUrl" className="mb-2 font-display text-sm font-bold uppercase">
                Image URL (Optional)
              </Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className={`border-2 ${errors.imageUrl ? 'border-destructive' : ''}`}
                disabled={isPending}
              />
              {errors.imageUrl && (
                <p className="mt-1 flex items-center gap-1 font-body text-sm text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors.imageUrl}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="link" className="mb-2 font-display text-sm font-bold uppercase">
                Source Link (Optional)
              </Label>
              <Input
                id="link"
                type="url"
                value={formData.link}
                onChange={(e) => handleChange('link', e.target.value)}
                placeholder="https://example.com/source"
                className={`border-2 ${errors.link ? 'border-destructive' : ''}`}
                disabled={isPending}
              />
              {errors.link && (
                <p className="mt-1 flex items-center gap-1 font-body text-sm text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  {errors.link}
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className="flex-1 font-display text-lg font-bold uppercase shadow-comic"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Comic'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate({ to: '/browse' })}
                disabled={isPending}
                className="border-4 border-banana-dark font-display text-lg font-bold uppercase hover:bg-banana-dark hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
