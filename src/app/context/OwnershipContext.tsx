import { createContext, useContext, useState, useEffect } from "react";

interface OwnershipContextType {
  isOwner: boolean;
  setIsOwner: (value: boolean) => void;
}

const OwnershipContext = createContext<OwnershipContextType | undefined>(undefined);

export function OwnershipProvider({ children }: { children: React.ReactNode }) {
  const [isOwner, setIsOwner] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const savedOwnerStatus = localStorage.getItem("portfolio_is_owner");
    if (savedOwnerStatus === "true") {
      setIsOwner(true);
    }
  }, []);

  // Save to localStorage when status changes
  const handleSetIsOwner = (value: boolean) => {
    setIsOwner(value);
    localStorage.setItem("portfolio_is_owner", String(value));
  };

  return (
    <OwnershipContext.Provider value={{ isOwner, setIsOwner: handleSetIsOwner }}>
      {children}
    </OwnershipContext.Provider>
  );
}

export function useOwnership() {
  const context = useContext(OwnershipContext);
  if (context === undefined) {
    throw new Error("useOwnership must be used within OwnershipProvider");
  }
  return context;
}
