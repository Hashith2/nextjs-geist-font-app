'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SafariTour } from '@/lib/reservations';

interface TourListProps {
  onSelectTour: (tour: SafariTour) => void;
  selectedTourId?: string;
}

export function TourList({ onSelectTour, selectedTourId }: TourListProps) {
  const [tours, setTours] = useState<SafariTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await fetch('/api/tours');
      if (!response.ok) {
        throw new Error('Failed to fetch tours');
      }
      const data = await response.json();
      setTours(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error loading tours: {error}</p>
        <Button onClick={fetchTours} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Choose Your Safari Adventure</h2>
        <p className="text-muted-foreground mt-2">
          Select from our carefully curated safari experiences
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {tours.map((tour) => (
          <Card 
            key={tour.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedTourId === tour.id 
                ? 'ring-2 ring-primary border-primary' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => onSelectTour(tour)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{tour.name}</CardTitle>
                  <CardDescription className="mt-2">
                    {tour.description}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="ml-2">
                  ${tour.price}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{tour.duration}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Max Passengers:</span>
                  <span className="font-medium">{tour.maxPassengers} people</span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Includes:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {tour.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                    {tour.features.length > 3 && (
                      <li className="text-xs">
                        +{tour.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Available Times:</p>
                  <div className="flex flex-wrap gap-1">
                    {tour.availableTimeSlots.map((time) => (
                      <Badge key={time} variant="outline" className="text-xs">
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  variant={selectedTourId === tour.id ? "default" : "outline"}
                >
                  {selectedTourId === tour.id ? 'Selected' : 'Select Tour'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
