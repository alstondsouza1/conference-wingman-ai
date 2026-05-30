# ConferenceWingman

ConferenceWingman is an AI-powered networking assistant built for Cascadia AI Hackathon 2026. It helps students, job seekers, and conference attendees prepare for events by generating personalized networking field guides.

## Problem

Many people attend conferences, hackathons, career fairs, and networking events without a clear plan. They often struggle to:

* Decide which companies to visit
* Start meaningful conversations
* Ask relevant questions
* Keep track of advice and contacts
* Follow up after the event

## Solution

ConferenceWingman generates a personalized conference field guide based on a user's goals, skills, and event information.

The platform uses:

* **Apify** to research sponsors and event-related information
* **Box** to store generated guides and networking notes

The result is a practical guide that helps attendees make better connections and get more value from events.

## Features

* Multi-event support
* Personalized attendee profile
* Sponsor and company research
* Recommended booths to visit
* Custom conversation starters
* Event-specific networking questions
* 30-second introduction script
* LinkedIn follow-up template
* Download guide as a text file
* Save guide directly to Box

## Supported Events

* CascadiaJS
* Cascadia AI Hackathon
* Google I/O
* Microsoft Build
* Grace Hopper Celebration
* WiCyS Conference
* University Career Fairs
* Custom Events

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* Apify RAG Web Browser
* Box Content API

## Sponsor Technology Used

### Apify

Apify is used as the research layer. The application gathers sponsor and company information and transforms it into useful networking insights, talking points, and booth recommendations.

### Box

Box is used as the storage layer. Generated conference guides can be saved into Box and updated with recruiter notes, contacts, and follow-up actions after the event.

## Future Improvements

* LinkedIn integration
* Mobile application
* Voice networking practice mode
* QR code contact scanning
* Resume matching
* Shared networking workspaces

## How to Run Locally

```bash
npm install
npm run dev
```

Create a `.env.local` file:

```env
APIFY_TOKEN=your_apify_token
BOX_ACCESS_TOKEN=your_box_access_token
BOX_FOLDER_ID=your_box_folder_id
```

Open:

```text
http://localhost:3000
```

## Hackathon Submission

ConferenceWingman combines Apify for sponsor research and Box for guide storage to help attendees prepare for conferences and build meaningful professional connections.
