import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context value
interface BottomSheetContextType {
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Initialize the context with the appropriate type
const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};


export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <BottomSheetContext.Provider value={{ isBottomSheetOpen, setIsBottomSheetOpen }}>
      {children}
    </BottomSheetContext.Provider>
  );
};
