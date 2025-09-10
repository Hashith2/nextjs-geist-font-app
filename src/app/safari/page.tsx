'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { TourList } from '@/components/SafariReservation/TourList';
import { ReservationForm } from '@/components/SafariReservation/ReservationForm';
import { ReservationSummary } from '@/components/SafariReservation/ReservationSummary';
import { ReservationConfirmation } from '@/components/SafariReservation/ReservationConfirmation';
import { SafariTour, Reservation } from '@/lib/reservations';

type ReservationStep = 'tour-selection' | 'reservation-form' | 'summary' | 'confirmation';

interface ReservationData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: Date;
  timeSlot: string;
  passengers: number;
  specialRequests?: string;
}

export default function SafariReservationPage() {
  const [currentStep, setCurrentStep] = useState<ReservationStep>('tour-selection');
  const [selectedTour, setSelectedTour] = useState<SafariTour | null>(null);
  const [reservationData, setReservationData] = useState<ReservationData | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTourSelect = (tour: SafariTour) => {
    setSelectedTour(tour);
    setCurrentStep('reservation-form');
    toast.success(`Selected ${tour.name}`);
  };

  const handleReservationSubmit = (data: ReservationData) => {
    setReservationData(data);
    setCurrentStep('summary');
    toast.success('Reservation details saved');
  };

  const handleConfirmReservation = async () => {
    if (!selectedTour || !reservationData) return;

    setLoading(true);
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tourId: selectedTour.id,
          customerName: reservationData.customerName,
          customerEmail: reservationData.customerEmail,
          customerPhone: reservationData.customerPhone,
          date: reservationData.date.toISOString().split('T')[0],
          timeSlot: reservationData.timeSlot,
          passengers: reservationData.passengers,
          specialRequests: reservationData.specialRequests,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create reservation');
      }

      const reservation = await response.json();
      setConfirmedReservation(reservation);
      setCurrentStep('confirmation');
      toast.success('Reservation confirmed successfully!');
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create reservation');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToTourSelection = () => {
    setCurrentStep('tour-selection');
    setSelectedTour(null);
    setReservationData(null);
  };

  const handleBackToForm = () => {
    setCurrentStep('reservation-form');
  };

  const handleNewReservation = () => {
    setCurrentStep('tour-selection');
    setSelectedTour(null);
    setReservationData(null);
    setConfirmedReservation(null);
    toast.success('Ready for a new reservation');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Safari Adventures</h1>
              <p className="text-muted-foreground">Book your ultimate wildlife experience</p>
            </div>
            
            {/* Progress Indicator */}
            <div className="hidden md:flex items-center space-x-2">
              {[
                { step: 'tour-selection', label: 'Select Tour' },
                { step: 'reservation-form', label: 'Details' },
                { step: 'summary', label: 'Review' },
                { step: 'confirmation', label: 'Confirmed' }
              ].map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === item.step 
                      ? 'bg-primary text-primary-foreground' 
                      : index < ['tour-selection', 'reservation-form', 'summary', 'confirmation'].indexOf(currentStep)
                        ? 'bg-green-500 text-white'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {index < ['tour-selection', 'reservation-form', 'summary', 'confirmation'].indexOf(currentStep) ? '✓' : index + 1}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep === item.step ? 'font-medium' : 'text-muted-foreground'
                  }`}>
                    {item.label}
                  </span>
                  {index < 3 && <div className="w-8 h-px bg-border mx-4"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {currentStep === 'tour-selection' && (
          <TourList 
            onSelectTour={handleTourSelect}
            selectedTourId={selectedTour?.id}
          />
        )}

        {currentStep === 'reservation-form' && selectedTour && (
          <ReservationForm
            selectedTour={selectedTour}
            onSubmit={handleReservationSubmit}
            onBack={handleBackToTourSelection}
            loading={loading}
          />
        )}

        {currentStep === 'summary' && selectedTour && reservationData && (
          <ReservationSummary
            tour={selectedTour}
            reservationData={reservationData}
            onConfirm={handleConfirmReservation}
            onBack={handleBackToForm}
            loading={loading}
          />
        )}

        {currentStep === 'confirmation' && confirmedReservation && selectedTour && (
          <ReservationConfirmation
            reservation={confirmedReservation}
            tour={selectedTour}
            onNewReservation={handleNewReservation}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Safari Adventures</h3>
              <p className="text-sm text-muted-foreground">
                Experience the wild like never before with our expertly guided safari tours.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@safariadventures.com</p>
                <p>Address: 123 Safari Lane, Wildlife Park</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Hours</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Monday - Friday: 6:00 AM - 8:00 PM</p>
                <p>Saturday - Sunday: 5:30 AM - 9:00 PM</p>
                <p>Tours available daily</p>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Safari Adventures. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
