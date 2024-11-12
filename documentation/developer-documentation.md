
# CSE 403 Project - InterConnect

Welcome to the developer documentation for **InterConnect**. This document provides instructions for setting up, building, testing, and maintaining the project.

---

## Table of Contents
- [How to Obtain the Source Code](#how-to-obtain-the-source-code)
- [Layout of the Directory Structure](#layout-of-the-directory-structure)
- [How to Build the Software](#how-to-build-the-software)
- [How to Test the Software](#how-to-test-the-software)
- [How to Add New Tests](#how-to-add-new-tests)
- [How to Build a Release of the Software](#how-to-build-a-release-of-the-software)

---

## How to Obtain the Source Code

To obtain the source code, you’ll need access to the project’s repository on GitHub:

1. Clone the repository using the following command:

   ```bash
   git clone https://github.com/yyu2022-uw/CSE-403.git
   ```

---

## Layout of the Directory Structure

 - `__test__`
 - `app/`: All source code regarding the app
   - `(home)/`: The home screen of the app (directed to the communities page)
     - `(tabs)/`: The tabs of each parts of the app (profile, matching, chat, community)
     - `channel/`: The chat channels
 - `assets/`: Images and fonts
 - `components/`: Small subsets of code that can be used throughout the app
   - `login/`: Setup for login and authentification
   - `navigation/`: TabbarIcon
   - `profile/`: UI and function for the profile page
 - `constants/`: Style constants like color, size, and spacing
 - `documentation/`: User and developer documentation
 - `lib/`: Supabase library
 - `hooks/`: Color themes
 - `providers/`: Fetching the current user data from Supabase and Stream


---

## How to Build the Software

1. In the terminal, type in the following commands:

   ```bash
   npm install
   npm start
   ```

---

## How to Test the Software
1. Test will run when pushing/merging to main

2. Or run the following command:

   ```bash
   npm test
   ```

---

## How to Add New Tests

1. Create a test file in the `__test__` folder and give it a descriptive name for the test suite.
2. Import the component, mock necessary dependencies, and write test cases using Jest.

---

## How to Build a Release of the Software

1. We are not going to build a release for the project. However, in the real world, we can either build for Android or iOS and publish to the app store.
