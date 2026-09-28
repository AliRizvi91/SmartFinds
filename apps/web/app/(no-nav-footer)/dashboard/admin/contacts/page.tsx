'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Mail,
  MessageSquareText,
  Search,
  User,
  X,
  Inbox,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
} from 'lucide-react';

import {
  useGetContactQuery,
  useGetContactsQuery,
} from '@/features/contact/contactsApi';
import Link from 'next/link';

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const formatDate = (date: string) => {
  if (!date) return '—';

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
};

const formatShortDate = (date: string) => {
  if (!date) return '—';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

const getInitials = (name: string) => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
};

export default function AdminContactsPage() {
  const {
    data: contacts = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetContactsQuery();

  const [search, setSearch] = useState('');
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null,
  );

  const {
    data: selectedContact,
    isLoading: isContactLoading,
    isError: isContactError,
  } = useGetContactQuery(selectedContactId ?? '', {
    skip: !selectedContactId,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedContactId(null);
      }
    };

    if (selectedContactId) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedContactId]);

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return contacts;
    }

    return contacts.filter((contact: Contact) => {
      return (
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.subject.toLowerCase().includes(query) ||
        contact.message.toLowerCase().includes(query)
      );
    });
  }, [contacts, search]);

  const todayCount = useMemo(() => {
    const today = new Date();

    return contacts.filter((contact: Contact) => {
      const date = new Date(contact.createdAt);

      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    }).length;
  }, [contacts]);

  const latestContact = useMemo(() => {
    if (!contacts.length) return null;

    return [...contacts].sort(
      (a: Contact, b: Contact) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];
  }, [contacts]);

  const closeModal = () => {
    setSelectedContactId(null);
  };

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple/15 bg-purple/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-purple">
                <MessageSquareText size={14} />
                Admin
              </div>

              <h1 className="font-display text-3xl tracking-tight text-ink-text sm:text-4xl">
                Contacts
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500 sm:text-base">
                Manage and review messages submitted through your website.
              </p>
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <button
                type="button"
                onClick={() => refetch()}
                disabled={isFetching}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-ink-text shadow-sm transition hover:border-purple/30 hover:bg-purple/5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={16}
                  className={isFetching ? 'animate-spin' : ''}
                />
                Refresh
              </button>

              <Link
                href="/dashboard/admin"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-text shadow-sm transition-all duration-300 hover:-translate-x-0.5 hover:border-purple/30 hover:bg-purple/5 hover:text-purple"
              >
                <ArrowLeft size={16} />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        {!isLoading && !isError && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <StatCard
              icon={<Inbox size={19} />}
              label="Total Contacts"
              value={contacts.length}
              description="All received messages"
            />

            <StatCard
              icon={<Clock3 size={19} />}
              label="Received Today"
              value={todayCount}
              description="Messages submitted today"
            />

            <StatCard
              icon={<CheckCircle2 size={19} />}
              label="Latest Contact"
              value={
                latestContact
                  ? formatShortDate(latestContact.createdAt)
                  : '—'
              }
              description={
                latestContact
                  ? latestContact.name
                  : 'No contacts available'
              }
            />
          </motion.div>
        )}

        {/* Search */}
        {!isLoading && !isError && contacts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mb-5"
          >
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, email, subject or message..."
                className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-11 pr-4 text-sm text-ink-text outline-none transition placeholder:text-neutral-400 focus:border-purple/40 focus:ring-4 focus:ring-purple/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-ink-text"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Loading */}
        {isLoading && <ContactsLoading />}

        {/* Error */}
        {!isLoading && isError && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
              <AlertCircle size={22} />
            </div>

            <h2 className="font-display text-xl text-ink-text">
              Unable to load contacts
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
              Something went wrong while loading contact messages. Please try
              again.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition hover:opacity-90"
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </motion.div>
        )}

        {/* Empty */}
        {!isLoading && !isError && contacts.length === 0 && (
          <EmptyContacts />
        )}

        {/* No Search Results */}
        {!isLoading &&
          !isError &&
          contacts.length > 0 &&
          filteredContacts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-neutral-200 bg-white px-6 py-14 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple/5 text-purple">
                <Search size={21} />
              </div>

              <h2 className="font-display text-xl text-ink-text">
                No contacts found
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                Try a different name, email, subject, or keyword.
              </p>
            </motion.div>
          )}

        {/* Desktop Table */}
        {!isLoading &&
          !isError &&
          filteredContacts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="hidden overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm md:block"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50/70">
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Contact
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Subject
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Message
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Date
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredContacts.map(
                      (contact: Contact, index: number) => (
                        <motion.tr
                          key={contact._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() =>
                            setSelectedContactId(contact._id)
                          }
                          className="group cursor-pointer border-b border-neutral-100 transition last:border-b-0 hover:bg-purple/[0.025]"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <Avatar name={contact.name} />

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-ink-text">
                                  {contact.name}
                                </p>

                                <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-neutral-500">
                                  <Mail size={12} />
                                  {contact.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="max-w-[220px] px-6 py-5">
                            <p className="truncate text-sm font-medium text-ink-text">
                              {contact.subject || 'No subject'}
                            </p>
                          </td>

                          <td className="max-w-[320px] px-6 py-5">
                            <p className="truncate text-sm text-neutral-500">
                              {contact.message || 'No message'}
                            </p>
                          </td>

                          <td className="whitespace-nowrap px-6 py-5">
                            <p className="text-sm text-neutral-600">
                              {formatShortDate(contact.createdAt)}
                            </p>
                          </td>

                          <td className="px-6 py-5 text-right">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition group-hover:bg-purple/10 group-hover:text-purple">
                              <ChevronRight size={17} />
                            </span>
                          </td>
                        </motion.tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

        {/* Mobile Cards */}
        {!isLoading &&
          !isError &&
          filteredContacts.length > 0 && (
            <div className="space-y-3 md:hidden">
              {filteredContacts.map(
                (contact: Contact, index: number) => (
                  <motion.button
                    key={contact._id}
                    type="button"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() =>
                      setSelectedContactId(contact._id)
                    }
                    className="group w-full rounded-2xl border border-neutral-200 bg-white p-4 text-left shadow-sm transition hover:border-purple/25 hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar name={contact.name} />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-ink-text">
                              {contact.name}
                            </p>

                            <p className="mt-1 truncate text-xs text-neutral-500">
                              {contact.email}
                            </p>
                          </div>

                          <ChevronRight
                            size={17}
                            className="mt-1 shrink-0 text-neutral-400 transition group-hover:text-purple"
                          />
                        </div>

                        <div className="mt-4">
                          <p className="truncate text-sm font-semibold text-ink-text">
                            {contact.subject || 'No subject'}
                          </p>

                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">
                            {contact.message || 'No message'}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center gap-1.5 text-xs text-neutral-400">
                          <CalendarDays size={13} />
                          {formatDate(contact.createdAt)}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ),
              )}
            </div>
          )}
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {selectedContactId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close contact details"
              onClick={closeModal}
              className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 28,
              }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-neutral-200 px-5 py-5 sm:px-7">
                <div className="flex min-w-0 items-center gap-3">
                  {selectedContact ? (
                    <Avatar name={selectedContact.name} size="large" />
                  ) : (
                    <div className="h-11 w-11 animate-pulse rounded-full bg-neutral-200" />
                  )}

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple">
                      Contact Details
                    </p>

                    <h2
                      id="contact-modal-title"
                      className="mt-1 truncate font-display text-xl text-ink-text"
                    >
                      {selectedContact?.name || 'Loading...'}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-neutral-400 transition hover:bg-neutral-100 hover:text-ink-text"
                  aria-label="Close"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto px-5 py-6 sm:px-7">
                {isContactLoading && <ContactModalLoading />}

                {isContactError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
                    <AlertCircle
                      size={22}
                      className="mx-auto text-red-500"
                    />

                    <p className="mt-2 text-sm font-semibold text-red-700">
                      Unable to load contact
                    </p>

                    <p className="mt-1 text-xs text-red-600">
                      Please close this popup and try again.
                    </p>
                  </div>
                )}

                {!isContactLoading &&
                  !isContactError &&
                  selectedContact && (
                    <div className="space-y-6">
                      {/* Contact Information */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <InfoItem
                          icon={<User size={16} />}
                          label="Name"
                          value={selectedContact.name}
                        />

                        <InfoItem
                          icon={<Mail size={16} />}
                          label="Email"
                          value={selectedContact.email}
                          href={`mailto:${selectedContact.email}`}
                        />

                        <InfoItem
                          icon={<MessageSquareText size={16} />}
                          label="Subject"
                          value={selectedContact.subject || 'No subject'}
                        />

                        <InfoItem
                          icon={<CalendarDays size={16} />}
                          label="Received"
                          value={formatDate(selectedContact.createdAt)}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <div className="mb-3 flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple/10 text-purple">
                            <MessageSquareText size={16} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-ink-text">
                              Message
                            </p>

                            <p className="text-xs text-neutral-400">
                              Full message from the contact
                            </p>
                          </div>
                        </div>

                        <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5">
                          <p className="whitespace-pre-wrap break-words text-sm leading-7 text-neutral-600">
                            {selectedContact.message || 'No message'}
                          </p>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="border-t border-neutral-200 pt-5">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                              Contact ID
                            </p>

                            <p className="mt-1 break-all font-mono text-xs text-neutral-500">
                              {selectedContact._id}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                              Last Updated
                            </p>

                            <p className="mt-1 text-xs text-neutral-500">
                              {formatDate(selectedContact.updatedAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col gap-3 border-t border-neutral-200 bg-neutral-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-ink-text transition hover:bg-neutral-100"
                >
                  Close
                </button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                 */
/* -------------------------------------------------------------------------- */

function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            {label}
          </p>

          <p className="mt-2 font-display text-2xl text-ink-text">
            {value}
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            {description}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple/10 text-purple">
          {icon}
        </div>
      </div>
    </div>
  );
}

function Avatar({
  name,
  size = 'default',
}: {
  name: string;
  size?: 'default' | 'large';
}) {
  const initials = getInitials(name);

  const sizeClasses =
    size === 'large'
      ? 'h-11 w-11 text-sm'
      : 'h-10 w-10 text-xs';

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-ink font-semibold text-paper ${sizeClasses}`}
    >
      {initials || <User size={16} />}
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="mb-2 flex items-center gap-2 text-neutral-400">
        {icon}
        <span className="text-[11px] font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="break-words text-sm font-medium text-ink-text">
        {value}
      </p>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-purple/25 hover:bg-purple/[0.025]"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4">
      {content}
    </div>
  );
}

function ContactsLoading() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="hidden md:block">
        <div className="border-b border-neutral-200 bg-neutral-50/70 px-6 py-4">
          <div className="h-3 w-32 animate-pulse rounded bg-neutral-200" />
        </div>

        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-6 border-b border-neutral-100 px-6 py-5 last:border-0"
          >
            <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200" />

            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 animate-pulse rounded bg-neutral-200" />
              <div className="h-3 w-48 animate-pulse rounded bg-neutral-100" />
            </div>

            <div className="h-3 w-32 animate-pulse rounded bg-neutral-100" />
            <div className="h-3 w-24 animate-pulse rounded bg-neutral-100" />
            <div className="h-8 w-8 animate-pulse rounded-lg bg-neutral-100" />
          </div>
        ))}
      </div>

      <div className="space-y-3 p-4 md:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-neutral-100 p-4"
          >
            <div className="flex gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200" />

              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 animate-pulse rounded bg-neutral-200" />
                <div className="h-3 w-48 animate-pulse rounded bg-neutral-100" />
                <div className="mt-4 h-3 w-40 animate-pulse rounded bg-neutral-200" />
                <div className="h-3 w-full animate-pulse rounded bg-neutral-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactModalLoading() {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-neutral-200 p-4"
          >
            <div className="h-3 w-20 animate-pulse rounded bg-neutral-200" />
            <div className="mt-3 h-4 w-36 animate-pulse rounded bg-neutral-100" />
          </div>
        ))}
      </div>

      <div>
        <div className="mb-3 h-4 w-24 animate-pulse rounded bg-neutral-200" />

        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
          <div className="space-y-3">
            <div className="h-3 w-full animate-pulse rounded bg-neutral-200" />
            <div className="h-3 w-[90%] animate-pulse rounded bg-neutral-200" />
            <div className="h-3 w-[75%] animate-pulse rounded bg-neutral-200" />
            <div className="h-3 w-[85%] animate-pulse rounded bg-neutral-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyContacts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-neutral-200 bg-white px-6 py-16 text-center shadow-sm"
    >
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple/10 text-purple">
        <Inbox size={25} />
      </div>

      <h2 className="font-display text-2xl text-ink-text">
        No contacts yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
        When someone submits the contact form on your website, their message
        will appear here.
      </p>
    </motion.div>
  );
}