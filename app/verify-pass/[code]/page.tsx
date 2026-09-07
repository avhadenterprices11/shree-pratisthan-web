'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Ticket as TicketIcon, 
  Phone, 
  Mail, 
  QrCode, 
  ArrowLeft, 
  ShieldCheck, 
  Loader2,
  Check,
  CheckSquare,
  Square,
  UserCheck
} from 'lucide-react';
import { getApiBaseUrl } from '@/lib/api/bookings';

interface BookingItem {
  id: number;
  item_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface IssuedTicket {
  id: number;
  ticket_number: string;
  unique_code: string;
  holder_name: string;
  ticket_type_name?: string;
  is_checked_in: boolean;
  checked_in_at?: string;
  checked_in_by?: string;
}

interface BookingDetails {
  id: number;
  event_id: number;
  event_name?: string;
  booking_code: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status: string;
  payment_status: string;
  created_at: string;
  items?: BookingItem[];
}

export default function VerifyPassPage({ params }: { params: Promise<{ code: string }> }) {
  const resolvedParams = use(params);
  const bookingCode = resolvedParams.code;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [tickets, setTickets] = useState<IssuedTicket[]>([]);
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [selectedTicketIds, setSelectedTicketIds] = useState<number[]>([]);
  const [checkingIn, setCheckingIn] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchBookingData();
  }, [bookingCode]);

  async function fetchBookingData() {
    setLoading(true);
    setError(null);
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/events/public/bookings/${bookingCode}`);
      if (!res.ok) {
        throw new Error('Pass or Booking Code not found.');
      }
      const data = await res.json();
      const b = data.booking;
      const t: IssuedTicket[] = data.tickets || [];
      
      setBooking(b);
      setTickets(t);

      // Auto-select all currently unchecked passes
      const pendingIds = t.filter(ticket => !ticket.is_checked_in).map(ticket => ticket.id);
      setSelectedTicketIds(pendingIds);

      // Fetch Event Details if available
      if (b?.event_id) {
        try {
          const evRes = await fetch(`${baseUrl}/events/${b.event_id}`);
          if (evRes.ok) {
            const evData = await evRes.json();
            setEventDetails(evData);
          }
        } catch {
          // Non-blocking
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to verify pass. Please re-scan.');
    } finally {
      setLoading(false);
    }
  }

  function handleToggleTicket(id: number) {
    setSelectedTicketIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }

  function handleSelectAllPending() {
    const pendingIds = tickets.filter(t => !t.is_checked_in).map(t => t.id);
    setSelectedTicketIds(pendingIds);
  }

  function handleDeselectAll() {
    setSelectedTicketIds([]);
  }

  async function handleCheckInSelected() {
    if (!booking || selectedTicketIds.length === 0) return;
    setCheckingIn(true);
    try {
      const baseUrl = getApiBaseUrl();
      const res = await fetch(`${baseUrl}/events/public/bookings/${booking.booking_code}/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticket_ids: selectedTicketIds,
          checked_by: 'Mobile Gate Scanner'
        })
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Check-in failed on server.');
      }

      const updatedTickets: IssuedTicket[] = result.tickets || [];
      setTickets(updatedTickets);

      // Re-populate selection with remaining unchecked tickets
      const remainingIds = updatedTickets.filter(t => !t.is_checked_in).map(t => t.id);
      setSelectedTicketIds(remainingIds);

      setFeedbackMessage(result.message || `Successfully checked in ${selectedTicketIds.length} passes!`);
      setTimeout(() => setFeedbackMessage(null), 5000);
    } catch (err: any) {
      alert(err.message || 'Failed to complete gate check-in.');
    } finally {
      setCheckingIn(false);
    }
  }

  // Calculations
  const totalPasses = booking?.items?.reduce((acc, curr) => acc + (curr.quantity || 1), 0) || tickets.length || 1;
  const checkedInCount = tickets.filter(t => t.is_checked_in).length;
  const remainingCount = tickets.length - checkedInCount;
  const isAllCheckedIn = tickets.length > 0 && checkedInCount === tickets.length;
  const isPartiallyCheckedIn = checkedInCount > 0 && checkedInCount < tickets.length;
  const selectedCount = selectedTicketIds.length;

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-white selection:bg-orange-500 selection:text-black pb-20">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0b0e]/95 backdrop-blur-md px-4 py-3.5 shadow-md">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <Link 
            href="/verify-pass" 
            className="flex items-center gap-2 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Scan New Pass
          </Link>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Gate Scanner
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-5 space-y-5">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            <p className="text-sm text-neutral-400 font-medium">Verifying Pass #{bookingCode}...</p>
          </div>
        )}

        {error && !loading && (
          <div className="p-6 rounded-2xl bg-red-950/40 border border-red-500/40 text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
              <XCircle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-200">Pass Verification Failed</h2>
              <p className="text-sm text-red-300/80 mt-1">{error}</p>
            </div>
            <Link
              href="/verify-pass"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-sm font-semibold text-white transition-colors"
            >
              Scan Another Ticket
            </Link>
          </div>
        )}

        {!loading && !error && booking && (
          <>
            {/* Status Banner */}
            <div className={`p-5 rounded-2xl border text-center relative overflow-hidden shadow-2xl transition-all ${
              isAllCheckedIn 
                ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' 
                : isPartiallyCheckedIn
                ? 'bg-blue-950/40 border-blue-500/40 text-blue-200'
                : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
            }`}>
              <div className="flex items-center justify-center gap-2 mb-1.5">
                {isAllCheckedIn ? (
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                )}
                <span className="text-xs font-black tracking-widest uppercase">
                  {isAllCheckedIn 
                    ? 'ALL PASSES CHECKED IN' 
                    : isPartiallyCheckedIn 
                    ? `PARTIALLY USED (${checkedInCount}/${totalPasses} ENTERED)` 
                    : 'VALID PASS • READY FOR ADMISSION'}
                </span>
              </div>

              <div className="text-2xl font-black tracking-tight text-white">
                {isAllCheckedIn 
                  ? 'All Passes Used' 
                  : isPartiallyCheckedIn 
                  ? `${remainingCount} ${remainingCount === 1 ? 'Pass' : 'Passes'} Remaining` 
                  : 'Ready for Admission'}
              </div>

              <p className="text-xs text-neutral-300 mt-1">
                {isAllCheckedIn 
                  ? `All ${totalPasses} attendees in this booking have already checked in.` 
                  : `${checkedInCount} checked in, ${remainingCount} ready to enter.`}
              </p>
            </div>

            {/* Event Details Card */}
            <div className="p-5 rounded-2xl bg-neutral-900/90 border border-white/10 space-y-4 shadow-lg">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Event Details</span>
                  <h1 className="text-lg font-extrabold text-white mt-0.5">
                    {booking.event_name || eventDetails?.name || 'Grand Event Pass'}
                  </h1>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-orange-300 font-bold">
                  {booking.booking_code}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/5 text-orange-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] font-semibold">DATE</span>
                    <span className="font-bold text-neutral-200">
                      {eventDetails?.start_date 
                        ? new Date(eventDetails.start_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                        : '24 AUG 2026'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/5 text-orange-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] font-semibold">TIME</span>
                    <span className="font-bold text-neutral-200">
                      {eventDetails?.start_date 
                        ? new Date(eventDetails.start_date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                        : '07:00 PM'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 col-span-2">
                  <div className="p-2 rounded-lg bg-white/5 text-orange-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] font-semibold">VENUE</span>
                    <span className="font-bold text-neutral-200">
                      {eventDetails?.venue_name || eventDetails?.address_line1 || 'PVR INOX Cinemas, Nashik'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendee Summary */}
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-neutral-500" />
                  Booked By:
                </span>
                <span className="font-bold text-white">{booking.customer_name}</span>
              </div>
              {booking.customer_phone && (
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-neutral-500" />
                    Phone:
                  </span>
                  <span className="font-mono text-neutral-200">{booking.customer_phone}</span>
                </div>
              )}
              {booking.customer_email && (
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-neutral-500" />
                    Email:
                  </span>
                  <span className="text-neutral-300 truncate max-w-[200px]">{booking.customer_email}</span>
                </div>
              )}
            </div>

            {/* Interactive Passes List (Selective Check-In) */}
            <div className="p-5 rounded-2xl bg-neutral-900/90 border border-white/10 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <TicketIcon className="w-4 h-4 text-orange-400" />
                    Select Passes to Check In ({tickets.length} Total)
                  </h2>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Tap to check/uncheck if only some members are entering now.
                  </p>
                </div>
                
                {remainingCount > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSelectAllPending}
                      className="text-[10px] font-bold px-2 py-1 rounded bg-orange-500/20 text-orange-300 hover:bg-orange-500/30"
                    >
                      Select All ({remainingCount})
                    </button>
                    <button
                      type="button"
                      onClick={handleDeselectAll}
                      className="text-[10px] font-semibold px-2 py-1 rounded bg-white/5 text-neutral-400 hover:bg-white/10"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2.5">
                {tickets.map((t, idx) => {
                  const isChecked = selectedTicketIds.includes(t.id);
                  const isUsed = t.is_checked_in;

                  return (
                    <div 
                      key={t.id}
                      onClick={() => !isUsed && handleToggleTicket(t.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                        isUsed
                          ? 'bg-neutral-950/60 border-neutral-800 opacity-60 cursor-not-allowed'
                          : isChecked
                          ? 'bg-orange-950/30 border-orange-500/60 shadow-md ring-1 ring-orange-500/30'
                          : 'bg-neutral-800/80 border-neutral-700 hover:border-neutral-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Checkbox Icon */}
                        {isUsed ? (
                          <div className="w-5 h-5 rounded-md bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : isChecked ? (
                          <div className="w-5 h-5 rounded-md bg-orange-500 flex items-center justify-center text-black font-bold">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-md border-2 border-neutral-500 flex items-center justify-center" />
                        )}

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-xs">
                              Pass {idx + 1}: {t.holder_name || booking.customer_name}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-neutral-400">
                              {t.ticket_number}
                            </span>
                          </div>
                          <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                            Gate Code: <strong className="text-neutral-300">{t.unique_code}</strong>
                          </div>
                        </div>
                      </div>

                      <div>
                        {isUsed ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                            <Check className="w-3 h-3" /> Already Checked In
                          </span>
                        ) : isChecked ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-[10px] font-bold">
                            Selected for Entry
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-700/60 text-neutral-400 text-[10px] font-medium">
                            Coming Later
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Check-In Action Button */}
            <div className="pt-2 sticky bottom-4 z-20 space-y-2">
              <button
                onClick={handleCheckInSelected}
                disabled={checkingIn || selectedCount === 0}
                className={`w-full py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider shadow-2xl transition-all flex items-center justify-center gap-2 ${
                  isAllCheckedIn
                    ? 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
                    : selectedCount === 0
                    ? 'bg-neutral-800 text-neutral-400 border border-neutral-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 text-black hover:opacity-95 active:scale-[0.98] cursor-pointer shadow-orange-500/30'
                }`}
              >
                {checkingIn ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Checking In {selectedCount} Passes...
                  </>
                ) : isAllCheckedIn ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    All {totalPasses} Passes Already Checked In
                  </>
                ) : selectedCount === 0 ? (
                  'Select At Least 1 Pass Above'
                ) : selectedCount === remainingCount && remainingCount === totalPasses ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3]" />
                    CHECK IN ALL ({totalPasses} PASSES)
                  </>
                ) : (
                  <>
                    <UserCheck className="w-5 h-5 stroke-[2.5]" />
                    CHECK IN {selectedCount} OF {totalPasses} PASSES ({remainingCount - selectedCount} Coming Later)
                  </>
                )}
              </button>

              {feedbackMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {feedbackMessage}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
