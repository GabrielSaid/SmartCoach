import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="py-4">
        <Skeleton className="h-12 w-full" />
      </div>

      <Skeleton className="h-10 w-full" />

      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full" />
        ))}
      </div>
    </div>
  )
}
