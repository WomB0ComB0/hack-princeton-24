'use client'

import { useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { FiBarChart2, FiPieChart, FiDollarSign, FiEdit3, FiDownload, FiLayers } from 'react-icons/fi'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function IndexPage() {
  const [description, setDescription] = useState<string>('')

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-6 py-24">
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Personalized Financial Planning Made Easy
          </motion.h1>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Describe your needs, get tailored reports and charts instantly.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg">
              Get Started
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FiEdit3 className="w-12 h-12 text-green-500" />}
              title="Customizable Reports"
              description="Describe your needs and get personalized financial reports."
            />
            <FeatureCard 
              icon={<FiBarChart2 className="w-12 h-12 text-green-500" />}
              title="Interactive Charts"
              description="Visualize your financial data with interactive and editable charts."
            />
            <FeatureCard 
              icon={<FiDownload className="w-12 h-12 text-green-500" />}
              title="Excel Export"
              description="Download your reports as Excel spreadsheets for further analysis."
            />
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">See It In Action</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Describe your financial report needs:
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="E.g., I need a monthly spending report with a pie chart for expenses and a line graph for savings over time."
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
              />
            </div>
            <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Generate Report
            </Button>
            <div className="mt-8 border border-gray-300 rounded-lg p-4 relative">
              <div className="text-center text-gray-500 mb-4">Generated Excel Preview</div>
              <div className="grid grid-cols-2 gap-4">
                <ExcelPreviewChart type="pie" />
                <ExcelPreviewChart type="line" />
              </div>
              <div className="absolute top-2 right-2 bg-gray-100 p-2 rounded-md shadow">
                <FiLayers className="w-6 h-6 text-gray-600" />
                <span className="text-xs text-gray-600">Drag to edit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl mb-8">Sign up now and start creating your personalized financial reports.</p>
          <Button className="bg-white text-green-500 hover:bg-gray-100 font-bold py-3 px-6 rounded-full text-lg">
            Sign Up Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Financial Planner Tool. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard(
  { icon, title, description }: 
  {
    icon: React.ReactNode,
    title: string,
    description: string}
) {
  return (
    <Card className="flex flex-col items-center text-center p-6">
      <CardContent>
        {icon}
        <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}

function ExcelPreviewChart({ type }: { type: 'pie' | 'line' }) {
  return (
    <div className="border border-gray-200 rounded p-4 flex items-center justify-center h-40">
      {type === 'pie' ? (
        <FiPieChart className="w-20 h-20 text-green-500" />
      ) : (
        <FiBarChart2 className="w-20 h-20 text-green-500" />
      )}
    </div>
  )
}