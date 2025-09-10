'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Reservation, SafariTour } from '@/lib/reservations';
import { format } from 'date-fns';

interface ReservationConfirmationProps {
  reservation: Reservation;
  tour: SafariTour;
  onNewReservation: () => void;
}

export function ReservationConfirmation({ 
  reservation, 
  tour, 
  onNewReservation 
}: ReservationConfirmationProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Safari Reservation Confirmation',
      text: `My safari reservation is confirmed! ${tour.name} on ${format(new Date(reservation.date), 'PPP')} at ${reservation.timeSlot}. Reservation ID: ${reservation.id}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.text);
      alert('Reservation details copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">✓</span>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-green-700">
            Reservation Confirmed!
          </h2>
          <p className="text-muted-foreground mt-2">
            Your safari adventure is booked and ready to go
          </p>
        </div>
      </div>

      {/* Confirmation Details */}
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Booking Confirmation</CardTitle>
            <CardDescription>
              Please save this confirmation for your records
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Reservation ID */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Reservation ID</p>
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                <span className="font-mono text-lg font-semibold text-primary">
                  {reservation.id}
                </span>
              </div>
            </div>

            <Separator />

            {/* Tour Details */}
            <div>
              <h3 className="font-semibold text-lg mb-3">{tour.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {tour.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">
                      {format(new Date(reservation.date), 'EEEE, MMMM do, yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{reservation.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Passengers:</span>
                    <span className="font-medium">{reservation.passengers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Paid:</span>
                    <span className="font-medium">${reservation.totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="default" className="bg-green-500">
                      {reservation.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Customer Information */}
            <div>
              <h4 className="font-medium mb-3">Customer Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{reservation.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{reservation.customerEmail}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{reservation.customerPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booked on:</span>
                    <span className="font-medium">
                      {format(new Date(reservation.createdAt), 'MMM do, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {reservation.specialRequests && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Special Requests</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    {reservation.specialRequests}
                  </p>
                </div>
              </>
            )}

            <Separator />

            {/* What's Included */}
            <div>
              <h4 className="font-medium mb-3">What's Included</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {tour.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Important Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Important Information</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Please arrive 15 minutes before your scheduled time</li>
                <li>• Bring comfortable clothing and sun protection</li>
                <li>• Camera and binoculars are recommended</li>
                <li>• Cancellations must be made 24 hours in advance</li>
                <li>• A confirmation email has been sent to {reservation.customerEmail}</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button variant="outline" onClick={handlePrint}>
                Print Confirmation
              </Button>
              <Button variant="outline" onClick={handleShare}>
                Share Details
              </Button>
              <Button onClick={onNewReservation}>
                Book Another Safari
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Need help? Contact us at support@safariadventures.com or call (555) 123-4567</p>
      </div>
    </div>
  );
}
