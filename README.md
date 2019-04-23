# notapp

A simple but fun application made for the creation and management of notes
using the LAMP stack.

## Installation

First of all, make sure you have the lamp stack installed on your machine.
Your second step should be create a database with the name `notapp`. Then,
create the `Notes` table by running this command:
`CREATE TABLE Notes ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                      title VARCHAR(255) NOT NULL,
                      description longtext,
                      last_modified datetime DEFAULT CURRENT_TIME )`.
Lastly, clone this repository and run `npm i` to install the app dependencies.
Now just navigate to the directory where you cloned the repository and access
the **index.html** file.

## Configuration

If you need different configurations, like a different database name, or
configure your username and password, you can set it in the `config/Database.php`
inside the `api` folder.
