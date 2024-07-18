import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import { Card,CardContent } from '@/components/ui/card';
  import Autoplay from "embla-carousel-autoplay"

  const CarouselCard =()=>{
    return(
        <Carousel className="relative md:max-w-xl" 
            plugins={[
                Autoplay({
                delay: 2000,
                }),
            ]}
            opts={{
            align: "center",
            }}
            orientation="vertical">
            <CarouselContent className=" h-[500px] w-[500px]">
                {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index}>
                    <CardContent className="aspect-square flex items-center justify-center">
                        <img src={`/${index}.png`} className="w-full h-full object-fill p-6" />
                    </CardContent>
                </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
  }
  export default CarouselCard