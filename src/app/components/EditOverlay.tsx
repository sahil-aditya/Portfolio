import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GalleryPost } from "./GalleryCard";

interface EditOverlayProps {
  post: GalleryPost | null;
  onClose: () => void;
}

export function EditOverlay({ post, onClose }: EditOverlayProps) {
  const handleImageReplace = (type: "before" | "after") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // In a real app, this would update the post
          console.log(`Replacing ${type} image for post ${post?.id}`);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <AnimatePresence>
      {post && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Edit Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-background border-2 border-foreground z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-2 border-foreground">
              <h2 className="text-lg">[EDIT MODE]</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-foreground hover:text-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before Image Editor */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm">[BEFORE IMAGE]</h3>
                    <button
                      onClick={() => handleImageReplace("before")}
                      className="text-xs px-3 py-1 border border-foreground hover:bg-foreground hover:text-background transition-colors"
                    >
                      [REPLACE]
                    </button>
                  </div>
                  <div className="relative aspect-[4/5] border-2 border-foreground overflow-hidden group">
                    <img
                      src={post.beforeImage}
                      alt={`${post.title} - Before`}
                      className="w-full h-full object-cover"
                    />
                    {/* Drag Handles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Corner Handles */}
                      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-foreground" />
                      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-foreground" />
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-foreground" />
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-foreground" />
                    </div>
                  </div>
                </div>

                {/* After Image Editor */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm">[AFTER IMAGE]</h3>
                    <button
                      onClick={() => handleImageReplace("after")}
                      className="text-xs px-3 py-1 border border-foreground hover:bg-foreground hover:text-background transition-colors"
                    >
                      [REPLACE]
                    </button>
                  </div>
                  <div className="relative aspect-[4/5] border-2 border-foreground overflow-hidden group">
                    <img
                      src={post.afterImage}
                      alt={`${post.title} - After`}
                      className="w-full h-full object-cover"
                    />
                    {/* Drag Handles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Corner Handles */}
                      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-foreground" />
                      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-foreground" />
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-foreground" />
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Details */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm mb-2">[TITLE]</label>
                  <input
                    type="text"
                    defaultValue={post.title}
                    className="w-full px-4 py-2 bg-background border-2 border-foreground focus:outline-none focus:ring-2 focus:ring-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">[DESCRIPTION]</label>
                  <textarea
                    defaultValue={post.description}
                    className="w-full px-4 py-2 bg-background border-2 border-foreground focus:outline-none focus:ring-2 focus:ring-foreground resize-none"
                    rows={3}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-4">
                <button className="flex-1 py-3 bg-foreground text-background border-2 border-foreground hover:bg-background hover:text-foreground transition-colors">
                  [SAVE CHANGES]
                </button>
                <button className="px-6 py-3 border-2 border-destructive text-destructive hover:bg-destructive hover:text-background transition-colors">
                  [DELETE]
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
