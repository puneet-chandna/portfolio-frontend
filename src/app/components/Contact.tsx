'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MailIcon } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('Sending...')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus(data.message || 'Message sent successfully!')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('An error occurred. Please try again later.')
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Contact Me
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="mb-4">Feel free to reach out to me for any inquiries or opportunities.</p>
            <div className="flex items-center mb-2">
              <MailIcon className="mr-2" />
              <p>puneetchandna7@gmail.com</p>
            </div>
            <div className="flex items-center mb-4">
              <MailIcon className="mr-2" />
              <p>puneet.chandna2022@vitstudent.ac.in</p>
            </div>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/in/puneet-chandna2004" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                LinkedIn
              </a>
              <a href="https://github.com/puneet-chandna" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                GitHub
              </a>
              <a href="https://x.com/puneet_chandna_" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                X
              </a>
            </div>
          </motion.div>
          <motion.form 
            onSubmit={handleSubmit}
            className="md:w-1/2 space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <label htmlFor="name" className="block mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
              ></textarea>
            </div>
            <motion.button 
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
            {status && <p className="text-center mt-4">{status}</p>}
          </motion.form>
        </div>
      </div>
    </section>
  )
}