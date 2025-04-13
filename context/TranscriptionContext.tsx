// import React, { createContext, useState, useContext } from "react";

// type TranscriptionContextType = {
//   transcription: string;
//   setTranscription: (text: string) => void;
// };

// const TranscriptionContext = createContext<
//   TranscriptionContextType | undefined
// >(undefined);

// export const TranscriptionProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [transcription, setTranscription] = useState("");

//   return (
//     <TranscriptionContext.Provider value={{ transcription, setTranscription }}>
//       {children}
//     </TranscriptionContext.Provider>
//   );
// };

// export const useTranscription = () => {
//   const context = useContext(TranscriptionContext);
//   if (!context)
//     throw new Error(
//       "useTranscription must be used within TranscriptionProvider"
//     );
//   return context;
// };
import React, { createContext, useState, useContext } from "react";

type TranscriptionContextType = {
  transcription: string;
  setTranscription: (text: string) => void;
  audioUri: string | null;
  setAudioUri: (uri: string | null) => void;
};

const TranscriptionContext = createContext<
  TranscriptionContextType | undefined
>(undefined);

export const TranscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transcription, setTranscription] = useState("");
  const [audioUri, setAudioUri] = useState<string | null>(null);

  return (
    <TranscriptionContext.Provider
      value={{ transcription, setTranscription, audioUri, setAudioUri }}
    >
      {children}
    </TranscriptionContext.Provider>
  );
};

export const useTranscription = () => {
  const context = useContext(TranscriptionContext);
  if (!context) {
    throw new Error(
      "useTranscription must be used within TranscriptionProvider"
    );
  }
  return context;
};
