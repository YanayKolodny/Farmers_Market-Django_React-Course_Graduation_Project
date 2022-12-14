# The Farmer's Market Online
### A Django & React Full-Stack graduation project

## Table of contents
* [General info](#general-info)
* [Link to live website](#link-to-live-website)
* [Technologies](#technologies)
* [Features](#features)
* [Pages Examples](#pages-examples)
* [Setup](#setup)

## General info
This project has created by Yanay Kolodny and Michael Stern on october-november of 2022. 
It is our graduation project from John Bryce College in Tel Aviv - a Full-Stack Python Course.
The Farmer's Market Online is a market where user's can serve both as costumer and as "stand" owners, where they can sell their goods.

## Link to live website:
https://farmersmarketonline.netlify.app/

## Technologies:
Project is created with:
* Django version: 4.0.6
* React version: 18.2.0
* Redux
* BootStrap, Mui, MDB
* CSS
	
## Features - What can a user do:

#### New users:
* Visite the market and the stands
* Register/Login
* Edit profile details
* Add products to the cart, change amounts of products, create order
* Orders history page
* Open a stand with uploaded photo - (after login)

#### Stand Owners - After opening a stand:
* Edit the stand's details
* Creat and manage ctegories
* Add products (with photos) to the stand and manage the stand's products
* Orders history page (from the stand)

#### Superuser:
* Market's information panel
* Areas management
* Stands management
* Products management
* Orders page (of the entire market)
	
## Pages Examples:

### Welcome Page:
![welcomePage](https://user-images.githubusercontent.com/108010066/211542643-0da415d2-f5a3-4030-aaee-979e30947437.png)

### Stands Page:
![standsPage](https://user-images.githubusercontent.com/108010066/211543844-3d0f7096-5c69-4d95-8b79-184c54fd1886.png)

### Products Page:
![productsPage](https://user-images.githubusercontent.com/108010066/211543698-63f504a5-53d2-42df-9691-763b9dce78d0.png)

## Setup
After completing the git clone process:  
(Please pay attention that if there's difference in actions for Windown/Mac the actions for mac will be added to the right after the "|" ) 
#### Terminal 1 - Django
```
$ cd Farmers_Market-Django_React-Course_Graduation_Project/Backend/

	Windows:			       		Mac:
$ pip install virtualenv		|	$ pip3 install virtualenv
$ python -m virtualenv myenv		|	$ python3 -m virtualenv myenv
$ myenv\Scripts\activate		|	$ source myenv/bin/activate
$ pip install -r requirements.txt	|	$ pip3 install -r requirements.txt
$ python manage.py runserver		|	$ python manage.py runserver

```

#### Terminal 2 - React
```
$ cd Farmers_Market-Django_React-Course_Graduation_Project/Frontend/my-app/
$ npm i
$ npm start

```
