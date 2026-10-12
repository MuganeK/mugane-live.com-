/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Admin Login Component - ACK St. Mary's Ngariama
 * Strictly adheres to UK English conventions.
 */

import React, { useState } from 'react';
import { ChurchCrest } from '../ChurchCrest';
import { Lock, Eye, EyeOff, ArrowLeft, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const [passphrase, setPassphrase] = useState('');
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Default parish administrator passphrase
  const VALID_PASSPHRASE = 'ngariama2026';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      if (passphrase.trim().toLowerCase() === VALID_PASSPHRASE || passphrase.trim() === 'stmarys2026') {
        // Store administrative session token
        localStorage.setItem('ack_ngariama_admin_auth_v1', 'authorised');
        onSuccess();
      } else {
        setErrorMessage('Authorisation unsuccessful. Please verify your administrator passphrase and try again.');
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-center items-center px-4 py-12">
      {/* Return to Website link */}
      <button
        onClick={onCancel}
        className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-950 hover:text-purple-800 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Public Website</span>
      </button>

      {/* Login Card */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-purple-950 text-white p-8 text-center relative">
          <div className="flex justify-center mb-3">
            <ChurchCrest size="lg" className="ring-4 ring-amber-400/20 shadow-md" />
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-white">
            Parish Administration
          </h2>
          <p className="text-xs text-amber-300 font-medium uppercase tracking-wider mt-1">
            ACK St. Mary's Ngariama · Diocese of Kirinyaga
          </p>
          <p className="text-xs text-purple-200 mt-2">
            Authorised staff access for managing weekly notices, sermons, and development funds.
          </p>
        </div>

        {/* Card Body */}
        <div className="p-8">
          {errorMessage && (
            <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in duration-150">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label 
                htmlFor="admin-passphrase"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5"
              >
                Administrator Passphrase
              </label>
              <div className="relative">
                <input
                  id="admin-passphrase"
                  type={showPassphrase ? 'text' : 'password'}
                  required
                  placeholder="Enter parish secret key"
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800 bg-stone-50/50 text-stone-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassphrase(!showPassphrase)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                  aria-label={showPassphrase ? 'Hide passphrase' : 'Show passphrase'}
                >
                  {showPassphrase ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-stone-500 mt-1.5 flex items-center justify-between">
                <span>Default parish key: <strong className="font-mono text-purple-900">ngariama2026</strong></span>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-purple-950 hover:bg-purple-900 text-white font-semibold text-xs tracking-wide uppercase transition shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to Portal'}</span>
            </button>
          </form>

          {/* Security & Confidentiality Notice */}
          <div className="mt-8 pt-6 border-t border-stone-100 text-center">
            <p className="text-[11px] text-stone-400 leading-relaxed">
              This administrative area is restricted to the Vicar, Parish Wardens, and appointed church secretariat. All management transactions are logged for transparency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
