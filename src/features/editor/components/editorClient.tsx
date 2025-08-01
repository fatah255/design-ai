"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/features/editor/components/editor"), {
  ssr: false,
});

const EditorClient = () => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Editor />
    </QueryClientProvider>
  );
};

export default EditorClient;
