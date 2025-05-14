import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Photo {
    id: number
    url: string
    title: string
    thumbnailUrl?: string
}

interface PhotoCarouselProps {
    photos: Photo[]
    initialIndex: number
}

export function PhotoCarousel({ photos, initialIndex }: PhotoCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        startIndex: initialIndex,
        loop: true
    })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {photos.map((photo) => (
                        <div key={photo.id} className="flex-[0_0_100%] min-w-0">
                            <img
                                src={photo.url}
                                alt={photo.title}
                                className="w-full h-auto"
                            />
                            <p className="text-center mt-2 text-sm text-gray-600">
                                {photo.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                onClick={scrollPrev}
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                onClick={scrollNext}
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    )
} 