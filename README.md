# GeoRaksha - Tourist Safety Companion

![GeoRaksha Splash Screen](https://i.imgur.com/8a8b8c8.png)

**GeoRaksha** is a progressive web application designed to be a personal safety companion for tourists. It provides real-time risk alerts, an emergency panic button, a secure digital ID, and an AI-powered assistant to ensure a worry-free journey.

The application is built as a single-page application (SPA) using modern frontend technologies, with a focus on user experience, offline functionality, and performance.

---

## ✨ Core Features

-   **🔐 Secure Onboarding & Authentication:** A simple and secure sign-up/login flow for users.
-   **🆔 Digital Tourist ID:** After onboarding, users can generate a digital ID card complete with their photo, personal details, and a unique QR code for easy verification by authorities. The ID card can also be downloaded for offline access.
-   **🆘 Emergency Panic Button:** A prominent panic button that, when activated, simulates sending an SOS signal with the user's live location to emergency services and pre-configured contacts.
-   **🔔 Real-time Alerts:** The app provides a notification system for important updates, such as geo-fence warnings for high-risk zones or itinerary confirmations.
-   **🗺️ Itinerary Management:** Users can view their travel itinerary on an interactive map and in a timeline format, providing a clear overview of their trip.
-   **🤖 AI Safety Assistant:** A chatbot powered by the **Google Gemini API** is available to provide instant, concise travel safety tips and answer user queries.
-   **⚙️ Customizable Settings:** Users can manage their profile, emergency contacts, custom helplines, and privacy settings like real-time location tracking.
-   **📱 Fully Responsive:** The UI is designed to be mobile-first and works seamlessly across a range of devices.

---

## 🚀 MVP Demonstration (Home Screen)

The main `Home` screen features a unique MVP demonstration with two switchable views:

1.  **Tourist View:** Simulates the tourist's mobile app interface. Here, the user can generate a "Secure Blockchain ID" and activate the `PANIC` button. An activity log shows real-time updates.
2.  **Authority View:** Simulates a monitoring dashboard used by safety authorities. It shows the tourist's location on a map in real-time, displays critical alerts (like a panic signal), and logs potential issues flagged by an "AI Anomaly Detection" system (e.g., prolonged inactivity or entering a high-risk geo-fenced zone).

This dual-view system effectively demonstrates the cause-and-effect relationship between the tourist's actions and the backend monitoring system.

---

## 🛠️ Tech Stack

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **AI Chatbot:** Google Gemini API (`@google/genai`)
-   **Routing:** `react-router-dom`
-   **State Management:** React Context API
-   **Location Services:** Browser Geolocation API

*Data is mocked or stored in `localStorage` for demonstration purposes. No backend server is required to run this prototype.*

---

## 🏃‍♂️ Getting Started

### Prerequisites

-   A modern web browser (Chrome, Firefox, Safari).
-   A **Google Gemini API Key**.

### How to Run

The application is designed to run directly in a browser-based development environment that can handle `index.html` and `.tsx` files.

1.  **Provide API Key:** The application requires a Google Gemini API key to power the AI Chatbot. This key must be available as an environment variable named `API_KEY`. The development environment should be configured to make this variable accessible to the application.
2.  **Load the Files:** Ensure all the project files (`index.html`, `index.tsx`, `App.tsx`, etc.) are loaded into your development environment.
3.  **Launch the App:** Open `index.html` in the live server provided by your environment. The application will start.

*Note: For camera functionality (to take a photo for the Digital ID), the application must be served over a secure context (HTTPS), which is standard in most modern web development tools.*
