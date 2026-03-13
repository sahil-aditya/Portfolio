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
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-foreground text-sm focus:outline-none focus:ring-1 focus:ring-foreground resize-none"
                rows={3}
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
    <div className="w-full aspect-[3/2] border-2 border-foreground bg-background p-6 md:p-8 relative group overflow-hidden">
      {/* Floating Blur Blobs - Dark Blue Liquid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full blur-3xl" style={{ background: 'rgba(30, 58, 138, 0.15)', animation: 'liquidFloat 12s ease-in-out infinite' }} />
        <div className="absolute top-20 left-1/4 w-48 h-48 rounded-full blur-2xl" style={{ background: 'rgba(25, 45, 120, 0.12)', animation: 'liquidFloat 14s ease-in-out infinite 1s' }} />
        <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full blur-3xl" style={{ background: 'rgba(35, 70, 160, 0.18)', animation: 'liquidFloat 16s ease-in-out infinite 2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
      {isOwner && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute bottom-6 right-6 md:bottom-8 md:right-8 p-2 border border-foreground hover:bg-foreground hover:text-background transition-colors opacity-0 group-hover:opacity-100"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      )}

      {/* Website and Email - Top Right Corner */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 flex flex-col gap-2">
        <button
          onClick={handleWebsiteClick}
          className={`flex items-center gap-1 px-2 py-1 border border-foreground transition-colors text-[10px] ${
            websiteUrl
              ? "hover:bg-foreground hover:text-background cursor-pointer"
              : isOwner
              ? "hover:bg-foreground hover:text-background cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          }`}
          title={websiteUrl || (isOwner ? "Add website" : "No website added")}
          disabled={!websiteUrl && !isOwner}
        >
          <Globe className="w-3 h-3" />
          <span>{websiteUrl ? "[WEBSITE]" : isOwner ? "[ADD]" : "[NONE]"}</span>
        </button>
        <button
          onClick={handleEmailClick}
          className={`flex items-center gap-1 px-2 py-1 border border-foreground transition-colors text-[10px] ${
            emailUrl
              ? "hover:bg-foreground hover:text-background cursor-pointer"
              : isOwner
              ? "hover:bg-foreground hover:text-background cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          }`}
          title={emailUrl || (isOwner ? "Add email" : "No email added")}
          disabled={!emailUrl && !isOwner}
        >
          <Mail className="w-3 h-3" />
          <span>{emailUrl ? "[EMAIL]" : isOwner ? "[ADD]" : "[NONE]"}</span>
        </button>
      </div>

      <div className="h-full flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Profile Picture */}
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
          <p className="text-xs md:text-sm text-muted-foreground whitespace-pre-wrap">{bio}</p>
        </div>
      </div>
      </div>
    </div>
  );
}
