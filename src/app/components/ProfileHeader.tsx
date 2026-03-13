import { Globe, Mail } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProfileHeaderProps {
  profileImage?: string;
  name?: string;
  bio?: string;
  websiteUrl?: string;
  emailUrl?: string;
}

export function ProfileHeader({
  profileImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
  name = "SAM",
  bio = "Creative professional • Designer • Developer",
  websiteUrl = "",
  emailUrl = "",
}: ProfileHeaderProps) {
  const handleWebsiteClick = () => {
    if (websiteUrl) {
      window.open(websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`, "_blank");
    }
  };

  const handleEmailClick = () => {
    if (emailUrl) {
      window.location.href = `mailto:${emailUrl}`;
    }
  };

  return (
    <div className="w-full aspect-[3/2] border-2 border-foreground bg-background p-6 md:p-8 relative">
      {/* Website and Email Icons - Top Right */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {websiteUrl && (
          <button
            onClick={handleWebsiteClick}
            className="p-2 border border-foreground hover:bg-foreground hover:text-background transition-colors"
            title={websiteUrl}
          >
            <Globe className="w-3 h-3" />
          </button>
        )}
        {emailUrl && (
          <button
            onClick={handleEmailClick}
            className="p-2 border border-foreground hover:bg-foreground hover:text-background transition-colors"
            title={emailUrl}
          >
            <Mail className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="h-full flex items-center gap-6">
        {/* Profile Picture - Left */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-foreground overflow-hidden">
            <ImageWithFallback
              src={profileImage}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-left">
          <h2 className="text-lg md:text-xl mb-2">{name}</h2>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{bio}</p>
        </div>
      </div>
    </div>
  );
}