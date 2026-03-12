import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { GalleryPost } from "./GalleryCard";

interface ImageModalProps {
  post: GalleryPost | null;
  onClose: () => void;
}

export function ImageModal({ post, onClose }: ImageModalProps) {
  const [showAfter, setShowAfter] = useState(false);

  const currentImage = showAfter ? post?.afterImage : post?.beforeImage;
  const currentLabel = showAfter ? "AFTER" : "BEFORE";

  return (
    <AnimatePresence>
      {post && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              className="relative w-full h-full max-w-4xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Image Container */}
              <div className="flex-1 relative overflow-hidden border-2 border-foreground bg-background flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {currentImage && (
                    <motion.div
                      key={currentLabel}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <ImageWithFallback
                        src={currentImage}
                        alt={`${post.title} - ${currentLabel}`}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Toggle Button */}
                <button
                  onClick={() => setShowAfter(!showAfter)}
                  className="absolute top-4 left-4 px-3 py-1 bg-background/90 border border-foreground text-xs hover:bg-foreground hover:text-background transition-colors rounded-full"
                >
                  {showAfter ? "see before" : "see after"}
                </button>
              </div>

              {/* Post Info */}
              <div className="bg-background border-t-2 border-foreground p-4 border-x-2 border-b-2">
                <h3 className="text-base font-medium mb-1">{post.title}</h3>
                {post.description && (
                  <p className="text-xs text-muted-foreground">{post.description}</p>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 bg-background border-b-2 border-foreground border-x-2 p-4">
                <button
                  onClick={() => setShowAfter(!showAfter)}
                  className="flex items-center gap-2 px-4 py-2 border border-foreground hover:bg-foreground hover:text-background transition-colors text-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {showAfter ? "BEFORE" : "AFTER"}
                </button>
                <span className="text-xs text-muted-foreground">
                  {showAfter ? "AFTER" : "BEFORE"}
                </span>
                <button
                  onClick={() => setShowAfter(!showAfter)}
                  className="flex items-center gap-2 px-4 py-2 border border-foreground hover:bg-foreground hover:text-background transition-colors text-xs"
                >
                  {showAfter ? "BEFORE" : "AFTER"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
