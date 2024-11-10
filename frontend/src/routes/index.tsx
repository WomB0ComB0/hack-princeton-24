'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { FileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FiArrowRight,
  FiBarChart2,
  FiDollarSign,
  FiDownload,
  FiEdit3,
  FiLayers,
  FiMove,
  FiPieChart,
} from 'react-icons/fi';

interface ChartItem {
  id: string;
  type: 'pie' | 'line';
  title: string;
}

export const Route = new FileRoute('/').createRoute({
  component: IndexComponent,
});

export default function IndexComponent() {
  const [description, setDescription] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-32 sm:px-6 lg:px-8 lg:py-40">
          <div className="relative z-10 max-w-2xl">
            <motion.h1
              className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Personalized Financial Planning Made Easy
            </motion.h1>
            <motion.p
              className="mt-6 text-xl text-gray-500 dark:text-gray-300"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Describe your needs, get tailored reports and charts instantly.
            </motion.p>
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg" className="rounded-full">
                Get Started
                <FiArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            width="2560"
            height="650"
            fill="none"
            viewBox="0 0 2560 650"
          >
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'var(--primary)', stopOpacity: 0.06 }} />
                <stop offset="100%" style={{ stopColor: 'var(--primary)', stopOpacity: 0.12 }} />
              </linearGradient>
            </defs>
            <path
              fill="url(#grad)"
              d="M2560 650H0V0C426.667 78.6667 853.333 118 1280 118C1706.67 118 2133.33 78.6667 2560 0V650Z"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<FiEdit3 className="w-12 h-12 text-primary" />}
              title="Customizable Reports"
              description="Describe your needs and get personalized financial reports."
            />
            <FeatureCard
              icon={<FiBarChart2 className="w-12 h-12 text-primary" />}
              title="Interactive Charts"
              description="Visualize your financial data with interactive and editable charts."
            />
            <FeatureCard
              icon={<FiDownload className="w-12 h-12 text-primary" />}
              title="Excel Export"
              description="Download your reports as Excel spreadsheets for further analysis."
            />
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            See It In Action
          </h2>
          <Card className="p-6">
            <CardContent>
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Describe your financial report needs:
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="E.g., I need a monthly spending report with a pie chart for expenses and a line graph for savings over time."
                  className="w-full"
                  rows={4}
                />
              </div>
              <Button>Generate Report</Button>
              <div className="mt-8 border border-gray-200 dark:border-gray-700 rounded-lg p-4 relative">
                <div className="text-center text-gray-500 dark:text-gray-400 mb-4">
                  Generated Excel Preview
                </div>
                <Tabs defaultValue="pie" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                    <TabsTrigger value="line">Line Chart</TabsTrigger>
                  </TabsList>
                  <TabsContent value="pie">
                    <ExcelPreviewChart type="pie" />
                  </TabsContent>
                  <TabsContent value="line">
                    <ExcelPreviewChart type="line" />
                  </TabsContent>
                </Tabs>
                <div className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-md shadow">
                  <FiLayers className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  <span className="text-xs text-gray-600 dark:text-gray-300">Drag to edit</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl mb-8">
            Sign up now and start creating your personalized financial reports.
          </p>
          <Button variant="secondary" size="lg" className="rounded-full">
            Sign Up Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Financial Planner Tool. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center text-center p-6">
        {icon}
        <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
}

function ExcelPreviewChart({ type }: { type: 'pie' | 'line' }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded p-4 flex items-center justify-center h-64">
      {type === 'pie' ? (
        <FiPieChart className="w-32 h-32 text-primary" />
      ) : (
        <FiBarChart2 className="w-32 h-32 text-primary" />
      )}
    </div>
  );
}
