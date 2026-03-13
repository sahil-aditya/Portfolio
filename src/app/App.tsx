import { useState } from "react";
import { Plus, Edit3 } from "lucide-react";
import { GalleryCard, GalleryPost } from "./components/GalleryCard";
import { CreatePostModal } from "./components/CreatePostModal";
import { EditOverlay } from "./components/EditOverlay";
import { ProfileHeader } from "./components/ProfileHeader";
import { OwnershipProvider, useOwnership } from "./context/OwnershipContext";
import { OwnershipToggle } from "./components/OwnershipToggle";

const initialPosts: GalleryPost[] = [
  {
    id: "1",
    beforeImage: "https://images.unsplash.com/photo-1768321902794-c24fb1f00661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWZvcmUlMjBhZnRlciUyMGhvbWUlMjByZW5vdmF0aW9uJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczMzQ0OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    afterImage: "https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczMjUwMTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Living Room Transformation",
    description: "Complete modern renovation with minimalist aesthetic",
  },
  {
    id: "2",
    beforeImage: "https://images.unsplash.com/photo-1587522630593-3b9e5f3255f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc3BhY2UlMjBkZXNrJTIwc2V0dXAlMjBtaW5pbWFsfGVufDF8fHx8MTc3MzM0NDk1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    afterImage: "https://images.unsplash.com/photo-1760780567530-389d8a3fba75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMHN0dWRpb3xlbnwxfHx8fDE3NzMzMjgxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Workspace Upgrade",
    description: "From basic to professional creative studio",
  },
  {
    id: "3",
    beforeImage: "https://images.unsplash.com/photo-1632930271512-de0f6bc26661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBiZWZvcmV8ZW58MXx8fHwxNzczMzQ0OTYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    afterImage: "https://images.unsplash.com/photo-1694350892418-19cc4b56aca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc3MzMyODAwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Product Photography Retouch",
    description: "Professional color grading and composition",
  },
  {
    id: "4",
    beforeImage: "https://images.unsplash.com/photo-1636969386919-b90cad8216e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFyY2hpdGVjdHVyZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MzMyMzQ5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    afterImage: "https://images.unsplash.com/photo-1768312177832-3b1a3f7c6db7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHBvcnRmb2xpbyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzMzNDQ5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Architectural Visualization",
    description: "Urban photography enhancement",
  },
  {
    id: "5",
    beforeImage: "https://images.unsplash.com/photo-1744819181935-edb1c6924d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcm9vbSUyMGRlc2lnbnxlbnwxfHx8fDE3NzMyMzkwMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    afterImage: "https://images.unsplash.com/photo-1772567732969-c1506edf80a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwcmVub3ZhdGlvbnxlbnwxfHx8fDE3NzMzNDQ5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Kitchen Redesign",
    description: "Modern minimalist kitchen transformation",
  },
];

function AppContent() {
  const [posts, setPosts] = useState<GalleryPost[]>(initialPosts);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState<GalleryPost | null>(null);
  const [profileData, setProfileData] = useState({
    name: "Your Name",
    bio: "Creative professional • Designer • Developer",
    websiteUrl: "",
    emailUrl: "",
  });

  const { isOwner } = useOwnership();

  const handleCreatePost = (newPost: {
    beforeImage: string;
    afterImage: string;
    title: string;
    description: string;
  }) => {
    const post: GalleryPost = {
      id: Date.now().toString(),
      ...newPost,
    };
    setPosts([post, ...posts]);
  };

  const handleEditClick = (post: GalleryPost) => {
    setSelectedPost(post);
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b-2 border-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <h1 className="text-xl">[PORTFOLIO]</h1>
          <div className="flex items-center gap-2">
            {isOwner && (
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`flex items-center gap-2 px-4 py-2 border-2 transition-colors ${
                  isEditMode
                    ? "bg-foreground text-background border-foreground"
                    : "border-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                <Edit3 className="w-4 h-4" />
                {isEditMode ? "[EXIT EDIT]" : "[EDIT MODE]"}
              </button>
            )}
            <OwnershipToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pb-32">
        {/* Profile Header */}
        <div className="mb-6">
          <ProfileHeader
            name={profileData.name}
            bio={profileData.bio}
            websiteUrl={profileData.websiteUrl}
            emailUrl={profileData.emailUrl}
            onUpdate={setProfileData}
          />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <GalleryCard
              key={post.id}
              post={post}
              isEditMode={isEditMode}
              onEditClick={handleEditClick}
            />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">[NO POSTS YET]</p>
            {isOwner && (
              <p className="text-sm text-muted-foreground mt-2">
                Click the + button to create your first post
              </p>
            )}
          </div>
        )}
      </main>

      {/* Floating Action Button - Only visible to owner */}
      {isOwner && (
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 w-14 h-14 bg-foreground text-background border-2 border-foreground flex items-center justify-center hover:scale-110 transition-transform z-30"
          aria-label="Create new post"
        >
          <Plus className="w-8 h-8" />
        </button>
      )}

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />

      {/* Edit Overlay */}
      <EditOverlay post={selectedPost} onClose={() => setSelectedPost(null)} />

      {/* Footer */}
      <footer className="border-t-2 border-foreground bg-background">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-xs text-muted-foreground">
            [PORTFOLIO © 2026] — DESIGNED WITH PRECISION
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <OwnershipProvider>
      <AppContent />
    </OwnershipProvider>
  );
}
