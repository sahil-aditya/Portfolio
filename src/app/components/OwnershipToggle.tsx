import { useState } from "react";
import { Lock, Unlock } from "lucide-react";
import { useOwnership } from "../context/OwnershipContext";

const OWNER_PASSWORD = "admin"; // Simple password for demo - in production, use proper auth

export function OwnershipToggle() {
  const { isOwner, setIsOwner } = useOwnership();
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleOwnerToggle = () => {
    if (isOwner) {
      // Log out
      setIsOwner(false);
      setPassword("");
      setError("");
    } else {
      // Show password prompt
      setShowPasswordPrompt(true);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === OWNER_PASSWORD) {
      setIsOwner(true);
      setPassword("");
      setError("");
      setShowPasswordPrompt(false);
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  return (
    <>
      <button
        onClick={handleOwnerToggle}
        className={`flex items-center gap-2 px-3 py-1 text-xs border transition-colors ${
          isOwner
            ? "bg-foreground text-background border-foreground hover:bg-background hover:text-foreground"
            : "border-foreground hover:bg-foreground hover:text-background"
        }`}
        title={isOwner ? "You are the owner" : "Click to access as owner"}
      >
        {isOwner ? (
          <>
            <Unlock className="w-3 h-3" />
            [OWNER]
          </>
        ) : (
          <>
            <Lock className="w-3 h-3" />
            [VISITOR]
          </>
        )}
      </button>

      {/* Password Prompt */}
      {showPasswordPrompt && !isOwner && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handlePasswordSubmit}
            className="bg-background border-2 border-foreground p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg mb-4">[OWNER ACCESS]</h2>
            <label className="block text-xs mb-2">[PASSWORD]</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-3 py-2 bg-background border border-foreground text-sm focus:outline-none focus:ring-1 focus:ring-foreground mb-3"
              autoFocus
            />
            {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowPasswordPrompt(false);
                  setPassword("");
                  setError("");
                }}
                className="flex-1 px-3 py-2 border border-foreground text-xs hover:bg-foreground hover:text-background transition-colors"
              >
                [CANCEL]
              </button>
              <button
                type="submit"
                className="flex-1 px-3 py-2 bg-foreground text-background border border-foreground text-xs hover:bg-background hover:text-foreground transition-colors"
              >
                [UNLOCK]
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
