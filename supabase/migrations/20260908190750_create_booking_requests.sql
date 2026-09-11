/*
# Create booking requests for Augustine Pictures

1. New Tables
- `booking_requests`
- `id` (uuid, primary key): Unique booking request identifier.
- `full_name` (text): Client's name.
- `email` (text): Client's contact email.
- `phone` (text): Client's preferred phone or WhatsApp number.
- `event_type` (text): Type of occasion being photographed.
- `event_date` (date): Requested event date.
- `location` (text): Event venue or area.
- `package_name` (text): Selected photography package.
- `message` (text): Additional details from the client.
- `status` (text): Internal request status, defaulting to `new`.
- `created_at` (timestamptz): Time the request was submitted.

2. Security
- Row-level security is enabled on `booking_requests`.
- Anonymous and authenticated visitors may submit booking requests.
- Booking details are not publicly readable, editable, or deletable from the browser.

3. Important Notes
- This is a single-studio booking inbox without customer accounts.
- The browser only needs INSERT access; all other operations remain denied by default.
*/

CREATE TABLE IF NOT EXISTS public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  event_type text NOT NULL,
  event_date date NOT NULL,
  location text NOT NULL,
  package_name text NOT NULL,
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can submit booking requests" ON public.booking_requests;
CREATE POLICY "Public can submit booking requests"
  ON public.booking_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(full_name)) BETWEEN 2 AND 120
    AND length(trim(email)) BETWEEN 5 AND 254
    AND length(trim(phone)) BETWEEN 5 AND 40
    AND length(trim(event_type)) BETWEEN 2 AND 80
    AND length(trim(location)) BETWEEN 2 AND 160
    AND length(trim(package_name)) BETWEEN 2 AND 120
    AND length(message) <= 2000
    AND status = 'new'
  );
