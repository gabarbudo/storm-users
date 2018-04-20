# storm-users
### by Gab Barbudo

## Frameworks Used:
* JS: AngularJS
* CSS: AngularJS Material (https://material.angularjs.org/)

## Setup Requirements:
XAMPP
* Apache HTTP Server
* PHP Engine
* MySQL Database Server

## Instructions:
1. Clone or download the `storm-users` repository and save it in `xampp\htdocs\`.
2. Run XAMPP then start the Apache HTTP Server and MySQL Database Server.
3. Go to http://localhost/phpmyadmin/ to access PHPMyAdmin.
    * 3.1. Click on `databases` and create a new database. Name it `api_db`.
    * 3.2. Select `api_db` from the left sidebar.
    * 3.3. Click `Import`.
    * 3.4. Click on the `Browse` button and locate `users.sql`.
    * 3.5. Keep default settings and just click `GO` to import the database.
4. Go to http://localhost/storm-users/index.html to access the website.
