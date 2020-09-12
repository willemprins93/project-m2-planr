# Planr

## Description

Planr is a social meetup app, where you can filter by city or type, create events, attend existing ones and leave comments.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the root and be redirected to where I need to be
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **cities list** - As a user I want to see all the cities available to see events tailored to my location
- **events list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **type list** - As a user I want to see all the events filtered by type, so I can see events tailored to my interests
- **events create** - As a user I want to create an event so that I can invite others to attend
- **events edit** - As a user I want to be able to edit events that I've created
- **events detail** - As a user I want to see the event details and attendee list of one event so that I can decide if I want to attend 
- **event attend** - As a user I want to be able to attend to event so that the organizers can count me in
- **user profile** - As a user I want to be able to update my personal information, change my photo and see my events
- **other user profiles** - As a user I want to see who else is attending these events and what other events they will be going to

## Backlog

List of other features outside of the final products scope:

Comments: 
- being able to reply to specific comments
- list replies in a nested structure

Private messages:
- add private message functionality

Enlarge profile pic:
- being able to zoom in on someones profile picture

Payment function:
- add premium events where booking a ticket is required


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

- GET /auth/:id/profile
  - renders specific user profile page
  - includes events attending
- GET /auth/profile
  - renders logged in users profile
  - includes edit profile button
  - includes logout button
- POST /auth/profile/edit
  - redirects to /auth/profile 
  - body: 
    - first name
    - last name
    - email
    - photoUrl
- POST /auth/profile/delete
  - redirects to /auth/login 
  - logs out user
  - body (empty)


- GET /cities
  - renders the cities list
- GET /cities/:id/events/
  - renders the event list for specific city

- GET /events
  - renders list of all events
  - create event button to redirect to create form
  - includes dropdown filter list
- GET /events/:id
  - renders the event detail page
  - includes the list of attendees
  - attend button if user not attending yet
- POST /events/:id/attend 
  - redirects to /auth/login if user is not logged in
  - redirects to /events/:id if user logged in
  - updates event and user with linked objectid
  - body: (empty - the user is already stored in the session)
- GET /events/:id/edit
  - renders event edit form, prefilled with existing info
- POST /events/:id/edit
  - redirects to /events/:id
  - body: 
    - name
    - date
    - description
    - city
    - address
    - type
    - photoUrl
- GET /events/filter/:type
  - renders events list filtered by type
  - includes dropdown filter list
- POST /events/filter/:type
  - renders filtered type list
  - body: (empty - type comes from req.params)
- GET /events/create
  - redirects to /auth/login if user not logged in
  - renders the new event form
- POST /events/create
  - body: 
    - name
    - date
    - description
    - city
    - address
    - type
    - photoUrl


## Models

User model
 
```
name:
  firstName: String
  lastName: String
email: String
photoUrl: String
eventsHosting: [{ObjectId of 'Event'}]
eventsAttending: [{ObjectId of 'Event'}]
comments: [{ObjectId of 'Comment'}]
passwordHash: String
```

Event model

```
name: String
date: Date
location:
  type: String
  coordinates: [Number]
  formattedAddress: String
city: {ObjectId of 'City'}
description: String
photoUrl: String
type: String
host: {ObjectId of 'User'}
attendees: [{ObjectId of 'User'}]
comments: [{ObjectId of 'Comment'}]
``` 

City Model

```
name: String
photoUrl: String
```

Comment Model

```
user: {ObjectId of 'User'}
date: Date
text: String
```


## Links

### Trello

[Trello board](https://trello.com/b/KESAW0Tq/project-m2-planr)

### Git

[Repository Link](https://github.com/willemprins93/project-m2-planr)

[Deploy Link](planr-deploy.herokuapp.com/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1dnPrjbDBY7xOiPhlP38qKdFfxlcEgzsSARMEVIwz86g/edit#slide=id.g723630543_3_0) 
