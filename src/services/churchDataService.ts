/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Church Data Service - ACK St. Mary's Ngariama
 * Provides data abstraction, local persistence, and extensible Google Sheets CSV synchronisation.
 * Strictly adheres to UK English conventions.
 */

import { Announcement, Sermon } from '../types/church';
import { ANNOUNCEMENTS as DEFAULT_ANNOUNCEMENTS, SERMONS as DEFAULT_SERMONS, CHURCH_INFO } from '../data/churchData';

export interface HarambeeFundData {
  title: string;
  targetKES: number;
  raisedKES: number;
  donorsCount: number;
  lastUpdated: string;
  bankAccountRef?: string;
  paybillRef?: string;
  recentContributions?: Array<{
    id: string;
    contributorName: string;
    amountKES: number;
    date: string;
    purpose: string;
  }>;
}

const STORAGE_KEYS = {
  ANNOUNCEMENTS: 'ack_ngariama_announcements_v1',
  SERMONS: 'ack_ngariama_sermons_v1',
  HARAMBEE: 'ack_ngariama_harambee_v1',
  SHEET_CONFIG: 'ack_ngariama_sheet_config_v1',
  ADMIN_AUTH: 'ack_ngariama_admin_auth_v1',
};

const DEFAULT_HARAMBEE_DATA: HarambeeFundData = {
  title: CHURCH_INFO.buildingProject.title,
  targetKES: CHURCH_INFO.buildingProject.targetKES,
  raisedKES: CHURCH_INFO.buildingProject.raisedKES,
  donorsCount: CHURCH_INFO.buildingProject.donorsCount,
  lastUpdated: '1 October 2026',
  bankAccountRef: 'Equity Bank Kianyaga Branch',
  paybillRef: 'Paybill 247247, Account: ROOF-YourName',
  recentContributions: [
    {
      id: 'c-1',
      contributorName: 'Ngariama Christian Business Fellowship',
      amountKES: 150000,
      date: '28 September 2026',
      purpose: 'Sanctuary Heavy-Gauge Roofing Sheets',
    },
    {
      id: 'c-2',
      contributorName: 'KAMA Men’s Association Kirinyaga',
      amountKES: 85000,
      date: '24 September 2026',
      purpose: 'Timber Trusses & Framework Support',
    },
    {
      id: 'c-3',
      contributorName: 'Diaspora Friends of St. Mary’s',
      amountKES: 120000,
      date: '20 September 2026',
      purpose: 'Acoustic Ceiling & Gutters',
    },
  ],
};

/**
 * Dispatch an event whenever church data is updated so client views refresh immediately.
 */
function notifyDataChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('church-data-updated'));
  }
}

/**
 * Initialise and retrieve weekly announcements from local state or cache.
 */
export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (error) {
    console.warn('Unable to retrieve stored announcements; falling back to defaults:', error);
  }
  return DEFAULT_ANNOUNCEMENTS;
}

/**
 * Persist weekly announcements and notify public website listeners.
 */
export async function saveAnnouncements(data: Announcement[]): Promise<boolean> {
  try {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(data));
    notifyDataChange();
    return true;
  } catch (error) {
    console.error('Failed to save announcements to storage:', error);
    return false;
  }
}

/**
 * Initialise and retrieve sermons from local state or cache.
 */
export async function getSermons(): Promise<Sermon[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SERMONS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (error) {
    console.warn('Unable to retrieve stored sermons; falling back to defaults:', error);
  }
  return DEFAULT_SERMONS;
}

/**
 * Persist sermons and notify public website listeners.
 */
export async function saveSermons(data: Sermon[]): Promise<boolean> {
  try {
    localStorage.setItem(STORAGE_KEYS.SERMONS, JSON.stringify(data));
    notifyDataChange();
    return true;
  } catch (error) {
    console.error('Failed to save sermons to storage:', error);
    return false;
  }
}

/**
 * Initialise and retrieve the Harambee building project metrics.
 */
export async function getHarambeeFundData(): Promise<HarambeeFundData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HARAMBEE);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (error) {
    console.warn('Unable to retrieve stored Harambee fund data; falling back to defaults:', error);
  }
  return DEFAULT_HARAMBEE_DATA;
}

/**
 * Persist Harambee fund data and notify public website listeners.
 */
export async function saveHarambeeFundData(data: HarambeeFundData): Promise<boolean> {
  try {
    localStorage.setItem(STORAGE_KEYS.HARAMBEE, JSON.stringify(data));
    notifyDataChange();
    return true;
  } catch (error) {
    console.error('Failed to save Harambee fund metrics to storage:', error);
    return false;
  }
}

/**
 * Reset all administrator modifications back to parish default data.
 */
export async function resetToParishDefaults(): Promise<void> {
  localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENTS);
  localStorage.removeItem(STORAGE_KEYS.SERMONS);
  localStorage.removeItem(STORAGE_KEYS.HARAMBEE);
  notifyDataChange();
}

/**
 * Google Sheets CSV Integration Helper
 * 
 * When the parish publishes a Google Sheet to the web as a CSV, this function
 * can be invoked directly to fetch, parse, and synchronise the live spreadsheet rows.
 * 
 * Format expected for Announcements CSV:
 * Title, Category, Date, Time, Venue, Summary, Details, Highlight
 */
export async function fetchFromGoogleSheetCsv(
  csvUrl: string,
  category: 'announcements' | 'sermons' | 'harambee'
): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    if (!csvUrl || !csvUrl.startsWith('http')) {
      throw new Error('Please supply a valid HTTP/HTTPS published Google Sheets CSV URL.');
    }

    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`Google Sheets responded with HTTP status ${response.status}`);
    }

    const csvText = await response.text();
    const rows = parseCsvText(csvText);

    if (rows.length < 2) {
      throw new Error('CSV sheet is empty or lacks data rows.');
    }

    // Skip the header row (index 0)
    const dataRows = rows.slice(1);

    if (category === 'announcements') {
      const parsedAnnouncements: Announcement[] = dataRows.map((cols, idx) => ({
        id: `sheet-ann-${idx + 1}`,
        title: cols[0]?.trim() || 'Parish Announcement',
        category: (cols[1]?.trim() as Announcement['category']) || 'Service',
        date: cols[2]?.trim() || 'Upcoming Sunday',
        time: cols[3]?.trim() || '9:00 AM',
        venue: cols[4]?.trim() || 'Main Sanctuary',
        summary: cols[5]?.trim() || '',
        details: cols[6]?.trim() || cols[5]?.trim() || '',
        highlight: cols[7]?.toLowerCase() === 'true' || cols[7]?.toLowerCase() === 'yes',
      }));

      await saveAnnouncements(parsedAnnouncements);
      return { success: true, count: parsedAnnouncements.length };
    }

    if (category === 'sermons') {
      const parsedSermons: Sermon[] = dataRows.map((cols, idx) => ({
        id: `sheet-sermon-${idx + 1}`,
        title: cols[0]?.trim() || 'Sunday Sermon',
        preacher: cols[1]?.trim() || 'Rev. Canon E. K. Murimi',
        role: cols[2]?.trim() || 'Vicar / Parish Priest',
        date: cols[3]?.trim() || 'Recent Sunday',
        duration: cols[4]?.trim() || '35 mins',
        passage: cols[5]?.trim() || 'Scripture Passage',
        audioUrl: cols[6]?.trim() || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        category: (cols[7]?.trim() as Sermon['category']) || 'Sunday Service',
        summary: cols[8]?.trim() || 'Exposition of the Word.',
        keyPoints: cols[9] ? cols[9].split(';').map(p => p.trim()) : ['Remain rooted in the Word.'],
      }));

      await saveSermons(parsedSermons);
      return { success: true, count: parsedSermons.length };
    }

    if (category === 'harambee') {
      const firstRow = dataRows[0];
      const targetKES = Number(firstRow[1]?.replace(/[^0-9]/g, '')) || 3500000;
      const raisedKES = Number(firstRow[2]?.replace(/[^0-9]/g, '')) || 2150000;
      const donorsCount = Number(firstRow[3]?.replace(/[^0-9]/g, '')) || 384;

      const parsedHarambee: HarambeeFundData = {
        title: firstRow[0]?.trim() || 'Parish Sanctuary Roofing & Expansion Project',
        targetKES,
        raisedKES,
        donorsCount,
        lastUpdated: firstRow[4]?.trim() || new Date().toLocaleDateString('en-GB'),
        paybillRef: 'Paybill 247247, Account: ROOF-YourName',
      };

      await saveHarambeeFundData(parsedHarambee);
      return { success: true, count: 1 };
    }

    return { success: false, count: 0, error: 'Unrecognised category specified.' };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown CSV parsing error';
    return { success: false, count: 0, error: message };
  }
}

/**
 * Basic CSV parser supporting quoted strings and commas.
 */
function parseCsvText(text: string): string[][] {
  const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
  return lines.map(line => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  });
}
