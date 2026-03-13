import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useOwnership } from "../context/OwnershipContext";
import { ImageModal } from "./ImageModal";

export interface GalleryPost {
  id: string;
  beforeImage: string;
  afterImage: string;
  title: string;
  description?: string;
}

interface GalleryCardProps {
  post: GalleryPost;
  isEditMode: boolean;
  onEditClick: (post: GalleryPost) => void;
}

export function GalleryCard({ post, isEditMode, onEditClick }: GalleryCardProps) {
  const [showAfter, setShowAfter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isOwner } = useOwnership();

  return (
    <>
      <div className="relative group">
        <div className={`relative overflow-hidden border-2 border-foreground bg-background ${!isOwner ? "cursor-pointer" : ""}`} onClick={() => !isOwner && setShowModal(true)}>
          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <AnimatePresence mode="wait">
              {showAfter ? (
                <motion.div
                  key="after"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    src={post.afterImage}
                    alt={`${post.title} - After`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="before"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    src={post.beforeImage}
                    alt={`${post.title} - Before`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tap to See Button - Only visible to owner */}
            {isOwner && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAfter(!showAfter);
                }}
                className="absolute top-2 left-2 px-2 py-1 bg-background/90 border border-foreground text-[10px] hover:bg-foreground hover:text-background transition-colors rounded-full"
              >
                {showAfter ? "tap to see after" : "tap to see before"}
              </button>
            )}

            {/* Edit Mode Overlay - Only visible to owner */}
            {isOwner && isEditMode && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onEditClick(post);
                }}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 border-2 border-dashed border-foreground" />
                  <div className="text-sm border border-foreground px-4 py-2">
                    [REPLACE IMAGE]
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Post Info */}
          <div className="p-4 border-t-2 border-foreground">
            <h3 className="text-sm mb-1">{post.title}</h3>
            {post.description && (
              <p className="text-xs text-muted-foreground">{post.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal - only shown to viewers */}
      {!isOwner && <ImageModal post={showModal ? post : null} onClose={() => setShowModal(false)} />}
    </>
  );
}
