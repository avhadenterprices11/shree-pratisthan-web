import { z } from "zod";

/**
 * Security & Input Sanitization Helper
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .trim();
}

/**
 * Type-Safe Zod Validation Schemas
 */

export const volunteerSchema = z.object({
  name: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Full name must be at least 2 characters.").max(100)),
  email: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().email("Please enter a valid email address.")),
  phone: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(7, "Please enter a valid phone number.")),
  location: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Please enter your district or city.")),
  age: z.coerce
    .number()
    .min(16, "Age must be between 16 and 100.")
    .max(100, "Age must be between 16 and 100."),
  track: z.enum(["event-logistics", "medical-camps", "tree-plantation", "relief-work"], {
    message: "Please select a valid volunteer track.",
  }),
  availability: z.enum(["weekends", "weekdays", "both"], {
    message: "Please select a valid availability option.",
  }),
  message: z.string().transform(sanitizeInput).optional(),
});

export const contactSchema = z.object({
  name: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Full name must be at least 2 characters.").max(100)),
  email: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().email("Please enter a valid email address.")),
  phone: z.string().transform(sanitizeInput).optional(),
  subject: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Subject must be at least 2 characters.").max(200)),
  message: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(10, "Message must be at least 10 characters.").max(5000)),
});

export const communitySchema = z.object({
  name: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Full name must be at least 2 characters.")),
  contact: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(5, "Please enter a valid phone number or email address.")),
  interest: z.enum(["blood-donation", "tree-plantation", "charity-work", "all"], {
    message: "Please select a valid area of interest.",
  }),
  message: z.string().transform(sanitizeInput).optional(),
});

export const eventBookingSchema = z.object({
  // Step 1: Personal Information
  fullName: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Full name must be at least 2 characters.").max(100)),
  profilePhoto: z.string().optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required."),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"], {
    message: "Please select a valid gender option.",
  }),
  mobileNumber: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(10, "Please enter a valid 10-digit mobile number.").max(15)),
  alternateMobile: z
    .string()
    .transform(sanitizeInput)
    .optional(),
  email: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().email("Please enter a valid email address.")),
  occupation: z.string().transform(sanitizeInput).optional(),

  // Step 2: Address Details
  houseNumber: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(1, "House / Flat number is required.")),
  streetArea: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Street / Area is required.")),
  landmark: z.string().transform(sanitizeInput).optional(),
  city: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "City is required.")),
  district: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "District is required.")),
  state: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "State is required.")),
  pinCode: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(6, "Please enter a valid 6-digit PIN code.").max(8)),
  googleMapUrl: z.string().transform(sanitizeInput).optional(),

  // Step 3: Event Participation & Emergency Contact
  eventId: z.string().min(1, "Please select an event."),
  participationCategory: z.enum(["general-attendee", "vip-guest", "cultural-performer", "dhol-tasha-player", "volunteer-participant"], {
    message: "Please select a valid category.",
  }),
  numberOfParticipants: z.coerce.number().min(1, "At least 1 participant is required.").max(20, "Maximum 20 participants per booking."),
  preferredTimeSlot: z.string().min(1, "Please select a time slot."),
  volunteerInterest: z.boolean().default(false),
  specialRequirements: z.string().transform(sanitizeInput).optional(),
  additionalNotes: z.string().transform(sanitizeInput).optional(),

  // Emergency Contact
  emergencyContactName: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Emergency contact name is required.")),
  emergencyRelationship: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Relationship is required.")),
  emergencyMobile: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(10, "Valid emergency mobile number is required.")),
  emergencyAltMobile: z.string().transform(sanitizeInput).optional(),

  // Step 4: Terms & Consent
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and rules to register.",
  }),
  mediaConsent: z.boolean().default(true),

  // Step 5: Payment / Contribution Options
  contributionAmount: z.coerce.number().min(0, "Amount cannot be negative.").default(0),
  paymentMethod: z.enum(["free", "upi", "card", "netbanking", "offline"], {
    message: "Please select a payment method.",
  }).default("free"),

  // Ticketing & Addons fields
  ticketId: z.number().optional(),
  ticketName: z.string().optional(),
  ticketPrice: z.number().optional(),
  promoCode: z.string().optional(),
  selectedAddons: z.record(z.string(), z.number()).optional(),
});

export type VolunteerInput = z.infer<typeof volunteerSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type CommunityInput = z.infer<typeof communitySchema>;
export type EventBookingInput = z.infer<typeof eventBookingSchema>;

