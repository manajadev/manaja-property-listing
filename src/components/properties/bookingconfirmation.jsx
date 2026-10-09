"use client";

export default function BookingConfirmation({ 
  booking, 
  onClose 
}) {
  if (!booking) return null;

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Success header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600 dark:text-green-400"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Booking Request Submitted!</h3>
        <p className="text-muted-foreground">
          Your inspection request has been submitted successfully.
        </p>
      </div>

      {/* Booking details */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
        <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
          Booking Details
        </h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Booking ID:</span>
            <span className="font-mono text-xs">{booking.id}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Property:</span>
            <span className="font-medium">{booking.property?.name || 'N/A'}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Preferred Visit:</span>
            <span>{formatDate(booking.preferred_visit_at)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time:</span>
            <span>{formatTime(booking.preferred_visit_at)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <span className="capitalize">{booking.status}</span>
          </div>
        </div>
      </div>

      {/* Your information */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
        <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
          Your Information
        </h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name:</span>
            <span>{booking.guest_name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Phone:</span>
            <span>{booking.guest_phone}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="break-all">{booking.guest_email}</span>
          </div>
          
          {booking.message && (
            <div className="pt-2 border-t border-border">
              <span className="text-muted-foreground block mb-1">Message:</span>
              <span className="text-sm">{booking.message}</span>
            </div>
          )}
        </div>
      </div>

      {/* Important information */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-2">
        <h4 className="font-medium text-sm flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Important Information
        </h4>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• Your booking request is currently pending confirmation</li>
          <li>• The property manager will contact you to confirm the visit</li>
          <li>• Please arrive 10 minutes before your scheduled time</li>
          <li>• Kindly verify property details before making any payment</li>
        </ul>
      </div>

      {/* Action button */}
      <button
        onClick={onClose}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
      >
        Close
      </button>
    </div>
  );
}