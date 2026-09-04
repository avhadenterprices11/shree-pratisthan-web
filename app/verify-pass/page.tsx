'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Camera, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  Ticket, 
  ArrowLeft, 
  CameraOff, 
  Flashlight, 
  Loader2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

export default function VerifyPassIndexPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState<'camera' | 'manual'>('camera');
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isStartingCamera, setIsStartingCamera] = useState(false);
  const [torchOn, setTorchOn] = useState(false);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const readerElementId = 'qr-reader-container';

  // Cleanup scanner on unmount or tab switch
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Stop Camera Scanner
  async function stopCamera() {
    if (scannerRef.current) {
      try {
        if (scannerRef.current.isScanning) {
          await scannerRef.current.stop();
        }
        await scannerRef.current.clear();
      } catch (err) {
        console.warn('Error stopping scanner:', err);
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
    setIsStartingCamera(false);
  }

  // Start Camera Scanner
  async function startCamera() {
    setCameraError(null);
    setIsStartingCamera(true);

    try {
      // Ensure element exists in DOM
      await new Promise((resolve) => setTimeout(resolve, 150));

      const html5QrCode = new Html5Qrcode(readerElementId, {
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.EAN_13,
        ],
        verbose: false,
      });
      scannerRef.current = html5QrCode;

      const config = {
        fps: 15,
        qrbox: { width: 260, height: 260 },
        aspectRatio: 1.0,
      };

      await html5QrCode.start(
        { facingMode: 'environment' }, // Rear camera
        config,
        (decodedText) => {
          handleScanSuccess(decodedText);
        },
        () => {
          // Frame error (no QR detected yet) - silent
        }
      );

      setIsScanning(true);
    } catch (err: any) {
      console.error('Camera start error:', err);
      setCameraError(
        err.message || 'Unable to access camera. Please allow camera permissions in your browser.'
      );
    } finally {
      setIsStartingCamera(false);
    }
  }

  // Handle scanned text
  function handleScanSuccess(scannedText: string) {
    if (!scannedText) return;

    // Haptic feedback if available on mobile
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }

    stopCamera();

    const trimmed = scannedText.trim();

    // Check if it's a full verification URL (e.g. http://.../verify-pass/BK-XXXXXX)
    if (trimmed.includes('/verify-pass/')) {
      const parts = trimmed.split('/verify-pass/');
      const passCode = parts[1]?.split('?')[0]?.split('#')[0];
      if (passCode) {
        router.push(`/verify-pass/${passCode.toUpperCase()}`);
        return;
      }
    }

    // Check if it's a booking code or ticket code
    const cleanCode = trimmed.replace(/[^a-zA-Z0-9_-]/g, '').toUpperCase();
    if (cleanCode) {
      router.push(`/verify-pass/${cleanCode}`);
    }
  }

  // Manual Form Submit
  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return;
    router.push(`/verify-pass/${cleanCode}`);
  }

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-white flex flex-col justify-between px-4 py-6 selection:bg-orange-500 selection:text-black">
      {/* Header */}
      <header className="max-w-md mx-auto w-full flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          Gate Scanner
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-md mx-auto w-full my-auto py-6 space-y-6 text-center">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Gate Entry Scanner</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Scan attendee ticket pass QR code using your phone camera.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex p-1 rounded-2xl bg-neutral-900 border border-white/10">
          <button
            type="button"
            onClick={() => {
              setActiveTab('camera');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'camera'
                ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            Live Camera Scan
          </button>
          <button
            type="button"
            onClick={() => {
              stopCamera();
              setActiveTab('manual');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'manual'
                ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            Enter Code
          </button>
        </div>

        {/* TAB 1: Live Camera Scanner */}
        {activeTab === 'camera' && (
          <div className="space-y-4">
            {/* Viewfinder Container */}
            <div className="relative rounded-3xl overflow-hidden bg-black border-2 border-orange-500/30 shadow-2xl min-h-[300px] flex items-center justify-center">
              {/* HTML5 QR Code Mount Element */}
              <div 
                id={readerElementId} 
                className="w-full h-full overflow-hidden [&_video]:object-cover [&_video]:rounded-2xl" 
              />

              {/* Laser Animation Overlay when Active */}
              {isScanning && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                  <div className="w-64 h-64 border-2 border-orange-400/80 rounded-2xl relative shadow-[0_0_30px_rgba(255,119,0,0.3)]">
                    {/* Corners */}
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-orange-500 rounded-tl-lg" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-orange-500 rounded-tr-lg" />
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-orange-500 rounded-bl-lg" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-orange-500 rounded-br-lg" />

                    {/* Laser scanning bar */}
                    <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_15px_#ff7700] animate-pulse top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              )}

              {/* Idle State / Placeholder */}
              {!isScanning && !isStartingCamera && (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <Camera className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Camera Ready</div>
                    <div className="text-xs text-neutral-400 mt-1">Tap below to activate camera scanner</div>
                  </div>
                </div>
              )}

              {/* Loading Spinner */}
              {isStartingCamera && (
                <div className="p-8 text-center space-y-3">
                  <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto" />
                  <div className="text-xs text-neutral-300 font-medium">Starting phone camera...</div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {cameraError && (
              <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 flex items-start gap-2 text-left">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Camera Access Error</div>
                  <div className="text-red-300/80 mt-0.5">{cameraError}</div>
                </div>
              </div>
            )}

            {/* Camera Control Buttons */}
            <div>
              {!isScanning ? (
                <button
                  type="button"
                  onClick={startCamera}
                  disabled={isStartingCamera}
                  className="w-full py-4 px-6 rounded-2xl font-black text-base bg-gradient-to-r from-orange-500 to-amber-500 text-black hover:opacity-95 shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isStartingCamera ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Opening Camera...
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5" />
                      START CAMERA SCANNER
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopCamera}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-neutral-800 border border-white/10 text-neutral-200 hover:bg-neutral-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CameraOff className="w-4 h-4" />
                  Stop Camera Scanner
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Manual Code Input */}
        {activeTab === 'manual' && (
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. BK-RELNKA2H"
                className="w-full px-5 py-4 rounded-2xl bg-neutral-900/90 border-2 border-white/10 focus:border-orange-500 focus:outline-none text-center text-lg font-mono font-bold tracking-widest text-white placeholder:text-neutral-600 transition-all uppercase shadow-inner"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={!code.trim()}
              className="w-full py-4 px-6 rounded-2xl font-black text-base bg-gradient-to-r from-orange-500 to-amber-500 text-black hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Verify & Check In
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        {/* Instructions */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-left text-xs text-neutral-400 space-y-2">
          <div className="font-bold text-neutral-300 flex items-center gap-1.5">
            <Ticket className="w-4 h-4 text-orange-400" />
            Gate Scanner Features:
          </div>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-neutral-400 leading-relaxed">
            <li>Point phone camera directly at the QR code on attendee&apos;s digital pass or printed ticket.</li>
            <li>Instantly displays total quantity of passes (e.g. 5 passes booked).</li>
            <li>One-tap check-in with live attendance logging.</li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-[11px] text-neutral-600">
        Shri Pratisthan • Official Event Gate Management
      </footer>
    </div>
  );
}
