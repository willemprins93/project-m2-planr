# PLANR

## Description

Social meetup app, where you can filter by city, create events and attend existing ones.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **cities list** - As a user I want to see all the cities available to see events tailored to my location
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **events create** - As a user I want to create an event so that I can invite others to attend
- **events detail** - As a user I want to see the event details and attendee list of one event so that I can decide if I want to attend 
- **event attend** - As a user I want to be able to attend to event so that the organizers can count me in
- **user profile** - As a user I want to be able to update my personal information, change my photo and see my events

## Backlog

List of other features outside of the MVPs scope

Geo Location:
- add geolocation to events when creating
- show event in a map in event detail page
- show all events in a map in the event list page

Comments: 
- add comments to events
- delete your own comments from events

Homepage
- ...


## ROUTES:

- GET /
  - redirects to /auth/login if not logged in
  - redirects to /cities if logged in

- GET /auth/login
  - redirects to /cities if user logged in
  - renders the login form
- POST /auth/login
  - redirects to /cities if user logged in
  - body:
    - email
    - password
- GET /auth/signup
  - redirects to /cities if user logged in
  - renders the signup form 
- POST /auth/signup
  - redirects to /cities if user logged in
  - body:
    - first name
    - last name
    - email
    - password
- POST /auth/logout
  - body: (empty)
  - redirects to /auth/login

- GET /cities
  - renders the cities list

- GET /cities/:id/events/
  - renders the event list for specific city + create event button
- GET /cities/:id/events/create
  - redirects to /auth/login if user not logged in
  - renders the new event form
- POST /cities/:id/events/create
  - body:
    - name
    - date
    - location (prefilled in)
    - upload photo
    - type

- GET /cities/:id/events/:id
  - renders the event detail page
  - includes the list of attendees
  - attend button if user not attending yet
- POST /cities/:id/events/:id/attend 
  - redirects to /auth/login if user is not logged in
  - redirects to /cities/:id/events/:id if user logged in
  - body: (empty - the user is already stored in the session)

- GET /user/:id
  - renders the user profile page
  - includes edit profile button
  - includes delete profile button
- PUT /user/:id
  - redirects to /user/:id 
  - body: 
    - first name
    - last name
    - email
    - photoUrl
- DELETE /user/:id
  - redirects to /auth/login 
  - body (empty)


## Models

User model
 
```
firstName: String
lastName: String
email: String
photoUrl: String
eventsHosting: [{ObjectId of 'Event'}]
eventsAttending: [{ObjectId of 'Event'}]
passwordHash: String
```

Event model

```
name: String
date: Date
location: {ObjectId of 'City'}
description: String
photoUrl: String
host: {ObjectId of 'User'}
attendees: [{ObjectId of 'User'}]
``` 

City Model

```
name: String
photoUrl: String
events: [{ObjectId of 'Event'}]
```


## Links

### Trello

[Trello board](https://trello.com/b/KESAW0Tq/project-m2-planr)

### Git

[Repository Link](https://github.com/willemprins93/project-m2-planr)

[Deploy Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com)
