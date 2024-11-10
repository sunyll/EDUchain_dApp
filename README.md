
# OpenCampus DApp Platform

This project is a collection of decentralized applications (DApps) that utilize OpenCampus credentials to showcase user skills and job applications. The project includes three primary applications:

- **Home Page**: The main entry point for navigating between the different DApps.
- **Job Listings DApp**: A platform that allows users to log in via OCID, view job listings, and apply for jobs.
- **Achievement Filtering System**: A filter-based interface that sorts a mock OC credentials JSON file based on user-selected criteria.

---

## Project Setup

To set up and run this project locally, follow these steps:

### Prerequisites
- Ensure Node.js and npm are installed on your machine.
- Install all required dependencies using npm.

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project-directory
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Access the project by opening `http://localhost:3000` in your web browser.

---

## Project Structure

### 1. Home Page
The home page displays a set of cards representing each DApp, allowing users to navigate to individual applications. Each card contains a title and description of the DApp, making it easy to explore available tools.

**DApp Descriptions**:
- **Filtering System**: A DApp that filters OC credentials based on various user inputs.
- **Job Listings**: A simple job platform that enables OCID login, allowing users to apply for listed jobs.

---

### 2. Job Listings DApp

The **Job Listings DApp** allows users to authenticate with OCID, view job opportunities, and apply for positions. The DApp is designed to showcase a personalized experience by greeting the user by their OCID-based username.

**Features**:
- **OCID Authentication**: Users log in via `@opencampus/ocid-connect-js`.
- **Job Listings**: Displays a list of available jobs, each with a title, description, and "Apply" button.
- **Application Status**: Users can apply to jobs, and the button updates to indicate the applied status.

Upon logging in, the DApp displays the user's OCID username.

---

### 3. Achievement Filtering System

The **Achievement Filtering System** allows users to filter and view a mock JSON dataset of OC credentials based on various criteria. This tool is helpful for browsing skills, certificates, and achievements, helping users showcase or find relevant qualifications.

**Filters**:
- **Achievement Type**: Filter by types such as "Certificate" or "Award."
- **Category**: Filter based on categories like "Programming" or "Soft Skills."
- **Skills and Levels**: Select specific skills and their proficiency levels, such as "Beginner" or "Advanced."
- **Year Created/Updated**: Filter based on the creation or update year of the credential.

The DApp dynamically displays the achievements matching the selected filters, making it easy to refine the search results.

---

## Technologies Used
- **React** and **Next.js**: For building a modern, component-based frontend.
- **TypeScript**: Provides type safety and clarity in development.
- **@opencampus/ocid-connect-js**: Integrates OCID authentication for secure user login.
- **Tailwind CSS**: A CSS framework for building responsive and customizable interfaces.

---

## License
This project is licensed under the MIT License.

---

