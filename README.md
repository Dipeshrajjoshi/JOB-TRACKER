# Job Application Tracker

A simple and efficient job application tracking system built using HTML, CSS, and JavaScript.
The project helps track job applications without using a backend, while still supporting data persistence and editing.

---

## Features

* Track company name, role, role type, application status, date, and resume link
* Import CSV files and merge them with existing data
* Edit application status directly in the website
* Status color indicators for easy tracking
* Automatic data persistence using browser localStorage
* Export updated data as a CSV file
* Filter applications by role and status
* Frontend-only solution (no backend required)
* Compatible with GitHub Pages

---

## Architecture

This project follows a frontend-only architecture.

User interacts with the browser UI.
The frontend is built using HTML, CSS, and JavaScript.
All application data is stored in a JavaScript array during runtime.
Data is automatically saved in browser localStorage for persistence.
CSV files are used as portable data snapshots for import and export.

This approach avoids backend complexity while still providing reliability and portability.

---

## Data Flow

1. User adds or edits job applications through the UI
2. Data is stored in a JavaScript array
3. Changes are saved automatically in localStorage
4. CSV files can be imported and merged with existing data
5. Updated data can be exported as a CSV file

---

## Tech Stack

HTML
CSS
JavaScript
GitHub Codespaces
GitHub Pages

---

## Project Structure

index.html
style.css
script.js
README.md

---

## Getting Started

Clone the repository:

git clone [https://github.com/your-username/JOB-TRACKER.git](https://github.com/your-username/JOB-TRACKER.git)
cd JOB-TRACKER

Run locally:

Open index.html in a browser
or run using GitHub Codespaces

---

## Usage

Add job applications using the form
Import a CSV file if you have existing data
Edit status directly in the table
Filter applications by role or status
Export CSV to save updated data

---

## Author

Dipesh Raj Joshi
© 2026 All rights reserved

---

## License

This project is intended for personal use and learning purposes.
You may fork and modify it with attribution.

