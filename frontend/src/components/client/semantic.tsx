import type React from 'react';
import { Footer, Nav } from '.';

export const Semantic = ({ chidlren }: { chidlren: React.ReactNode }) => {
  return (
    <>
      <Nav />
      {chidlren}
      <Footer />
    </>
  );
};
