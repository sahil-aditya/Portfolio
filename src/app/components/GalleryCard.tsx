import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface GalleryPost {
  id: string;
  beforeImage: string;
  afterImage: string;
}

interface GalleryCardProps {
  post: GalleryPost;
  onImageClick: (post: GalleryPost) => void;
}

export function GalleryCard({ post, onImageClick }: GalleryCardProps) {
  const [showBefore, setShowBefore] = useState(false);

  return (
    <div className="relative border-2 border-foreground bg-background overflow-hidden group">
      {/* Image */}
      <div
        className="w-full cursor-pointer"
        onClick={() => onImageClick(post)}
      >
        <ImageWithFallback
          src={showBefore ? post.beforeImage : post.afterImage}
          alt={showBefore ? "Before" : "After"}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowBefore(!showBefore);
        }}
        className="absolute top-2 left-2 px-2 py-1 bg-background/90 border border-foreground text-[10px] hover:bg-foreground hover:text-background transition-colors rounded-full"
      >
        {showBefore ? "[TAP TO SEE AFTER]" : "[TAP TO SEE BEFORE]"}
      </button>
    </div>
  );
}