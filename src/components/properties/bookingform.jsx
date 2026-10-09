"use client";

import { useState } from 'react';

export default function BookingForm({ 
  onSubmit, 
  onCancel, 
  isSubmitting = false,
  initialData = {} 
}) {
  const [formData, setFormData] = useState({
    guest_name: initialData.guest_name || '',
    guest_email: initialData.guest_email || '',
    guest_phone: initialData.guest_phone || '',
    preferred_visit_at: initialData.preferred_visit_at || '',
    message: initialData.message || ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validate individual field
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'guest_name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'guest_phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^\+?[\d\s-]{10,}$/.test(value.replace(/\s/g, ''))) {
          error = 'Please enter a valid phone number';
        }
        break;
      case 'guest_email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'preferred_visit_at':
        if (!value) {
          error = 'Preferred visit date is required';
        } else {
          const visitDate = new Date(value);
          const now = new Date();
          if (visitDate < now) {
            error = 'Preferred visit date must be in the future';
          }
        }
        break;
      case 'message':
        if (value.length > 500) {
          error = 'Message must be less than 500 characters';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle input blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="guest_name" className="block text-sm font-semibold mb-2 text-foreground">
          Full Name
        </label>
        <input
          type="text"
          id="guest_name"
          name="guest_name"
          value={formData.guest_name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your full name"
          className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
            errors.guest_name && touched.guest_name 
              ? 'border-destructive ring-2 ring-destructive' 
              : 'border-border'
          }`}
          disabled={isSubmitting}
        />
        {errors.guest_name && touched.guest_name && (
          <p className="text-sm text-destructive mt-1.5">{errors.guest_name}</p>
        )}
      </div>

      <div>
        <label htmlFor="guest_phone" className="block text-sm font-semibold mb-2 text-foreground">
          Phone Number
        </label>
        <input
          type="tel"
          id="guest_phone"
          name="guest_phone"
          value={formData.guest_phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="+234 XXX XXX XXXX"
          className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
            errors.guest_phone && touched.guest_phone 
              ? 'border-destructive ring-2 ring-destructive' 
              : 'border-border'
          }`}
          disabled={isSubmitting}
        />
        {errors.guest_phone && touched.guest_phone && (
          <p className="text-sm text-destructive mt-1.5">{errors.guest_phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="guest_email" className="block text-sm font-semibold mb-2 text-foreground">
          Email Address
        </label>
        <input
          type="email"
          id="guest_email"
          name="guest_email"
          value={formData.guest_email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="your.email@example.com"
          className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
            errors.guest_email && touched.guest_email 
              ? 'border-destructive ring-2 ring-destructive' 
              : 'border-border'
          }`}
          disabled={isSubmitting}
        />
        {errors.guest_email && touched.guest_email && (
          <p className="text-sm text-destructive mt-1.5">{errors.guest_email}</p>
        )}
      </div>

      <div>
        <label htmlFor="preferred_visit_at" className="block text-sm font-semibold mb-2 text-foreground">
          Preferred Visit Date & Time
        </label>
        <input
          type="datetime-local"
          id="preferred_visit_at"
          name="preferred_visit_at"
          value={formData.preferred_visit_at}
          onChange={handleChange}
          onBlur={handleBlur}
          min={new Date().toISOString().slice(0, 16)}
          className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
            errors.preferred_visit_at && touched.preferred_visit_at 
              ? 'border-destructive ring-2 ring-destructive' 
              : 'border-border'
          }`}
          disabled={isSubmitting}
        />
        {errors.preferred_visit_at && touched.preferred_visit_at && (
          <p className="text-sm text-destructive mt-1.5">{errors.preferred_visit_at}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-2 text-foreground">
          Additional Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Any specific requirements or questions..."
          rows={4}
          maxLength={500}
          className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none ${
            errors.message && touched.message 
              ? 'border-destructive ring-2 ring-destructive' 
              : 'border-border'
          }`}
          disabled={isSubmitting}
        />
        <div className="flex justify-between mt-1.5">
          {errors.message && touched.message && (
            <p className="text-sm text-destructive">{errors.message}</p>
          )}
          <p className="text-xs text-muted-foreground ml-auto">
            {formData.message.length}/500
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 border-2 border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-medium"
        >
          {isSubmitting ? 'Booking...' : 'Book Inspection'}
        </button>
      </div>
    </form>
  );
}