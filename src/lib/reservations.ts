export interface SafariTour {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  maxPassengers: number;
  features: string[];
  availableTimeSlots: string[];
}

export interface Reservation {
  id: string;
  tourId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  timeSlot: string;
  passengers: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: string;
  specialRequests?: string;
}

// Mock safari tour data
export const SAFARI_TOURS: SafariTour[] = [
  {
    id: 'classic-safari',
    name: 'Classic Safari Adventure',
    description: 'Experience the thrill of wildlife viewing in our comfortable 4x4 jeeps. Perfect for families and first-time safari goers.',
    duration: '3 hours',
    price: 150,
    maxPassengers: 6,
    features: [
      'Professional wildlife guide',
      'Complimentary refreshments',
      'Wildlife photography opportunities',
      'Safety equipment included'
    ],
    availableTimeSlots: ['06:00', '09:00', '14:00', '17:00']
  },
  {
    id: 'premium-safari',
    name: 'Premium Safari Experience',
    description: 'Luxury safari experience with exclusive access to premium wildlife areas and gourmet refreshments.',
    duration: '5 hours',
    price: 280,
    maxPassengers: 4,
    features: [
      'Expert naturalist guide',
      'Gourmet lunch included',
      'Premium binoculars provided',
      'Exclusive wildlife areas',
      'Professional photography service'
    ],
    availableTimeSlots: ['06:00', '11:00', '15:00']
  },
  {
    id: 'sunset-safari',
    name: 'Sunset Safari Special',
    description: 'Witness the magical African sunset while observing wildlife in their natural habitat.',
    duration: '4 hours',
    price: 200,
    maxPassengers: 6,
    features: [
      'Sunset viewing experience',
      'Evening wildlife activity',
      'Traditional refreshments',
      'Campfire storytelling'
    ],
    availableTimeSlots: ['15:30', '16:00']
  },
  {
    id: 'full-day-safari',
    name: 'Full Day Safari Expedition',
    description: 'Complete safari experience covering multiple wildlife zones with lunch and extensive game viewing.',
    duration: '8 hours',
    price: 450,
    maxPassengers: 6,
    features: [
      'Multiple wildlife zones',
      'Full meals included',
      'Extended game viewing',
      'Rest stops at scenic locations',
      'Comprehensive wildlife education'
    ],
    availableTimeSlots: ['06:00']
  }
];

// In-memory storage for reservations (in a real app, this would be a database)
let reservations: Reservation[] = [];

// Utility functions
export function generateReservationId(): string {
  return 'RES-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
}

export function getTourById(tourId: string): SafariTour | undefined {
  return SAFARI_TOURS.find(tour => tour.id === tourId);
}

export function getAllTours(): SafariTour[] {
  return SAFARI_TOURS;
}

export function createReservation(reservationData: Omit<Reservation, 'id' | 'createdAt' | 'status' | 'paymentStatus'>): Reservation {
  const reservation: Reservation = {
    ...reservationData,
    id: generateReservationId(),
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: new Date().toISOString()
  };
  
  reservations.push(reservation);
  return reservation;
}

export function getReservationById(id: string): Reservation | undefined {
  return reservations.find(reservation => reservation.id === id);
}

export function getAllReservations(): Reservation[] {
  return reservations;
}

export function updateReservationStatus(id: string, status: Reservation['status']): boolean {
  const reservation = reservations.find(r => r.id === id);
  if (reservation) {
    reservation.status = status;
    return true;
  }
  return false;
}

export function updatePaymentStatus(id: string, paymentStatus: Reservation['paymentStatus']): boolean {
  const reservation = reservations.find(r => r.id === id);
  if (reservation) {
    reservation.paymentStatus = paymentStatus;
    return true;
  }
  return false;
}

// Validation functions
export function validateReservationData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.tourId || !getTourById(data.tourId)) {
    errors.push('Invalid tour selection');
  }
  
  if (!data.customerName || data.customerName.trim().length < 2) {
    errors.push('Customer name must be at least 2 characters');
  }
  
  if (!data.customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customerEmail)) {
    errors.push('Valid email address is required');
  }
  
  if (!data.customerPhone || data.customerPhone.trim().length < 10) {
    errors.push('Valid phone number is required');
  }
  
  if (!data.date || new Date(data.date) <= new Date()) {
    errors.push('Reservation date must be in the future');
  }
  
  if (!data.timeSlot) {
    errors.push('Time slot selection is required');
  }
  
  if (!data.passengers || data.passengers < 1) {
    errors.push('At least 1 passenger is required');
  }
  
  const tour = getTourById(data.tourId);
  if (tour && data.passengers > tour.maxPassengers) {
    errors.push(`Maximum ${tour.maxPassengers} passengers allowed for this tour`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Check availability for a specific date and time slot
export function checkAvailability(tourId: string, date: string, timeSlot: string): boolean {
  // In a real system, this would check against actual bookings
  // For now, we'll simulate some basic availability logic
  const existingReservations = reservations.filter(
    r => r.tourId === tourId && 
         r.date === date && 
         r.timeSlot === timeSlot && 
         r.status !== 'cancelled'
  );
  
  const tour = getTourById(tourId);
  if (!tour) return false;
  
  // Simple availability check - allow up to 2 bookings per time slot
  return existingReservations.length < 2;
}
