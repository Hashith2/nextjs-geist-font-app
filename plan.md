```markdown
# Detailed Plan for Safari Jeep Reservation System

This plan outlines the step-by-step implementation of a full-featured Safari Jeep Reservation System within the existing Next.js 15+ TypeScript project. The system will be self-contained, using mock payment processing, local JSON file storage, and simulated notifications without external API dependencies.

---

## 1. Data Layer

### Files:
- `src/lib/reservations.ts` (new)
- `src/lib/utils.ts` (update if needed)

### Changes:
- Create a new module to handle reservation data storage and retrieval using local JSON files or in-memory storage (depending on environment constraints).
- Implement CRUD operations: create reservation, list reservations, get reservation details.
- Include validation and error handling for data integrity.
- Utility functions for date/time formatting and validation can be added or reused from `utils.ts`.

---

## 2. API Routes

### Files:
- `src/app/api/reservations/route.ts` (new)
- `src/app/api/tours/route.ts` (new)

### Changes:
- Create RESTful API endpoints for:
  - Fetching available safari jeep tours/packages.
  - Creating a new reservation.
  - Fetching reservation details by ID.
- Implement server-side validation and error handling.
- Use the data layer (`reservations.ts`) for persistence.
- Return appropriate HTTP status codes and JSON responses.

---

## 3. UI Components

### Files:
- `src/components/SafariReservation/`
  - `TourList.tsx` (new)
  - `ReservationForm.tsx` (new)
  - `ReservationSummary.tsx` (new)
  - `ReservationConfirmation.tsx` (new)
- `src/components/ui/` (reuse existing UI components like Button, Input, Select, Calendar, etc.)

### Changes:
- **TourList.tsx**: Display a list of available safari jeep tours with details (name, description, price, duration).
- **ReservationForm.tsx**: Form for users to select tour, date, time, number of passengers, and enter personal details (name, email, phone).
  - Use `react-hook-form` for form management and validation.
  - Include date picker and select inputs styled with Tailwind CSS and existing UI components.
- **ReservationSummary.tsx**: Show a summary of the reservation before submission, including calculated total price.
- **ReservationConfirmation.tsx**: Display confirmation message with reservation details and unique booking ID after successful submission.

### UI/UX Considerations:
- Clean, modern layout with clear typography and spacing.
- Responsive design for mobile and desktop.
- Use color and spacing to guide user flow.
- No external icons or images; use typography and layout for visual hierarchy.
- Provide inline validation feedback and toast notifications (using Sonner) for success/error messages.

---

## 4. Pages / Routes

### Files:
- `src/app/safari/`
  - `page.tsx` (new) — Main Safari Jeep Reservation page
  - `confirmation/[id]/page.tsx` (new) — Reservation confirmation page by booking ID

### Changes:
- **Main page**: Integrate `TourList` and `ReservationForm` components.
- Handle state transitions between tour selection, form filling, and summary.
- On successful reservation, redirect to confirmation page.
- **Confirmation page**: Fetch reservation details by ID and display confirmation.

---

## 5. Mock Payment Processing

### Implementation:
- Integrate a mock payment step in the reservation form.
- Simulate payment success/failure with a toggle or delay.
- No real payment gateway integration.
- Show appropriate UI feedback for payment status.

---

## 6. Notifications

### Implementation:
- Use Sonner toast notifications for:
  - Form submission success/failure.
  - Payment simulation results.
- Simulate email confirmation by logging reservation details to the console.

---

## 7. Error Handling & Validation

- Validate all user inputs on client and server.
- Handle API errors gracefully with user-friendly messages.
- Prevent double bookings for the same date/time slot.
- Ensure date/time selections are valid and in the future.

---

## 8. Styling & Theming

- Use Tailwind CSS with existing custom variables for consistent theming.
- Support dark and light modes as per existing app setup.
- Maintain accessibility standards using Radix UI primitives and semantic HTML.

---

## 9. Testing

- Add Jest + React Testing Library tests for:
  - Form validation and interaction.
  - API route handlers.
  - UI component rendering and responsiveness.

---

## 10. Documentation

- Update `README.md` with instructions on using the Safari Jeep Reservation System.
- Document API endpoints and data formats.
- Provide usage notes for developers.

---

# Summary

- Created a new data layer for local JSON-based reservation storage.
- Added REST API routes for tours and reservations with validation.
- Developed modern, responsive UI components for tour listing, reservation form, summary, and confirmation.
- Implemented mock payment processing and simulated notifications.
- Ensured robust error handling and input validation on client and server.
- Leveraged existing UI components, Tailwind CSS, and Radix UI for styling and accessibility.
- Added testing scaffolding for key components and APIs.
- Updated documentation for developer and user guidance.

This plan ensures a fully functional, self-contained Safari Jeep Reservation System integrated into the existing Next.js TypeScript project without external API dependencies.
