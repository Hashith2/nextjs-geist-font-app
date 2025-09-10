'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { SafariTour } from '@/lib/reservations';
import { format } from 'date-fns';

interface ReservationFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: Date;
  timeSlot: string;
  passengers: number;
  specialRequests?: string;
}

interface ReservationFormProps {
  selectedTour: SafariTour;
  onSubmit: (data: ReservationFormData) => void;
  onBack: () => void;
  loading?: boolean;
}

export function ReservationForm({ selectedTour, onSubmit, onBack, loading = false }: ReservationFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [passengers, setPassengers] = useState<number>(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<ReservationFormData>();

  const watchedPassengers = watch('passengers', 1);
  const totalPrice = selectedTour.price * (watchedPassengers || 1);

  const onFormSubmit = (data: Omit<ReservationFormData, 'date' | 'timeSlot' | 'passengers'>) => {
    if (!selectedDate || !selectedTimeSlot) {
      return;
    }

    onSubmit({
      ...data,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      passengers: watchedPassengers || 1
    });
  };

  const isFormValid = selectedDate && selectedTimeSlot && watchedPassengers > 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Complete Your Reservation</h2>
        <p className="text-muted-foreground mt-2">
          Fill in your details to book your safari adventure
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Selected Tour Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Selected Tour</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{selectedTour.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedTour.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Duration:</span>
                <p className="font-medium">{selectedTour.duration}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Price per person:</span>
                <p className="font-medium">${selectedTour.price}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Includes:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {selectedTour.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Button variant="outline" onClick={onBack} className="w-full">
              Change Tour
            </Button>
          </CardContent>
        </Card>

        {/* Reservation Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reservation Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="font-medium">Personal Information</h4>
                
                <div>
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    {...register('customerName', { 
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    placeholder="Enter your full name"
                  />
                  {errors.customerName && (
                    <p className="text-sm text-red-600 mt-1">{errors.customerName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="customerEmail">Email Address *</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    {...register('customerEmail', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    placeholder="Enter your email"
                  />
                  {errors.customerEmail && (
                    <p className="text-sm text-red-600 mt-1">{errors.customerEmail.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="customerPhone">Phone Number *</Label>
                  <Input
                    id="customerPhone"
                    {...register('customerPhone', { 
                      required: 'Phone number is required',
                      minLength: { value: 10, message: 'Phone number must be at least 10 digits' }
                    })}
                    placeholder="Enter your phone number"
                  />
                  {errors.customerPhone && (
                    <p className="text-sm text-red-600 mt-1">{errors.customerPhone.message}</p>
                  )}
                </div>
              </div>

              {/* Date and Time Selection */}
              <div className="space-y-4">
                <h4 className="font-medium">Date & Time</h4>
                
                <div>
                  <Label>Select Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Time Slot *</Label>
                  <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedTour.availableTimeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="passengers">Number of Passengers *</Label>
                  <Select 
                    value={watchedPassengers?.toString() || '1'} 
                    onValueChange={(value) => {
                      const num = parseInt(value);
                      setPassengers(num);
                      setValue('passengers', num);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: selectedTour.maxPassengers }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'passenger' : 'passengers'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum {selectedTour.maxPassengers} passengers for this tour
                  </p>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                <Textarea
                  id="specialRequests"
                  {...register('specialRequests')}
                  placeholder="Any special requirements or requests..."
                  rows={3}
                />
              </div>

              {/* Price Summary */}
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Price per person:</span>
                  <span>${selectedTour.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Passengers:</span>
                  <span>{watchedPassengers || 1}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={!isFormValid || loading}
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
