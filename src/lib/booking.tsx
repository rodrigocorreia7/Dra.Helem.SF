import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Audience } from './site';

type BookingState = {
  open: boolean;
  audience: Audience;
  openBooking: (audience?: Audience) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingState>({
  open: false,
  audience: 'nao_informado',
  openBooking: () => {},
  closeBooking: () => {},
});

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [audience, setAudience] = useState<Audience>('nao_informado');

  const openBooking = (a: Audience = 'nao_informado') => {
    setAudience(a);
    setOpen(true);
  };
  const closeBooking = () => setOpen(false);

  return (
    <BookingContext.Provider value={{ open, audience, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
