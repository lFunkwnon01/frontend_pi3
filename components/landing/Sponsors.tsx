"use client"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

export function Sponsors() {
    const logos = [
        { src: "/starbucks_logo.png", alt: "Starbucks" },
        { src: "/aje_logo.png", alt: "AJE" },
        { src: "/beso frances logo.jpeg", alt: "Beso Francés" },
        { src: "/logo de tambo.png", alt: "Tambo" },
        { src: "/metro logo.jpeg", alt: "Metro" },
    ]

    return (
        <section className="bg-white py-10 border-b">
            <div className="max-w-7xl mx-auto px-4 overflow-hidden">
                <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-widest">Confían en nosotros</p>
                <div className="relative flex overflow-x-hidden group">
                    <div className="animate-marquee whitespace-nowrap flex items-center gap-16">
                        {/* Double the logos for seamless loop */}
                        {[...logos, ...logos, ...logos].map((logo, idx) => (
                            <div key={idx} className="flex items-center justify-center w-[150px] h-[80px] grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
