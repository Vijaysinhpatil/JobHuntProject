
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../ui/carousel";
import { Button } from "../ui/button";

const CategoryCarousel = () => {
    const categories = [
        "FrontEnd Developer",
        "BackEnd Developer",
        "Data Scientist",
        "Graphics Designer",
        "AI Engineer",
        "ML Developer",
        "Java Developer",
        "FullStack Developer"
    ];

    return (
        <section
            style={{ fontFamily: "'Poppins', sans-serif" }}
            className="py-16 bg-gradient-to-br"
        >
            <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
                Explore <span className="text-[#6A38C2]">Job Categories</span>
            </h2>

            <Carousel className="w-full max-w-5xl mx-auto flex items-center relative">
                <CarouselContent>
                    {categories.map((item, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-1/2 lg:basis-1/3 cursor-grab flex justify-center"
                        >
                            <Button
                                variant="outline"
                                className="w-full max-w-[220px] py-6 text-lg font-semibold text-gray-800 border-2 border-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-all duration-300 rounded-xl shadow-md"
                            >
                                {item}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Carousel Controls */}
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#6A38C2] hover:bg-[#5A2EB0] text-white p-3 rounded-full shadow-md transition-all duration-300" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#6A38C2] hover:bg-[#5A2EB0] text-white p-3 rounded-full shadow-md transition-all duration-300" />
            </Carousel>
        </section>
    );
};

export default CategoryCarousel;
