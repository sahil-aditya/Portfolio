import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { GalleryCard, GalleryPost } from "./components/GalleryCard";
import { ProfileHeader } from "./components/ProfileHeader";
import { ImageViewer } from "./components/ImageViewer";

const initialPosts: GalleryPost[] = [
  {
    id: "1",
    beforeImage: "https://images.unsplash.com/photo-1768321902794-c24fb1f00661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWZvcmUlMjBhZnRlciUyMGhvbWUlMjByZW5vdmF0aW9uJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczMzQ0OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    afterImage: "https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczMjUwMTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "2",
    beforeImage: "https://images.unsplash.com/photo-1587522630593-3b9e5f3255f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc3BhY2UlMjBkZXNrJTIwc2V0dXAlMjBtaW5pbWFsfGVufDF8fHx8MTc3MzM0NDk1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    afterImage: "https://images.unsplash.com/photo-1760780567530-389d8a3fba75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMHN0dWRpb3xlbnwxfHx8fDE3NzMzMjgxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "3",
    beforeImage: "https://images.unsplash.com/photo-1632930271512-de0f6bc26661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBiZWZvcmV8ZW58MXx8fHwxNzczMzQ0OTYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    afterImage: "https://images.unsplash.com/photo-1694350892418-19cc4b56aca6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc3MzMyODAwMnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "4",
    beforeImage: "https://images.unsplash.com/photo-1636969386919-b90cad8216e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFyY2hpdGVjdHVyZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MzMyMzQ5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    afterImage: "https://images.unsplash.com/photo-1768312177832-3b1a3f7c6db7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHBvcnRmb2xpbyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzMzNDQ5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "5",
    beforeImage: "https://images.unsplash.com/photo-1744819181935-edb1c6924d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcm9vbSUyMGRlc2lnbnxlbnwxfHx8fDE3NzMyMzkwMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    afterImage: "https://images.unsplash.com/photo-1772567732969-c1506edf80a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwcmVub3ZhdGlvbnxlbnwxfHx8fDE3NzMzNDQ5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export default function App() {
  const [posts] = useState<GalleryPost[]>(initialPosts);
  const [selectedPost, setSelectedPost] = useState<GalleryPost | null>(null);
  const [profileData] = useState({
    name: "Your Name",
    bio: "Creative professional • Designer • Developer\nSpecializing in UI/UX and web development\nBased in [Your City]",
    websiteUrl: "",
    emailUrl: "",
  });

  const handleImageClick = (post: GalleryPost) => {
    setSelectedPost(post);
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b-2 border-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl">[Sam Visuals]</h1>
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
          />
        </div>

        {/* Gallery Grid */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 2 }}>
          <Masonry gutter="16px">
            {posts.map((post) => (
              <GalleryCard
                key={post.id}
                post={post}
                onImageClick={handleImageClick}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">[NO POSTS YET]</p>
          </div>
        )}
      </main>

      {/* Image Viewer */}
      <ImageViewer
        beforeImage={selectedPost ? selectedPost.beforeImage : null}
        afterImage={selectedPost ? selectedPost.afterImage : null}
        onClose={() => setSelectedPost(null)}
      />

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