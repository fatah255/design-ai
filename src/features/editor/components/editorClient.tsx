"use client";

import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/features/editor/components/editor"), {
  ssr: false, // disables SSR
});

import React from "react";

const EditorClient = () => {
  return <Editor />;
};

export default EditorClient;
