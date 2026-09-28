'use client';

import { FormEvent, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
} from 'lucide-react';

import { Container } from '@/components/ui/Container';

import { useCreateContactMutation } from '@/features/contact/contactsApi';

export default function ContactPage() {
  const shouldReduceMotion = useReducedMotion();

  const [createContact, { isLoading }] =
    useCreateContactMutation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setSuccess('');
    setError('');

    try {
      await createContact(form).unwrap();

      setSuccess(
        'Your message has been sent successfully.',
      );

      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch {
      setError(
        'Something went wrong. Please try again.',
      );
    }
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const cardHover = shouldReduceMotion
    ? {}
    : {
        y: -4,
        transition: {
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        },
      };

  return (
    <>

      <main className="relative overflow-hidden bg-white py-20 sm:py-28">

        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-180px] top-[-160px] h-[420px] w-[420px] rounded-full bg-purple/10 blur-3xl" />
          <div className="absolute right-[-180px] top-[20%] h-[420px] w-[420px] rounded-full bg-purple/10 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />
        </div>

        <Container className="relative max-w-6xl">

          {/* HERO */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={fadeUp}>
              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-purple/15 bg-purple/[0.06] px-4 py-2 text-sm font-medium text-purple">
                <Sparkles className="h-4 w-4" />
                We&apos;re here to help
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl tracking-tight text-ink-text sm:text-5xl lg:text-6xl"
            >
              Let&apos;s start a
              <span className="block bg-gradient-to-r from-purple via-purple to-fuchsia-500 bg-clip-text text-transparent">
                conversation.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-base leading-8 text-neutral-500 sm:text-lg"
            >
              Have a question, need support, or want to explore
              a partnership? Tell us what&apos;s on your mind.
              Our team will get back to you.
            </motion.p>
          </motion.div>

          {/* CONTENT */}
          <div className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">

            {/* LEFT SIDE */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
              className="relative overflow-hidden rounded-[28px] bg-ink p-8 text-white sm:p-10"
            >
              {/* Decorative glow */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                      }
                }
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-purple/30 blur-3xl"
              />

              <motion.div
                variants={fadeUp}
                className="relative"
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>

                <h2 className="font-display text-3xl">
                  Let&apos;s talk
                </h2>

                <p className="mt-4 max-w-md leading-7 text-white/60">
                  Whether you&apos;re a brand, publisher, or
                  simply exploring SmartFinds, we&apos;d love
                  to hear from you.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="relative mt-12 space-y-4"
              >
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Mail className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs text-white/40">
                      Email
                    </p>
                    <p className="mt-1 text-sm text-white/80">
                      We&apos;ll respond as soon as possible
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs text-white/40">
                      Support
                    </p>
                    <p className="mt-1 text-sm text-white/80">
                      Sales, support & partnerships
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating accent */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        rotate: [0, 8, 0, -8, 0],
                        y: [0, -6, 0],
                      }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute bottom-[-35px] right-[-20px] h-32 w-32 rounded-full border border-white/10"
              />
            </motion.div>

            {/* FORM CARD */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              whileHover={cardHover}
              className="relative rounded-[28px] border border-neutral-200 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.07)] sm:p-8"
            >
              <div className="mb-8">
                <p className="text-sm font-semibold text-purple">
                  SEND A MESSAGE
                </p>

                <h2 className="mt-2 font-display text-2xl text-ink-text">
                  How can we help?
                </h2>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* NAME + EMAIL */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-ink-text"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 text-sm text-ink-text outline-none transition duration-300 placeholder:text-neutral-400 hover:border-neutral-300 focus:border-purple focus:bg-white focus:ring-4 focus:ring-purple/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-ink-text"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 text-sm text-ink-text outline-none transition duration-300 placeholder:text-neutral-400 hover:border-neutral-300 focus:border-purple focus:bg-white focus:ring-4 focus:ring-purple/10"
                    />
                  </div>

                </div>

                {/* SUBJECT */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-ink-text"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 text-sm text-ink-text outline-none transition duration-300 placeholder:text-neutral-400 hover:border-neutral-300 focus:border-purple focus:bg-white focus:ring-4 focus:ring-purple/10"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-ink-text"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us a little more..."
                    className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 text-sm leading-6 text-ink-text outline-none transition duration-300 placeholder:text-neutral-400 hover:border-neutral-300 focus:border-purple focus:bg-white focus:ring-4 focus:ring-purple/10"
                  />
                </div>

                {/* SUCCESS */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    {success}
                  </motion.div>
                )}

                {/* ERROR */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {error}
                  </motion.div>
                )}

                {/* SUBMIT */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={
                    shouldReduceMotion || isLoading
                      ? {}
                      : {
                          scale: 1.01,
                        }
                  }
                  whileTap={
                    shouldReduceMotion || isLoading
                      ? {}
                      : {
                          scale: 0.98,
                        }
                  }
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-purple px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple/20 transition-all duration-300 hover:shadow-xl hover:shadow-purple/25 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <motion.span
                        animate={
                          shouldReduceMotion
                            ? {}
                            : { rotate: 360 }
                        }
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                      />

                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />

                      Send message

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-neutral-400">
                  By submitting this form, you agree to be
                  contacted regarding your message.
                </p>

              </form>
            </motion.div>

          </div>
        </Container>
      </main>

    </>
  );
}