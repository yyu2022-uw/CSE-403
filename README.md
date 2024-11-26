# README - InterConnect

Welcome to the README.md file for **InterConnect**. This document provides an overview of the app and how to run and test the app.

---

## Table of Contents
- [Overview](#overview)
- [Operational Use Cases](#operational-use-cases)
- [Getting started](#getting-started)
- [Connecting to the backend](#connecting-to-the-backend)
- [Testing](#testing)
- [Documentation](#documentation)

---

## Overview
This project is a Model-View-View mobile application designed to connect mentors with mentees. It consists of the following major components:

**UI Component**: These are the visual elements users interact with to trigger actions.

**Container**: Serves as a data manager and handler for UI components.

**Action**: Manipulate information on screen or interact with backend data.

**State**: Manages the application's current data, such as active page and variable values.

---

## Operational Use Cases
1. User Login and Profile Retrieval
2. One-on-One chats
3. Mentor matching
4. Posting on the communities page

## Getting started
1. Download Node.js v20.18.0

2. Install Expo Go

   ```bash
   https://expo.dev/go
   ```

   You'll find the following options to open the app in:
  
   - [development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

3. Clone the InterConnect repository

   ```bash
   git clone https://github.com/yyu2022-uw/CSE-403.git
   ```

4. Install dependencies

   ```bash
   npm install
   ```

5. Start the app

   ```bash
    npm start
   ```

6. Follow the instructions in the terminal to preview the app in Expo Go

---

## Connecting to the backend

To connect to our database (Supabase) and chat interface (Stream), you will need to create a .env file in the top-level directory with the following content:

```bash
EXPO_PUBLIC_SUPABASE_URL = https://hvuqzviniaxmecwzniuu.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2dXF6dmluaWF4bWVjd3puaXV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0MjA3NTQsImV4cCI6MjA0Mzk5Njc1NH0.8FRDPREM1CzaukaCHnQQr-D6_BLtMwKi0HKhphM0x7w
EXPO_PUBLIC_STREAM_API_KEY=kcg53pa793bv
```

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

---

## Testing

1. Test the app using the following command

   ```bash
   npm test
   ```

---

## Documentation

Navigate to the Wiki tab in GitHub to view developer documentation and user documentation: https://github.com/yyu2022-uw/CSE-403/wiki
