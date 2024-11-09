import { Toaster } from '@/components/ui/toaster';
import type React from 'react';

export const Events: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default Events;
