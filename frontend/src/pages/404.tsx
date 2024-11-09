'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiAlertCircle, FiHome, FiSearch } from 'react-icons/fi';

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

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
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full max-w-md mb-8"
      >
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <FiSearch className="mr-2" />
            Search
          </Button>
        </form>
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
        <Link href="/" passHref>
          <Button variant="outline" className="flex items-center">
            <FiHome className="mr-2" />
            Go to Homepage
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
