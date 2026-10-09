
"use client";

import { useState } from "react";

export default function BookingForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
  initialData = {},
}) {
  const [formData, setFormData] = useState({
    guest_name: initialData.guest_name || "",
    guest_email: initialData.guest_email || "",
    guest_phone: initialData.guest_phone || "",
    preferred_visit_at: initialData.preferred_visit_at || "",
    message: initialData.message || "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "guest_name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) {
          return "Name must be at least 2 characters";
        }
        return "";

      case "guest_phone": {
        if (!value.trim()) return "Phone number is required";

        const digits = value.replace(/\D/g, "");

        if (digits.length < 10 || digits.length > 15) {
          return "Please enter a valid phone number";
        }
        return "";
      }

      case "guest_email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address";
        }
        return "";

      case "preferred_visit_at":
        if (!value) return "Preferred visit date is required";

        if (new Date(value).getTime() <= Date.now()) {
          return "Please choose a future date and time";
        }
        return "";

      case "message":
        if (value.length > 500) {
          return "Message must be 500 characters or less";
        }
        return "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);

      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (touched[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const allTouched = Object.keys(formData).reduce((result, key) => {
      result[key] = true;
      return result;
    }, {});

    setTouched(allTouched);

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getInputClass = (name, extraClass = "") => {
    const hasError = Boolean(errors[name] && touched[name]);

    return [
      "w-full rounded-lg border bg-background px-3 py-2",
      "text-sm text-foreground placeholder:text-muted-foreground/60",
      "transition-colors duration-200",
      "focus:outline-none focus:ring-2 focus:ring-primary/15",
      "disabled:cursor-not-allowed disabled:opacity-60",
      hasError
        ? "border-destructive focus:border-destructive"
        : "border-border hover:border-primary/50 focus:border-primary",
      extraClass,
    ].join(" ");
  };

  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/80";

  const renderError = (name) => {
    if (!errors[name] || !touched[name]) return null;

    return (
      <p className="mt-1 text-xs text-destructive" role="alert">
        {errors[name]}
      </p>
    );
  };

  const minimumDate = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {/* Full name */}
      <div>
        <label htmlFor="guest_name" className={labelClass}>
          Full Name <span className="text-primary">*</span>
        </label>

        <input
          id="guest_name"
          name="guest_name"
          type="text"
          autoComplete="name"
          value={formData.guest_name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your full name"
          className={getInputClass("guest_name")}
          disabled={isSubmitting}
        />

        {renderError("guest_name")}
      </div>

      {/* Phone number */}
      <div>
        <label htmlFor="guest_phone" className={labelClass}>
          Phone Number <span className="text-primary">*</span>
        </label>

        <input
          id="guest_phone"
          name="guest_phone"
          type="tel"
          autoComplete="tel"
          value={formData.guest_phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="+234 XXX XXX XXXX"
          className={getInputClass("guest_phone")}
          disabled={isSubmitting}
        />

        {renderError("guest_phone")}
      </div>

      {/* Email address */}
      <div>
        <label htmlFor="guest_email" className={labelClass}>
          Email Address <span className="text-primary">*</span>
        </label>

        <input
          id="guest_email"
          name="guest_email"
          type="email"
          autoComplete="email"
          value={formData.guest_email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="you@example.com"
          className={getInputClass("guest_email")}
          disabled={isSubmitting}
        />

        {renderError("guest_email")}
      </div>

      {/* Visit date and time */}
      <div>
        <label htmlFor="preferred_visit_at" className={labelClass}>
          Preferred Visit Date &amp; Time{" "}
          <span className="text-primary">*</span>
        </label>

        <input
          id="preferred_visit_at"
          name="preferred_visit_at"
          type="datetime-local"
          value={formData.preferred_visit_at}
          onChange={handleChange}
          onBlur={handleBlur}
          min={minimumDate}
          className={getInputClass("preferred_visit_at")}
          disabled={isSubmitting}
        />

        {renderError("preferred_visit_at")}
      </div>

      {/* Optional message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Additional Message{" "}
          <span className="font-normal normal-case tracking-normal text-muted-foreground">
            (Optional)
          </span>
        </label>

        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Any specific requirements or questions?"
          rows={3}
          maxLength={500}
          className={getInputClass("message", "resize-none")}
          disabled={isSubmitting}
        />

        <div className="mt-1 flex items-center justify-between gap-2">
          <div>{renderError("message")}</div>

          <span className="ml-auto shrink-0 text-xs tabular-nums text-muted-foreground">
            {formData.message.length}/500
          </span>
        </div>
      </div>

      {/* Privacy note */}
      <div className="border-t border-border/70 pt-2.5">
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground/80">
            Your privacy matters.
          </span>{" "}
          Your contact details will be shared with the property manager for
          inspection scheduling. Fields marked{" "}
          <span className="text-primary">*</span> are required.
        </p>
      </div>

      {/* Form actions */}
      <div className="flex gap-3 pt-0.5">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:brightness-95 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Booking..." : "Book Inspection"}
        </button>
      </div>
    </form>
  );
}

