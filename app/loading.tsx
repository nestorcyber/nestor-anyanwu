export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center" aria-label="Loading page">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo mark */}
        <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Loading</span>
      </div>
    </div>
  )
}
