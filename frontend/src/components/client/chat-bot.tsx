'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiMessageSquare, FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'
import type OpenAI from 'openai'

const api = new API({
  'Content-Type': 'application/json',
})

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

const welcomeMessage = `Welcome to your AI-powered financial assistant! Ask me questions about your transactions, account balances, or financial advice.

Here are some questions you can ask:
- What is my most recent transaction?
- What's my total balance across all accounts?
- How can I improve my savings?`

const ChatbotComponent = () =>  {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isGeneratingText, setIsGeneratingText] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen && messages.length === 0) {
      setMessages([{ content: welcomeMessage, role: 'assistant' }])
    }
  }

  const toggleExpand = () => setIsExpanded(!isExpanded)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { content: input, role: 'user' }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    setIsGeneratingText(true)

    try {
      const params: OpenAI.Chat.ChatCompletionCreateParams = {
        model: 'gpt-4-turbo-preview',
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
      }

      const response = await api.chat(params)
      const stream = response.body
      
      if (!stream) {
        throw new Error('No stream available')
      }

      let accumulatedResponse = ''
      for await (const chunks of API.readStream(stream)) {
        for (const chunk of chunks) {
          const content = chunk.choices[0]?.delta?.content || ''
          accumulatedResponse += content
          setMessages(prev => [
            ...prev.slice(0, -1),
            { content: accumulatedResponse, role: 'assistant' },
          ])
        }
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = { 
        content: "I'm sorry, I encountered an error while processing your request. Please try again.", 
        role: 'assistant'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
      setIsGeneratingText(false)
    }
  }

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }

  useEffect(() => {
    if (isGeneratingText) {
      const intervalId = setInterval(scrollToBottom, 100)
      return () => clearInterval(intervalId)
    }
  }, [isGeneratingText])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isExpanded ? 'w-full h-full' : ''}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`flex flex-col ${isExpanded ? 'w-full h-full' : 'w-96'}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary text-primary-foreground">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Financial Assistant
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={toggleExpand} className="text-primary-foreground">
                    {isExpanded ? <FiMinimize2 className="h-4 w-4" /> : <FiMaximize2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={toggleChat} className="text-primary-foreground">
                    &times;
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col p-4">
                <ScrollArea ref={scrollAreaRef} className="flex-grow pr-4 mb-4 h-[400px]">
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <motion.div 
                        key={index} 
                        className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span 
                          className={`inline-block p-3 rounded-lg ${
                            msg.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          {msg.role === 'assistant' ? (
                            <TypeAnimation
                              sequence={[
                                () => setIsGeneratingText(true),
                                msg.content,
                                () => setIsGeneratingText(false)
                              ]}
                              wrapper="span"
                              speed={80}
                              style={{ whiteSpace: 'pre-line', display: 'inline-block' }}
                              cursor={false}
                            />
                          ) : (
                            formatMessage(msg.content)
                          )}
                        </span>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <div className="text-left mb-4">
                        <span className="inline-block p-3 rounded-lg bg-secondary text-secondary-foreground">
                          <TypeAnimation
                            sequence={['...', '......']}
                            wrapper="span"
                            speed={80}
                            repeat={Infinity}
                          />
                        </span>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Ask about your finances..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit" size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <FiSend className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button onClick={toggleChat} size="icon" className="rounded-full h-14 w-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
            <FiMessageSquare className="h-6 w-6" />
            <span className="sr-only">Open AI chat</span>
          </Button>
        </motion.div>
      )}
    </div>
  )
}

export { ChatbotComponent } 