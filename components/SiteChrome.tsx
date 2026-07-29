"use client";

import { useCallback, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { FloatingCta } from "@/components/FloatingCta";

/** Navbar + Footer + modal de reserva reutilizables en páginas fuera de "/". */
export function SiteChrome({
  children,
  initialServiceId,
}: {
  children: React.ReactNode;
  initialServiceId?: string;
}) {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = useCallback(() => setBookingOpen(true), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  return (
    <>
      <Navbar onBook={openBooking} />
      {children}
      <Footer />
      <BookingModal
        open={bookingOpen}
        onClose={closeBooking}
        initialServiceId={initialServiceId}
      />
      <FloatingCta onBook={openBooking} />
    </>
  );
}
