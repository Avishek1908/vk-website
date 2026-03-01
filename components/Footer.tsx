'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-2xl font-bold tracking-[0.3em] mb-4">
              <span className="text-orange-500">UL</span>
              <span className="text-white">I</span>
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Timeless Indian furniture designed for modern living.
            </p>
          </motion.div>

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-sm font-semibold mb-4 tracking-wider">MENU</h4>
            <ul className="space-y-3">
              {['Home', 'Shop', 'About', 'Contact', '404 Page'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-sm font-semibold mb-4 tracking-wider">LEGAL</h4>
            <ul className="space-y-3">
              {[
                'Privacy Policy',
                'Cookie Policy',
                'Terms and Conditions',
                'Delivery and Return',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/legal/${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-sm font-semibold mb-4 tracking-wider">CONTACT</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="tel:+97758036615"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  +97 75 803 6615
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@uli.chair"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  hello@uli.chair
                </a>
              </li>
            </ul>

            <h4 className="text-sm font-semibold mb-4 tracking-wider">
              FOLLOW US
            </h4>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'Twitter', 'TikTok'].map((social) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  className="text-white/70 hover:text-white transition-colors text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.slice(0, 2)}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          className="border-t border-white/10 pt-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h4 className="text-sm font-semibold mb-4 tracking-wider">
            NEWSLETTER
          </h4>
          <div className="max-w-md flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
            />
            <button className="px-6 py-3 bg-white text-primary-900 rounded-lg font-medium hover:bg-white/90 transition-colors">
              Subscribe
            </button>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          className="border-t border-white/10 pt-8 text-center text-sm text-white/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p>© 2025 ULI. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
