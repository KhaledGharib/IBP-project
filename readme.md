# Qlab 🧩

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![bootstrap](https://img.shields.io/badge/bootstrap-5-purple?logo=bootstrap)
![PHP](https://img.shields.io/badge/PHP-8.2.6-purple?logo=php)
![Composer](https://img.shields.io/badge/Composer-2.5.5-yellow?logo=composer)
![MySQL](https://img.shields.io/badge/MySQL-10.4.28-blue?logo=mysql&logoColor=white)
![npm](https://img.shields.io/badge/npm-20.2.0-red?logo=npm)
![Laravel](https://img.shields.io/badge/Laravel-9.40.1-red?logo=laravel)


[presentation](https://youtu.be/Eth5UsyzOPg)

## Prerequisites

To run this project locally, you need the following:

- Web server (e.g., Apache)
- MySQL database
#### You can use XAMPP to do all the above
- and make sure you have the right versions as shown above

## Client ![My Skills](https://skillicons.dev/icons?i=react)

The client folder contains the frontend code for Qlap, built with React.

### Installation

- To install the React dependencies, navigate to the client folder and run `npm install`.


### Usage

To start the development server for the client-side, run `npm run dev`.

## Server ![My Skills](https://skillicons.dev/icons?i=laravel)

The server folder contains the backend code for Qlap, built with PHP.

### Installation

- To install the PHP dependencies, navigate to the server folder and run `composer install`.

### Database Migration and Key Generation

Before running the server, you need to perform the following steps:
1. Copy the `.env` file by running the following command in the server folder `cp .env.example .env`.
This will create a new `.env` file.
2. Open the `.env` file and configure the necessary database credentials.
3. To migrate the database tables required for Qlap, run the following command in the server folder `php artisan key:generate`.
4. To generate a unique application key for secure encryption, run `php artisan key:generate` in the server folder.

### Usage

Start the PHP server following command `php artisan serve`

## Contributing
If you would like to contribute to Qlap, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Submit a pull request, explaining your changes.

# Known Issues ⚠️
Please note that this project may contain 🐛 and issues. I'm actively working 👨‍💻 on fixing them. Your understanding is appreciated.
