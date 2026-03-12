import { useState } from "react";
import { X, Upload } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: { beforeImage: string; afterImage: string; title: string; description: string }) => void;
}

export function CreatePostModal({ isOpen, onClose, onSubmit }: CreatePostModalProps) {
  const [beforeImage, setBeforeImage] = useState<string>("");
  const [afterImage, setAfterImage] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (beforeImage && afterImage && title) {
      onSubmit({ beforeImage, afterImage, title, description });
      setBeforeImage("");
      setAfterImage("");
      setTitle("");
      setDescription("");
      onClose();
    }
  };

  const handleImageUpload = (type: "before" | "after", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === "before") {
          setBeforeImage(result);
        } else {
          setAfterImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-background border-2 border-foreground z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-2 border-foreground">
              <h2 className="text-lg">[CREATE POST]</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-foreground hover:text-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
              {/* Upload Slots */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Before Image */}
                <div>
                  <label className="block text-sm mb-2">[BEFORE]</label>
                  <div className="relative aspect-[4/5] border-2 border-dashed border-foreground overflow-hidden group">
                    {beforeImage ? (
                      <div className="relative w-full h-full">
                        <ImageWithFallback
                          src={beforeImage}
                          alt="Before preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setBeforeImage("")}
                          className="absolute top-2 right-2 p-2 bg-background border border-foreground hover:bg-foreground hover:text-background transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center h-full cursor-pointer hover:bg-muted/10 transition-colors">
                        <Upload className="w-8 h-8 mb-2" />
                        <span className="text-xs">[UPLOAD]</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("before", e)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* After Image */}
                <div>
                  <label className="block text-sm mb-2">[AFTER]</label>
                  <div className="relative aspect-[4/5] border-2 border-dashed border-foreground overflow-hidden group">
                    {afterImage ? (
                      <div className="relative w-full h-full">
                        <ImageWithFallback
                          src={afterImage}
                          alt="After preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setAfterImage("")}
                          className="absolute top-2 right-2 p-2 bg-background border border-foreground hover:bg-foreground hover:text-background transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center h-full cursor-pointer hover:bg-muted/10 transition-colors">
                        <Upload className="w-8 h-8 mb-2" />
                        <span className="text-xs">[UPLOAD]</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload("after", e)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm mb-2">[TITLE]</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-background border-2 border-foreground focus:outline-none focus:ring-2 focus:ring-foreground"
                  placeholder="Enter title..."
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm mb-2">[DESCRIPTION]</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-background border-2 border-foreground focus:outline-none focus:ring-2 focus:ring-foreground resize-none"
                  rows={3}
                  placeholder="Enter description..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!beforeImage || !afterImage || !title}
                className="w-full py-3 bg-foreground text-background border-2 border-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background hover:text-foreground transition-colors"
              >
                [CREATE POST]
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
