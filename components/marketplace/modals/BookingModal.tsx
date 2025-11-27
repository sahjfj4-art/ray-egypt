import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from '../../common/GlobalSettings';

interface Props {
  open: boolean;
  onClose: () => void;
  listing: any;
}

const BookingModal: React.FC<Props> = ({ open, onClose, listing }) => {
  const t = useTranslation();
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!open) return null;

  const saveBooking = async () => {
    if (!date) {
      setMessage(t.selectDate || 'Select date');
      return;
    }

    setLoading(true);
    try {
      // Simple localStorage persistence for demo; replace with Supabase call later
      const key = 'ray_bookings_v1';
      const existingJson = localStorage.getItem(key);
      const existing = existingJson ? JSON.parse(existingJson) : [];
      const newBooking = {
        id: Date.now().toString(),
        listingId: listing?.id || null,
        listingName: listing?.name || listing?.title || 'Unknown',
        date,
        guests,
        createdAt: new Date().toISOString()
      };
      existing.push(newBooking);
      localStorage.setItem(key, JSON.stringify(existing));

      setMessage(t.bookingSuccess || 'Booking successful');
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 800);
    } catch (err) {
      console.error(err);
      setMessage(t.bookingError || 'Booking failed. Try again');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{listing?.name || listing?.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t.bookingDate}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">{t.selectDate}</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">{t.guests}</label>
            <input type="number" min={1} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-32 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
          </div>

          {message && <div className="text-sm text-center text-green-600 dark:text-green-400">{message}</div>}

          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300">{t.cancel}</button>
            <button onClick={saveBooking} disabled={loading} className="px-4 py-2 rounded-xl bg-ray-gold text-ray-blue font-bold text-sm hover:opacity-90 disabled:opacity-60">{loading ? '...' : t.bookNow}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
