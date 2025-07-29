"use client";

import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/features/editor/components/editor"), {
  ssr: false,
});

const EditorClient = () => {
  return <Editor />;
};

export default EditorClient;
