# ConferenceWingman

ConferenceWingman is a Cascadia AI Hackathon 2026 project that helps students and early-career developers prepare for tech conferences.

## Problem

Many students attend conferences but do not know which sponsor booths to visit, what questions to ask, or how to follow up after meeting people.

## Solution

ConferenceWingman creates a personal conference field guide. The app uses Apify to research sponsor context, generates booth priorities and conversation starters, then saves the guide into Box for follow-up notes.

## Features

- Attendee profile form
- Sponsor research using Apify
- Personalized booth recommendations
- Different openers and questions for each sponsor
- 30-second intro
- LinkedIn follow-up template
- Download guide as a text file
- Save guide directly to Box

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Apify RAG Web Browser
- Box API

## Sponsor Technology Used

### Apify

Apify is used as the research layer. The app calls the Apify RAG Web Browser actor to gather sponsor context from CascadiaJS sponsor pages.

### Box

Box is used as the storage layer. The final field guide is saved into a Box folder so the attendee can update it with notes, names, and follow-up tasks after each conversation.

## How to Run Locally

```bash
npm install
npm run dev