'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { User, Mail, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    console.log('Submitting form...', formData);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', res.status);

      const data = await res.json();
      console.log('Response data:', data);

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(null), 5000); // this basically uh tells that oh shi clear up after 5 seconds
      } else {
        setStatus('error');
        console.error('Error response:', data);
        alert(`Failed to send message: ${data.details || data.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setStatus('error');
      alert('Something went wrong. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="bg-[#1a1a1a] border-gray-800 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center text-cyan-400 mb-2 font-medium">
              <User className="w-4 h-4 mr-2" />
              Name
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="flex items-center text-cyan-400 mb-2 font-medium">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="flex items-center text-cyan-400 mb-2 font-medium">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              required
              rows={6}
              className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
            />
          </div>

          {status === 'success' && (
            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5" />
              <span>Thank you! Your message has been sent successfully.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
              <XCircle className="w-5 h-5" />
              <span>Failed to send message. Please try again.</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className={`w-full bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-6 text-lg transition-all ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}