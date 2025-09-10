'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SafariTour } from '@/lib/reservations';
import { format } from 'date-fns';

interface ReservationData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: Date;
  timeSlot: string;
  passengers: number;
  specialRequests?: string;
}

interface ReservationSummaryProps {
  tour: SafariTour;
  reservationData: ReservationData;
  onConfirm: () => void;
  onBack: () => void;
  loading?: boolean;
}

export function ReservationSummary({ 
  tour, 
  reservationData, 
  onConfirm, 
  onBack, 
  loading = false 
}: ReservationSummaryProps) {
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit' | 'paypal'>('credit');
  const [processingPayment, setProcessingPayment] = useState(false);

  const totalPrice = tour.price * reservationData.passengers;

  const handlePayment = async () => {
    setProcessingPayment(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate payment success (90% success rate)
    const paymentSuccess = Math.random() > 0.1;
    
    if (paymentSuccess) {
      onConfirm();
    } else {
      alert('Payment failed. Please try again.');
    }
    
    setProcessingPayment(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Review Your Reservation</h2>
        <p className="text-muted-foreground mt-2">
          Please review your details before confirming your booking
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Reservation Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reservation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tour Information */}
            <div>
              <h3 className="font-semibold text-lg mb-2">{tour.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {tour.description}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <p className="font-medium">{tour.duration}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Max Capacity:</span>
                  <p className="font-medium">{tour.maxPassengers} people</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Customer Information */}
            <div>
              <h4 className="font-medium mb-2">Customer Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{reservationData.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{reservationData.customerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{reservationData.customerPhone}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Booking Information */}
            <div>
              <h4 className="font-medium mb-2">Booking Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{format(reservationData.date, 'PPP')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{reservationData.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Passengers:</span>
                  <span className="font-medium">{reservationData.passengers}</span>
                </div>
              </div>
            </div>

            {reservationData.specialRequests && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Special Requests</h4>
                  <p className="text-sm text-muted-foreground">
                    {reservationData.specialRequests}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Payment Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Details</CardTitle>
            <CardDescription>
              Complete your payment to confirm your reservation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Price per person:</span>
                <span>${tour.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Number of passengers:</span>
                <span>{reservationData.passengers}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount:</span>
                <span>${totalPrice}</span>
              </div>
            </div>

            <Separator />

            {/* Mock Payment Method Selection */}
            <div>
              <h4 className="font-medium mb-3">Payment Method</h4>
              <div className="space-y-2">
                {[
                  { id: 'credit', label: 'Credit Card', desc: 'Visa, Mastercard, American Express' },
                  { id: 'debit', label: 'Debit Card', desc: 'Direct bank payment' },
                  { id: 'paypal', label: 'PayPal', desc: 'Pay with your PayPal account' }
                ].map((method) => (
                  <div
                    key={method.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === method.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setPaymentMethod(method.id as any)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{method.label}</p>
                        <p className="text-xs text-muted-foreground">{method.desc}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        paymentMethod === method.id 
                          ? 'border-primary bg-primary' 
                          : 'border-gray-300'
                      }`}>
                        {paymentMethod === method.id && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock Payment Form */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Card Number</label>
                  <div className="mt-1 p-2 border rounded text-sm bg-muted">
                    **** **** **** 1234
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Expiry</label>
                  <div className="mt-1 p-2 border rounded text-sm bg-muted">
                    12/25
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Cardholder Name</label>
                <div className="mt-1 p-2 border rounded text-sm bg-muted">
                  {reservationData.customerName}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                🔒 This is a demo payment system. No real payment will be processed.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handlePayment}
                className="w-full"
                disabled={processingPayment || loading}
              >
                {processingPayment ? 'Processing Payment...' : `Pay $${totalPrice}`}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={onBack}
                className="w-full"
                disabled={processingPayment || loading}
              >
                Back to Edit Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
