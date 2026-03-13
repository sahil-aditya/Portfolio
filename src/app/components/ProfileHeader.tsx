import { useState } from "react";
import { Globe, Mail, Edit2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useOwnership } from "../context/OwnershipContext";

interface ProfileHeaderProps {
  profileImage?: string;
  name?: string;
  bio?: string;
  websiteUrl?: string;
  emailUrl?: string;
  onUpdate?: (data: {
    name: string;
    bio: string;
    websiteUrl: string;
    emailUrl: string;
  }) => void;
}

export function ProfileHeader({
  profileImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
  name = "Your Name",
  bio = "Creative professional • Designer • Developer",
  websiteUrl = "",
  emailUrl = "",
  onUpdate,
}: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { isOwner } = useOwnership();
  const [editName, setEditName] = useState(name);
  const [editBio, setEditBio] = useState(bio);
  const [editWebsite, setEditWebsite] = useState(websiteUrl);
  const [editEmail, setEditEmail] = useState(emailUrl);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate({
        name: editName,
        bio: editBio,
        websiteUrl: editWebsite,
        emailUrl: editEmail,
      });
    }
    setIsEditing(false);
  };

  const handleWebsiteClick = () => {
    if (websiteUrl) {
      window.open(websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`, "_blank");
    } else {
      setIsEditing(true);
    }
  };

  const handleEmailClick = () => {
    if (emailUrl) {
      window.location.href = `mailto:${emailUrl}`;
    } else {
      setIsEditing(true);
    }
  };

  if (isEditing) {
    return (
      <div className="w-full aspect-[3/2] border-2 border-foreground bg-background p-6 md:p-8">
        <div className="h-full flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm">[EDIT PROFILE]</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="text-xs px-3 py-1 border border-foreground hover:bg-muted transition-colors"
              >
                [CANCEL]
              </button>
              <button
                onClick={handleSave}
                className="text-xs px-3 py-1 bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                [SAVE]
              </button>
            </div>
          </div>

          <div className="grid gap-3 flex-1">
            <div>
              <label className="block text-xs mb-1">[NAME]</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-foreground text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">[BIO]</label>
              <input
                type="text"
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-foreground text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs mb-1">[WEBSITE]</label>
                <input
                  type="text"
                  value={editWebsite}
                  onChange={(e) => setEditWebsite(e.target.value)}
                  placeholder="example.com"
                  className="w-full px-3 py-2 bg-background border border-foreground text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">[EMAIL]</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 bg-background border border-foreground text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-[3/2] border-2 border-foreground bg-background p-6 md:p-8 relative group">
      {isOwner && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-4 right-4 p-2 border border-foreground hover:bg-foreground hover:text-background transition-colors opacity-0 group-hover:opacity-100"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      )}

      <div className="h-full flex flex-col md:flex-row items-center gap-6">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-foreground overflow-hidden">
            <ImageWithFallback
              src={profileImage}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-lg md:text-xl mb-2">{name}</h2>
          <p className="text-xs md:text-sm text-muted-foreground mb-4">{bio}</p>

          {/* Interactive Icons */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <button
              onClick={handleWebsiteClick}
              className="flex items-center gap-2 px-3 py-2 border border-foreground hover:bg-foreground hover:text-background transition-colors text-xs"
              title={websiteUrl || "Add website"}
            >
              <Globe className="w-4 h-4" />
              {websiteUrl ? "[WEBSITE]" : "[ADD WEBSITE]"}
            </button>
            <button
              onClick={handleEmailClick}
              className="flex items-center gap-2 px-3 py-2 border border-foreground hover:bg-foreground hover:text-background transition-colors text-xs"
              title={emailUrl || "Add email"}
            >
              <Mail className="w-4 h-4" />
              {emailUrl ? "[EMAIL]" : "[ADD EMAIL]"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
