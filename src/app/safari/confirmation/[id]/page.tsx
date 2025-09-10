'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ReservationConfirmation } from '@/components/SafariReservation/ReservationConfirmation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Reservation, SafariTour } from '@/lib/reservations';
import Link from 'next/link';

export default function ConfirmationPage() {
  const params = useParams();
  const reservationId = params.id as string;
  
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [tour, setTour] = useState<SafariTour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (reservationId) {
      fetchReservationDetails();
    }
  }, [reservationId]);

  const fetchReservationDetails = async () => {
    try {
      // Fetch reservation details
      const reservationResponse = await fetch(`/api/reservations?id=${reservationId}`);
      if (!reservationResponse.ok) {
        throw new Error('Reservation not found');
      }
      const reservationData = await reservationResponse.json();
      setReservation(reservationData);

      // Fetch tour details
      const tourResponse = await fetch(`/api/tours?id=${reservationData.tourId}`);
      if (!tourResponse.ok) {
        throw new Error('Tour details not found');
      }
      const tourData = await tourResponse.json();
      setTour(tourData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNewReservation = () => {
    window.location.href = '/safari';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !reservation || !tour) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-red-600">
                  Reservation Not Found
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {error || 'The reservation you are looking for could not be found.'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Please check your reservation ID and try again, or contact our support team for assistance.
                </p>
                <div className="space-y-2">
                  <Link href="/safari">
                    <Button className="w-full">
                      Make a New Reservation
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={() => window.history.back()}>
                    Go Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Safari Adventures</h1>
              <p className="text-muted-foreground">Reservation Confirmation</p>
            </div>
            <Link href="/safari">
              <Button variant="outline">
                Book Another Safari
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <ReservationConfirmation
          reservation={reservation}
          tour={tour}
          onNewReservation={handleNewReservation}
        />
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
