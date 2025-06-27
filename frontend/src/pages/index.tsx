// src/pages/index.tsx

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <Head>
        <title>Jaza – Accelerate Your Growth</title>
      </Head>

      {/* Header */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-6 py-4 flex justify-between items-center shadow-sm bg-white sticky top-0 z-50"
      >
        <div className="text-2xl font-bold text-green-700">Jaza</div>
        <nav className="space-x-6 text-sm font-medium text-gray-600">
          <Link href="/login" className="hover:text-green-700">Login</Link>
          <Link href="/signup" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">Get Started</Link>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 py-20 max-w-7xl mx-auto bg-gray-900">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-300 leading-tight">
            Empower Your Hustle with <span className="text-green-500">Jaza</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Track income. Grow your savings. Unlock smart credit based on your real cashflow.
          </p>
          <div className="flex space-x-4">
            <Link href="/signup" className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">Join Now</Link>
            <Link href="#features" className="text-green-400 font-semibold hover:underline">Learn More</Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 mt-10 md:mt-0"
        >
          <Image
            src="/images/bodarider.png"
            alt="Boda Rider Hero"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Built for Everyday Hustlers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you're a mama mboga, a boda rider, or a small shop owner, Jaza helps you stay in control of your money.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4 text-left"
          >
            <h3 className="text-xl font-semibold text-green-700"> Smart Income Tracking</h3>
            <p className="text-gray-600">
              Automatically or manually record daily sales — both M-Pesa and cash — and see your progress every day.
            </p>

            <h3 className="text-xl font-semibold text-green-700"> Jaza Jar Savings</h3>
            <p className="text-gray-600">
              Build savings with every sale. Hit your target and get pre-qualified for flexible credit based on your behavior.
            </p>

            <h3 className="text-xl font-semibold text-green-700"> Personalized Insights</h3>
            <p className="text-gray-600">
              Get tailored coaching and financial advice for your business type — what to sell, where to buy, how to grow.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/mamamboga.png"
              alt="Mama Mboga Feature"
              width={600}
              height={400}
              className="rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="bg-gray-900 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center text-white mb-8">
          <h3 className="text-2xl font-bold mb-4">Trusted by future partners</h3>
          <p className="text-gray-400">We're building the future of inclusive finance with Africa's top brands</p>
        </div>
        <div className="flex justify-center items-center gap-10 flex-wrap max-w-4xl mx-auto">
          <Image src="/logos/safaricom.png" alt="Safaricom" width={120} height={40} />
          <Image src="/logos/total.png" alt="Total" width={100} height={40} />
          <Image src="/logos/shell.jpg" alt="Shell" width={100} height={40} />
          <Image src="/logos/rubis.png" alt="Rubis" width={100} height={40} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-700 py-16 text-white px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-4xl font-bold">5,000+</h3>
            <p className="mt-2 text-lg">Small businesses empowered</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">KES 12M+</h3>
            <p className="mt-2 text-lg">Tracked in savings & income</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">30+</h3>
            <p className="mt-2 text-lg">Counties served in Kenya</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#f9f9f9] px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-bold text-green-700">What Hustlers Are Saying</h2>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-600 italic">“Since I started using Jaza, I’ve saved more in 3 months than all of last year. The insights help me plan better.”</p>
            <p className="mt-4 font-semibold text-green-700">– Alice, Mama Mboga in Gikambura</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-600 italic">“I love how Jaza tracks my daily M-Pesa income. It’s like having a financial assistant in my pocket.”</p>
            <p className="mt-4 font-semibold text-green-700">– Brian, Boda Rider in Kisumu</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-green-800 text-white py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to take control of your hustle?</h2>
        <p className="mb-8 max-w-xl mx-auto text-lg">Join thousands of African businesses using Jaza to save, grow and qualify for credit – all based on real data.</p>
        <Link href="/signup" className="inline-block bg-white text-green-800 font-semibold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition">
          Get Started Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Jaza. Empowering small businesses across Africa.</p>
        <p className="mt-2">
          <a href="#" className="underline hover:text-white">Privacy Policy</a> | <a href="#" className="underline hover:text-white">Terms</a>
        </p>
      </footer>
    </div>
  );
}
