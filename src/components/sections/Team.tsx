import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchTeamMembers } from '@/api'
import { teamMembers as fallbackMembers } from '@/data/team'
import { LazyImage } from '@/components/LazyImage'
import { useI18n } from '@/i18n/I18nContext'
import type { TeamMember } from '@/api/types'

const ROLE_ORDER = ['CEO', 'CTO', 'CFO', 'CMO', 'CPO'] as const

function sortByRole(members: TeamMember[]): TeamMember[] {
  return [...members].sort((a, b) => {
    const i = ROLE_ORDER.indexOf(a.role as (typeof ROLE_ORDER)[number])
    const j = ROLE_ORDER.indexOf(b.role as (typeof ROLE_ORDER)[number])
    return (i === -1 ? 999 : i) - (j === -1 ? 999 : j)
  })
}

export function Team() {
  const { t } = useI18n()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTeamMembers()
      .then(({ members: data, error: err }) => {
        if (err) {
          setError(err)
          setMembers(
            sortByRole(
              fallbackMembers.map((m) => ({
                id: m.id,
                name: m.name,
                role: m.role,
                image: m.image,
                bio: m.bio,
                social: m.social,
              }))
            )
          )
        } else {
          setMembers(sortByRole(data))
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-brand font-semibold text-sm uppercase tracking-wider">
            {t.team.label}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            {t.team.title}
          </h2>
          <p className="mt-6 text-slate-600 text-lg">
            {t.team.subtitle}
          </p>
        </motion.div>

        {loading ? (
          <div className="mt-16 flex justify-center items-center min-h-[300px]">
            <div className="animate-pulse grid sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-48 h-48 rounded-2xl bg-slate-200" />
                  <div className="mt-6 h-4 w-24 bg-slate-200 rounded" />
                  <div className="mt-2 h-3 w-16 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {error && (
              <p className="mt-6 text-center text-amber-600 text-sm">
                {t.contact.error} ({error})
              </p>
            )}
            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-8" dir="ltr">
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group text-center"
                >
                  <div className="relative inline-block">
                    <div className="aspect-square w-48 mx-auto rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-soft group-hover:shadow-xl group-hover:border-brand/30 transition-all duration-300">
                      <LazyImage
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white border border-slate-200 text-brand hover:text-brand-dark hover:border-brand/40 shadow-md transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white border border-slate-200 text-brand hover:text-brand-dark hover:border-brand/40 shadow-md transition-colors"
                          aria-label="Twitter"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
                          </svg>
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white border border-slate-200 text-brand hover:text-brand-dark hover:border-brand/40 shadow-md transition-colors"
                          aria-label="GitHub"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-8 text-lg font-semibold text-slate-900">{member.name}</h3>
                  <p className="mt-1 text-brand text-sm font-medium">{member.role}</p>
                  <p className="mt-2 text-slate-600 text-sm max-w-xs mx-auto">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
