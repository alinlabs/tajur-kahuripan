import React from "react";

export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  category: string;
  content: React.ReactNode;
  speakerNotes: string;
}

export type TabKemudahan = "pengunjung" | "pengelola";
