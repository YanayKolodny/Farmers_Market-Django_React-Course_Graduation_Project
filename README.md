# The Farmer's Market Online
### A Django & React Full-Stack graduation project

## Table of contents
* [General info](#general-info)
* [Features](#features)
* [Technologies](#technologies)
* [Pages Examples](#pagesexamples)
* [Setup](#setup)

## General info
This project has created by Yanay Kolodny and Michael Stern on october-november of 2022. 
It is our graduation project from John Bryce College in Tel Aviv - a Full-Stack Python Course.
The Farmer's Market Online is a market where user's can serve both as costumer and as "stand" owners, where they can sell their goods.

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
	
## Technologies:
Project is created with:
* Django version: 4.0.6
* React version: 18.2.0
* Redux
	
## Pages Examples:
	<img src="/ReadmeImages/productsPage.jpeg" width="100" height="100">
	
## Setup
After completing the git clone process:  
(Please pay attention that if there's difference in actions for Windown/Mac the actions for mac will be added to the right after the "|" ) 
#### Terminal 1 - Django
```
$ cd Farmers_Market-Django_React-Course_Graduation_Project/Backend/

	Windows:			       		Mac:
$ pip install virtualenv		|	$ pip3 install virtualenv
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


![tekst alternatywny](Frontend/my-app/public/BackgroundPhotos/CheckOutComplete.png)
