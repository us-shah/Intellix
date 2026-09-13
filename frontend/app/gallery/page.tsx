import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { galleryImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from the Intellix office, Academy classrooms, and team events."
};

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Inside Intellix" description="Our team, our classrooms, our work." />

      <section className="section-y">
        <div className="container-px mx-auto max-w-6xl columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {galleryImages.map((img) => (
            <div key={img.src} className="overflow-hidden rounded-2xl glass break-inside-avoid">
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
