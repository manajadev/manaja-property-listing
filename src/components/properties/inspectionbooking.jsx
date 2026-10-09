"use client";

import { useState } from 'react';
import BookingForm from './bookingform';
import BookingConfirmation from './bookingconfirmation';

export default function InspectionBooking({ 
  property, 
  onClose 
}) {
  const [step, setStep] = useState('form'); // form, confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedBooking, setCompletedBooking] = useState(null);
  const [error, setError] = useState('');

  // Reset to form view
  const resetBooking = () => {
    setStep('form');
    setError('');
    setCompletedBooking(null);
  };

  // Handle booking form submission
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setError('');

    try {
      // Format the datetime to ISO format
      const bookingData = {
        guest_name: formData.guest_name,
        guest_email: formData.guest_email,
        guest_phone: formData.guest_phone,
        preferred_visit_at: new Date(formData.preferred_visit_at).toISOString(),
        message: formData.message || ''
      };

      // Call the backend API
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'https://manaja-backend.onrender.com';
      const response = await fetch(
        `${API_BASE}/listings/${property.id}/bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail?.[0]?.msg || 'Failed to create booking');
      }

      const result = await response.json();
      setCompletedBooking(result);
      setStep('confirmation');
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Property Inspection</h2>
          <p className="text-sm text-muted-foreground">{property.name}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Step content */}
      {step === 'form' && (
        <div className="space-y-4">
          {/* Property info */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-sm">Property Details</h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Property:</span>
                <span>{property.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span>{property.property_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="text-right">{[property.house_number, property.address, property.state].filter(Boolean).join(', ')}</span>
              </div>
            </div>
          </div>

          <BookingForm
            onSubmit={handleFormSubmit}
            onCancel={resetBooking}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      {step === 'confirmation' && completedBooking && (
        <BookingConfirmation
          booking={completedBooking}
          onClose={onClose}
        />
      )}
    </div>
  );
}