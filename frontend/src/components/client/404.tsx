'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiAlertCircle, FiHome, FiSearch } from 'react-icons/fi';

export const NotFound = () => {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <FiAlertCircle className="text-primary mx-auto mb-6 w-24 h-24" />
        <h1 className="text-4xl font-bold text-foreground mb-2">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <p className="text-muted-foreground mb-4">
          You will be redirected to the homepage in {timeLeft} seconds.
        </p>
        <Link href="/">
          <Button variant="outline" className="flex items-center">
            <FiHome className="mr-2" />
            Go to Homepage
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};
