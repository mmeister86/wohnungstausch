'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState({ type: '', content: '' })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setMessage({
        type: 'success',
        content: 'Magic Link wurde versendet! Bitte überprüfen Sie Ihre E-Mails.',
      })
    } catch (error: unknown) {
      setMessage({
        type: 'error',
        content: error instanceof Error ? error.message : 'An unknown error occurred',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-fit gap-10 py-16 justify-center">
      {/* Left column with image */}
      <div className="hidden md:flex md:w-[560px] relative justify-center items-center">
        <div className="relative w-4/5 aspect-square">
          <Image
            src="/login.png"
            alt="Login illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Right column with login form */}
      <div className="flex w-full md:w-[560px] flex-col items-center justify-center py-2 px-4">
        <div className="w-full max-w-[560px] space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Anmelden oder Registrieren
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                          Geben Sie Ihre E-Mail-Adresse ein, um einen Magic Link zu erhalten. <br />
                          Schauen Sie anschließend in ihrem Postfach nach, um sich einzuloggen.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email Adresse
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:bg-green-400"
              >
                {loading ? 'Wird gesendet...' : 'Magic Link senden'}
              </button>
            </div>
          </form>

          {message.content && (
            <div
              className={`mt-4 p-4 rounded ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {message.content}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
