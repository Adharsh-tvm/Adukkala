import React from "react";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  imageSrc: string;
  href: string;
}

export default function CategoryCard({ title, imageSrc, href }: CategoryCardProps) {
  return (
    <Link href={href} className="group relative block w-full aspect-4/5 overflow-hidden rounded-sm bg-gray-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent flex justify-center">
        <div className="bg-orange-400 text-white text-sm font-bold uppercase tracking-widest px-4 py-2 translate-y-2 group-hover:-translate-y-1 transition-transform duration-300">
          {title}
        </div>
      </div>
    </Link>
  );
}
