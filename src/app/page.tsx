import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-amber-50 dark:from-green-950 dark:to-amber-950">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Safari Adventures
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Experience the thrill of wildlife viewing in our comfortable 4x4 jeeps. 
              Book your ultimate safari adventure today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/safari">
                <Button size="lg" className="text-lg px-8 py-6">
                  Book Your Safari Now
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Safari Adventures?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide unforgettable wildlife experiences with safety, comfort, and expert guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Guides',
                description: 'Our professional wildlife guides have years of experience and deep knowledge of local ecosystems.',
                features: ['Certified naturalists', 'Local wildlife experts', 'Safety trained professionals']
              },
              {
                title: 'Comfortable Vehicles',
                description: 'Modern 4x4 jeeps equipped with all safety features and designed for optimal wildlife viewing.',
                features: ['Air-conditioned cabins', 'Elevated seating', 'Safety equipment included']
              },
              {
                title: 'Flexible Packages',
                description: 'Choose from various tour packages designed to fit different schedules and preferences.',
                features: ['Multiple time slots', 'Group size options', 'Custom experiences available']
              }
            ].map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Highlights */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Popular Safari Packages
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From quick adventures to full-day expeditions, we have the perfect safari for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Classic Safari',
                duration: '3 hours',
                price: 150,
                popular: false
              },
              {
                name: 'Premium Experience',
                duration: '5 hours',
                price: 280,
                popular: true
              },
              {
                name: 'Sunset Special',
                duration: '4 hours',
                price: 200,
                popular: false
              },
              {
                name: 'Full Day Expedition',
                duration: '8 hours',
                price: 450,
                popular: false
              }
            ].map((tour, index) => (
              <Card key={index} className="relative">
                {tour.popular && (
                  <Badge className="absolute -top-2 left-4 z-10">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{tour.name}</CardTitle>
                  <CardDescription>{tour.duration}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold mb-4">
                    ${tour.price}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    per person
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/safari">
              <Button size="lg">
                View All Packages & Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Booking your safari adventure is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Choose Your Tour',
                description: 'Browse our safari packages and select the one that fits your schedule and preferences.'
              },
              {
                step: '2',
                title: 'Fill Details',
                description: 'Provide your information, select date and time, and specify the number of passengers.'
              },
              {
                step: '3',
                title: 'Review & Pay',
                description: 'Review your booking details and complete the secure payment process.'
              },
              {
                step: '4',
                title: 'Enjoy Safari',
                description: 'Arrive at the meeting point and embark on your unforgettable wildlife adventure!'
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready for Your Safari Adventure?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have experienced the magic of wildlife with Safari Adventures. 
            Book your tour today and create memories that will last a lifetime.
          </p>
          <Link href="/safari">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Start Booking Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4">Safari Adventures</h3>
              <p className="text-muted-foreground mb-4">
                Experience the wild like never before with our expertly guided safari tours. 
                We are committed to providing safe, educational, and unforgettable wildlife experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact Info</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@safariadventures.com</p>
                <p>Address: 123 Safari Lane, Wildlife Park</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Operating Hours</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Monday - Friday: 6:00 AM - 8:00 PM</p>
                <p>Saturday - Sunday: 5:30 AM - 9:00 PM</p>
                <p>Tours available daily</p>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Safari Adventures. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
