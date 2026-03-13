import { useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ImageViewerProps {
  beforeImage: string | null;
  afterImage: string | null;
  onClose: () => void;
}

export function ImageViewer({ beforeImage, afterImage, onClose }: ImageViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [showBefore, setShowBefore] = useState(false);

  if (!beforeImage || !afterImage) return null;

  const currentImage = showBefore ? beforeImage : afterImage;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 bg-foreground text-background hover:bg-foreground/90 transition-colors border-2 border-foreground z-10"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Toggle Before/After Button */}
      <button
        onClick={() => setShowBefore(!showBefore)}
        className="absolute top-4 left-4 px-3 py-2 bg-background/90 border-2 border-foreground text-xs hover:bg-foreground hover:text-background transition-colors rounded-full z-10"
      >
        {showBefore ? "[TAP TO SEE AFTER]" : "[TAP TO SEE BEFORE]"}
      </button>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        <button
          onClick={handleZoomOut}
          className="p-3 bg-foreground text-background hover:bg-foreground/90 transition-colors border-2 border-foreground"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <div className="px-4 py-3 bg-background border-2 border-foreground text-sm">
          {Math.round(zoom * 100)}%
        </div>
        <button
          onClick={handleZoomIn}
          className="p-3 bg-foreground text-background hover:bg-foreground/90 transition-colors border-2 border-foreground"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>

      {/* Image Container */}
      <div className="max-w-full max-h-full overflow-auto">
        <div
          className="transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >
          <ImageWithFallback
            src={currentImage}
            alt="Enlarged view"
            className="max-w-screen max-h-screen object-contain border-2 border-foreground"
          />
        </div>
      </div>
    </div>
  );
}