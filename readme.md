# Weather Application Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Installation](#installation)
   - [Configuration](#configuration)
3. [Authentication](#authentication)
   - [User Registration](#user-registration)
   - [User Login](#user-login)
   - [Password Reset](#password-reset)
4. [Weather Information](#weather-information)
   - [Search Weather](#search-weather)
   - [Current City Weather](#current-city-weather)
   - [Favorite Places](#favorite-places)
   - [View Favorite Places Weather](#view-favorite-places-weather)
5. [API Endpoints](#api-endpoints)
6. [MVC Pattern](#mvc-pattern)
7. [Logger](#logger)
8. [Validation](#validation)
9. [Error Handling](#error-handling)
10. [Contributing](#contributing)

---

## Introduction

Welcome to the Weather Application documentation. This application provides users with various weather-related functionalities, including user authentication, weather searches, favorite places management, and more.

## Getting Started

### Installation

To install and run the Weather Application, follow these steps:

1. Clone the repository:

   ```bash
   git clone <https://github.com/ishansingh1010/Weather-Application>
   ```

2. Install dependencies:

   ```bash
   cd weather-app
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

### Configuration

- Ensure you set up environment variables for sensitive information like API keys and database connection strings.
- Review the configuration files for specific settings.

## Authentication

### User Registration

To create an account and register as a user:

1. Navigate to the registration page.
2. Provide your email address and password.
3. Click the "Register" button.
4. Check your email for a verification link and follow the instructions.

### User Login

To log in to your account:

1. Navigate to the login page.
2. Enter your email and password.
3. Click the "Login" button.

### Password Reset

If you forget your password:

1. Click on the "Forgot Password" link on the login page.
2. Enter your registered email address.
3. Follow the instructions in the email to reset your password.
4. Set a new password.

## Weather Information

### Search Weather

To search for weather information:

1. Use the search bar to enter a location (city, ZIP code, or coordinates).
2. Click the "Search" button.
3. View the current weather data for the selected location.

### Current City Weather

To check the weather for your current city:

1. Your current city weather is displayed on the dashboard upon login.

### Favorite Places

To manage your favorite places:

1. Click on the "Favorite Places" section.
2. Add a new place by entering its name or coordinates and clicking "Add."
3. Remove a place from your favorites by clicking the "Remove" button.

### View Favorite Places Weather

To view the weather for your favorite places:

1. Click on the "Favorite Places" section.
2. Select a favorite place from the list.
3. View the current weather data for the selected place.

## API Endpoints

- Document all API endpoints, their input parameters, and expected responses.
- Include example requests and responses.

## MVC Pattern

- Explain the MVC (Model-View-Controller) pattern used in your application and how it helps in organizing code.

## Logger

- Describe how logging is implemented in your application.
- Include information about log levels and log file locations.

## Validation

- Explain how data validation is handled in your application.
- Include details about input validation and error handling.

## Error Handling

- Describe how errors are handled in your application.
- Include information about error codes and possible error scenarios.

## Contributing

- Provide guidelines for contributing to the project.
- Include information on how to report issues and submit pull requests.
