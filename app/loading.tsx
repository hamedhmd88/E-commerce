export default function Loading() {
  return (
    <div className="min-h-screen relative">
      <div className="bg-muted h-16 animate-pulse" /> {/* Navigation skeleton */}
      <main>
        <div className="h-96 bg-muted animate-pulse" /> {/* AnimatedSlider skeleton */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-pulse">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="h-8 w-48 bg-muted-foreground/20 rounded mx-auto animate-pulse" />
              <div className="h-16 w-3/4 bg-muted-foreground/20 rounded mx-auto animate-pulse" />
              <div className="h-6 w-1/2 bg-muted-foreground/20 rounded mx-auto animate-pulse" />
              <div className="flex justify-center gap-4">
                <div className="h-12 w-32 bg-muted-foreground/20 rounded animate-pulse" />
                <div className="h-12 w-32 bg-muted-foreground/20 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </section>
        <div className="py-16 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto px-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-64 mb-4" />
                <div className="bg-muted rounded h-4 mb-2" />
                <div className="bg-muted rounded h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="bg-muted h-32 animate-pulse" /> {/* Footer skeleton */}
    </div>
  )
}