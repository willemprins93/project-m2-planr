//bin/seeds.js

const mongoose = require('mongoose');
const Event = require('../models/Event.model');
const City = require('../models/City.model');
const User = require('../models/User.model');

require('dotenv').config();

// require database configuration
require('dotenv').config();
require('../configs/db.config.js');

const users= [
    
      {
            name :{
                firstName: 'John',
                lastName: 'de Boer'
            },
            email: 'john@deboer.com',
            photoUrl:'  w=152&h=152&fit=crop&crop=faces',
            eventsHosting:['Professional photography tour', 'Jogging','Swedish cooking class','Nature reserve hiking tour','Sailing','Node coding class','Bike tour','Abba Museum Entrance'],
            //eventsHosting:'Professional photography tour', 'Jogging','Swedish cooking class','Nature reserve hiking tour','Sailing','Node coding class','Bike tour','Abba Museum Entrance',
            eventsAttending: 'Kayaking',
            passwordHash:'$2a$10$p/DTjgceHCjYDiG92eSSbO1YleGD0reS2O/0p.0fL5bXhZkP7CWMK'
       },     
      {  
            firstName: 'Alice',
            lastName: 'Rivera',
            email: 'alice@rivera.com',
            photoUrl:'https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces',
            eventsHosting:'Kayaking',
            eventsAttending: ['Professional photography tour', 'Jogging','Swedish cooking class','Nature reserve hiking tour','Sailing','Node coding class','Bike tour','Abba Museum Entrance'],
            //eventsAttending: 'Professional photography tour', 'Jogging','Swedish cooking class','Nature reserve hiking tour','Sailing','Node coding class','Bike tour','Abba Museum Entrance',
            passwordHash:'$2a$10$OK4iB5fmvnIomeWLt1fiouGgtt5lLLWI2lRKSxiQBx2iOoU3qM/Eu'
      },
]

User.create(users)
  .then(usersFromDB => {
    console.log(`Created ${usersFromDB.length} users`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating users: ${err}`));


const events= [
 
  // STOCKHOLM
    {
        name: 'Kayaking',
        date: '2020-09-20', //// "2002-12-09T00:00:00.000Z"
        location: 'Stockholm',
        description: 'Board a kayak and explore the waterways of Stockholm that provide a quiet and idyllic perspective of the city.',
        photoUrl: 'https://images.unsplash.com/photo-1570275342944-68e062d05a5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
        host: 'Alice Rivera',
        attendees: ['John de Boer'],
        host: [],
        attendees:[],
        type: ['sport','outdoor']
    },
    {
        name: 'Professional photography tour',
        date: '2020-09-25',
        location: 'Stockholm',
        description:'Learn to take better photographs on a 3-hour private photo workshop across Stockholm. Get tips on composition, exposure, and other techniques', 
        photoUrl:'https://images.unsplash.com/photo-1518112394663-20d80ef50554?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
        //host: 'John de Boer',
        //attendees: 'Alice Rivera',
        host: [],
        attendees:[],
        type :['art','culture'],
    },
    {
        name: 'Jogging',
        date:  '2020-09-24',
        location: 'Stockholm',
        description:'Stay in shape or work up a sweat while exploring the beautiful city of Stockholm.',
        photoUrl:'https://images.unsplash.com/photo-1585473233369-14a97aa923df?ixlib=rb-1.2.1&auto=format&fit=crop&w=2060&q=80',
        host: 'John de Boer',
        attendees:'Alice Rivera',
        type: ['sport','outdoor']
    },
    {
        name: 'Swedish cooking class',
        date: '2020-09-18',
        location: 'Stockholm',
        description:'Enjoy and learn to cook traditional Swedish courses like marinated salmon with mustard and dill potatoes, elk meatballs or Scanian apple pie.',
        photoUrl:'https://images.unsplash.com/photo-1564844536311-de546a28c87d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1865&q=80',
        host: 'John de Boer',
        attendees:'Alice Rivera',
        type :'food'
    },
    {
        name: 'Nature reserve hiking tour',
        date: '2020-09-22',
        location: 'Stockholm',
        description: 'Escape the city and venture into the vast wilderness of Sweden for 1 day as you discover the incredible forests which lie outside of Stockholm.',
        photoUrl:'https://images.unsplash.com/photo-1568454537842-d933259bb258?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
        host: 'John de Boer',
        attendees: 'Alice Rivera',
        type : ['sport','outdoor']
    },
    {
        name: 'Sailing',
        date: '2020-09-24',
        location: 'Stockholm',
        description: 'Explore the pristine beauty of thousands of islands in the Stockholm Archipelago on this full-day sailing tour.',
        photoUrl:'https://images.unsplash.com/photo-1501771924607-209f42a6e7e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80',
        host: 'John de Boer',
        attendees:'Alice Rivera',
        type: ['sport','outdoor']
    },
    {
        name: 'Node coding class',
        date: '2020-09-22',
        location: 'Stockholm',
        description: 'Join us to learn Node and set up a learning Front-End website from scratch',
        photoUrl:'https://unsplash.com/photos/aOC7TSLb1o8&auto=format&fit=crop&w=2100&q=80',
        host: 'John de Boer',
        attendees: 'Alice Rivera',
        type: ['tech','networking']
    },
    {
        name: 'Bike tour',
        date: '2020-10-02',
        location: 'Stockholm',
        description:'Explore the Swedish capital in the most relaxed and convenient way on a guided bike tour.', 
        photoUrl:'https://images.unsplash.com/photo-1563460937-8e3fd7f161f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
        host: 'John de Boer',
        attendees:'Alice Rivera',
        type: ['sport','outdoor']
    },
    {
        name: 'Abba Museum Entrance',
        date: '2020-10-01',
        location: 'Stockholm',
        description: 'ABBA The Museum is no ordinary museum. Here you will get to walk in the footsteps of ABBA, the world’s most successful pop group',
        photoUrl:'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        host: 'John de Boer',
        attendees: 'Alice Rivera',
        type :['music','culture']
    },
]

Event.create(events)
  .then(eventsFromDB => {
    console.log(`Created ${eventsFromDB.length} events`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating events: ${err}`));

//SEEDING CITIES

const cities = [
    {
        name: 'London',
        photoUrl: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80' 
    },
    {
        name: 'Rome',
        photoUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'  
    },
    {
        name: 'Amsterdam',
        photoUrl: 'https://images.unsplash.com/photo-1571173729436-98de522c64dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
    },
    {
        name: 'Lisbon',
        photoUrl: 'https://images.unsplash.com/photo-1546375982-c22276aa12f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2130&q=80' 
    },
    {
        name: 'Stockholm',
        photoUrl: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
    },
    {
        name: 'Seville',
        photoUrl: 'https://images.unsplash.com/photo-1588328355754-b78ad593d6c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
    },
    {
        name: 'Sydney',
        photoUrl: 'https://images.unsplash.com/photo-1506374322094-6021fc3926f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2212&q=80' 
    },
    {
        name: 'Paris',
        photoUrl: 'https://images.unsplash.com/photo-1541264161754-445bbdd7de52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
    },
    {
        name: 'New York',
        photoUrl: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2360&q=80'
    }
]


// SEEDING EVENTS


// const events= [
 
// // STOCKHOLM
//     {
//         name: 'Kayaking',
//         date: '2020-09-20', //// "2002-12-09T00:00:00.000Z"
//         location: 'Stockholm',
//         description: 'Board a kayak and explore the waterways of Stockholm that provide a quiet and idyllic perspective of the city.',
//         photoUrl: '',
//         host: 'John',
//         attendees: 'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Professional photography tour',
//         date: '2020-09-25',
//         location: 'Stockholm',
//         description:'Learn to take better photographs on a 3-hour private photo workshop across Stockholm. Get tips on composition, exposure, and other techniques', 
//         photoUrl:'',
//         host: 'Willem',
//         attendees: 'Alice',
//         type :'art',
//     },
//     {
//         name: 'Jogging',
//         date:  '2020-09-24',
//         location: 'Stockholm',
//         description:'Stay in shape or work up a sweat while exploring the beautiful city of Stockholm.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Swedish cooking class',
//         date: '2020-09-18',
//         location: 'Stockholm',
//         description:'Enjoy and learn to cook traditional Swedish courses like marinated salmon with mustard and dill potatoes, elk meatballs or Scanian apple pie.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type :'food'
//     },
//     {
//         name: 'Nature reserve hiking tour',
//         date: '2020-09-22',
//         location: 'Stockholm',
//         description: 'Escape the city and venture into the vast wilderness of Sweden for 1 day as you discover the incredible forests which lie outside of Stockholm.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Sailing',
//         date: '2020-09-24',
//         location: 'Stockholm',
//         description: 'Explore the pristine beauty of thousands of islands in the Stockholm Archipelago on this full-day sailing tour.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Wildf Safari with Campfire Dinner',
//         date: '2020-09-22',
//         location: 'Stockholm',
//         description: 'Meet moose, deer, wild boars, hares, badgers, foxes and different bird species on this wildlife safari in the beautiful nature close to Stockholm.',
//         photoUrl:'',
//         host: 'John',
//         attendees: 'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Bike tour',
//         date: '2020-10-02',
//         location: 'Stockholm',
//         description:'Explore the Swedish capital in the most relaxed and convenient way on a guided bike tour.', 
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Abba Museum Entrance',
//         date: '2020-10-01',
//         location: 'Stockholm',
//         description: 'ABBA The Museum is no ordinary museum. Here you will get to walk in the footsteps of ABBA, the world’s most successful pop group',
//         photoUrl:'',
//         host: 'John',
//         attendees: 'Alice',
//         type :'music'
//     },

// // LONDON
//     {
//         name: 'Kayaking',
//         date: '2020-09-20', //// "2002-12-09T00:00:00.000Z"
//         location: 'London',
//         description: 'Board a kayak and explore the waterways of London that provide a quiet and idyllic perspective of the city.',
//         photoUrl: '',
//         host: 'John',
//         attendees: 'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Professional photography tour',
//         date: '2020-09-25',
//         location: 'London',
//         description:'Learn to take better photographs on a 3-hour private photo workshop across London. Get tips on composition, exposure, and other techniques', 
//         photoUrl:'',
//         host: 'Willem',
//         attendees: 'Alice',
//         type :'art',
       
//     },
//     {
//         name: 'Jogging',
//         date:  '2020-09-24',
//         location: 'London',
//         description:'Stay in shape or work up a sweat while exploring the beautiful city of London.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'British cooking class',
//         date: '2020-09-18',
//         location: 'London',
//         description: 'Enjoy and learn to cook traditional British courses like beef Wellington, shepherd\'s pie and Christmas pudding.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type :'food'
//     },
//     {
//         name: 'Nature reserve hiking tour',
//         date: '2020-09-22',
//         location: 'London',
//         description: 'Escape the city and venture into the vast wilderness of Great Britain for 1 day as you discover the incredible forests which lie outside of London',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Sailing',
//         date: '2020-09-24',
//         location: 'Gunwharf Quay in Portsmouth Harbour.',        
//         description: ' Join us on a weekend Adventure sailing from Portsmouth  on this sailing tour.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Wildf Safari with Campfire Dinner',
//         date: '2020-09-22',
//         location: 'London',
//         description: 'Meet  wild boars, hares, badgers, foxes and different bird species on this wildlife safari in the beautiful nature close to L.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Bike tour',
//         date: '2020-10-02',
//         location: 'London',
//         description:'Explore the British capital in the most relaxed and convenient way on a guided bike tour.', 
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Summer Music Festival',
//         date: '2020-10-01',
//         location: 'London',
//         description: 'Join us to enjoy this summer music festival',
//         photoUrl:'',
//         host: 'John',
//         attendees: 'Alice',
//         type :'music',

//     },
    

// // ROME
//     {
//         name: 'Kayaking',
//         date: '2020-09-20', //// "2002-12-09T00:00:00.000Z"
//         location: 'Rome',
//         description: 'Board a kayak and explore the waterways of Rome that provide a quiet and idyllic perspective of the city.',
//         photoUrl: '',
//         host: 'John',
//         attendees: 'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Professional photography tour',
//         date: '2020-09-25',
//         location: 'Rome',
//         description:'Learn to take better photographs on a 3-hour private photo workshop across Rome. Get tips on composition, exposure, and other techniques', 
//         photoUrl:'',
//         host: 'Willem',
//         attendees: 'Alice',
//         type :'art'
//     },
//     {
//         name: 'Jogging',
//         date:  '2020-09-24',
//         location: 'Rome',
//         description:'Stay in shape or work up a sweat while exploring the beautiful city of Rome.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Italian cooking class',
//         date: '2020-09-18',
//         location: 'Rome',
//         description:'Enjoy and learn to cook traditional Italian courses like lassagna, pasta and tiramisu',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type :'food'
//     },
//     {
//         name: 'Nature reserve hiking tour',
//         date: '2020-09-22',
//         location: 'Rome',
//         description: 'Escape the city and venture into the vast wilderness of Italy for 1 day as you discover the incredible forests which lie outside of Rome.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Sailing',
//         date: '2020-09-24',
//         location: 'Via Celimontana 30/32, Rome.',
//         description: 'Discover the beauty and mystery of the Pontine Islands on this Ponza Island trip from Rome on a 5-hour boat excursion.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Wildf Safari with Campfire Dinner',
//         date: '2020-09-22',
//         location: 'Rome',
//         description: 'Meet moose, deer, wild boars, hares, badgers, foxes and different bird species on this wildlife safari in the beautiful nature close to Rome.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Bike tour',
//         date: '2020-10-02',
//         location: 'Rome',
//         description:'Explore the Italian capital in the most relaxed and convenient way on a guided bike tour.', 
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Opera concert',
//         date: '2020-10-01',
//         location: 'Rome',
//         description: 'Immerse yourself in the world of Italian opera and enjoy compositions by famous Neopolitan composers such as Puccini, Bellini, and Mascagni.',
//         photoUrl:'',
//         host: 'John',
//         attendees: 'Alice',
//         type :'music'
//     },

// // AMSTERDAM
//     {
//         name: 'Kayaking',
//         date: '2020-09-20', //// "2002-12-09T00:00:00.000Z"
//         location: 'Amsterdam',
//         description: 'Board a kayak and explore the waterways of Amsterdam that provide a quiet and idyllic perspective of the city.',
//         photoUrl: '',
//         host: 'John',
//         attendees: 'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Professional photography tour',
//         date: '2020-09-25',
//         location: 'Amsterdam',
//         description:'Learn to take better photographs on a 3-hour private photo workshop across Amsterdam. Get tips on composition, exposure, and other techniques', 
//         photoUrl:'',
//         host: 'Willem',
//         attendees: 'Alice',
//         type :'art',
//         type: 'sport'
//     },
//     {
//         name: 'Jogging',
//         date:  '2020-09-24',
//         location: 'Amsterdam',
//         description:'Stay in shape or work up a sweat while exploring the beautiful city of Amsterdam.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Dutch cooking class',
//         date: '2020-09-18',
//         location: 'Amsterdam',
//         description:'Enjoy and learn to cook traditional Dutch courses like erwtensoep, rijsttafel and  poffertjes.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type :'food'
//     },
//     {
//         name: 'Nature reserve hiking tour',
//         date: '2020-09-22',
//         location: 'Amsterdam',
//         description: 'Escape the city and venture into the vast wilderness of the Netherlands for 1 day as you discover the incredible forests which lie outside of Amsterdam.',
//         photoUrl:'',
//         host: 'John',
//         attendees: 'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Sailing',
//         date: '2020-09-24',
//         location: 'Amsterdam',
//         description: 'Explore the beauty of thousands of Amsterdam on this full-day sailing tour.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Wildf Safari with Campfire Dinner',
//         date: '2020-09-22',
//         location: 'Amsterdam',
//         description: 'Meet moose, deer, wild boars, hares, badgers, foxes and different bird species on this wildlife safari in the beautiful nature close to Amsterdam.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Bike tour',
//         date: '2020-10-02',
//         location: 'Amsterdam',
//         description:'Explore the Dutch capital in the most relaxed and convenient way on a guided bike tour.', 
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Summer Music Festival',
//         date: '2020-10-01',
//         location: 'Amsterdam',
//         description: 'Join us to enjoy this summer music festival',
//         photoUrl:'',
//         type :'music',
//         host: 'John',
//         attendees: 'Alice',
//         type :'music'
//     },

// // LISBON
//     {
//         name: 'Kayaking',
//         date: '2020-09-20', //// "2002-12-09T00:00:00.000Z"
//         location: 'Lisbon',
//         description: 'Board a kayak and explore the waterways of Lisbon that provide a quiet and idyllic perspective of the city.',
//         photoUrl: '',
//         host: 'John',
//         attendees: 'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Professional photography tour',
//         date: '2020-09-25',
//         location: 'Lisbon',
//         description:'Learn to take better photographs on a 3-hour private photo workshop across Lisbon. Get tips on composition, exposure, and other techniques', 
//         photoUrl:'',
//         host: 'Willem',
//         attendees: 'Alice',
//         type :'art',
//         type: 'sport'
//     },
//     {
//         name: 'Jogging',
//         date:  '2020-09-24',
//         location: 'Lisbon',
//         description:'Stay in shape or work up a sweat while exploring the beautiful city of Lisbon.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Portuguese cooking class',
//         date: '2020-09-18',
//         location: 'Lisbon',
//         description:'Enjoy and learn to cook traditional Portuguese courses like bacalhau a bras,feijoada pastéis de nata .',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type :'food'
//     },
//     {
//         name: 'Nature reserve hiking tour',
//         date: '2020-09-22',
//         location: 'Lisbon',
//         description: 'Escape the city and venture into the vast wilderness of Portugal for 1 day as you discover the incredible forests which lie outside of Lisbon.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Sailing',
//         date: '2020-09-24',
//         location: 'Lisbon',
//         description: 'Explore the pristine beauty around Lisbon on this full-day sailing tour.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Wildf Safari with Campfire Dinner',
//         date: '2020-09-22',
//         location: 'Lisbon',
//         description: 'Meet moose, deer, wild boars, hares, badgers, foxes and different bird species on this wildlife safari in the beautiful nature close to Lisbon.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Bike tour',
//         date: '2020-10-02',
//         location: 'Lisbon',
//         description:'Explore the Portuguese capital in the most relaxed and convenient way on a guided bike tour.', 
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Summer music festival',
//         date: '2020-10-01',
//         location: 'Lisbon',
//         description: 'Join us to enjoy this summer music festival',
//         photoUrl:'',
//         host: 'John',
//         attendees: 'Alice',
//         type :'music'
//     },

// // SEVILLE
//     {
//         name: 'Kayaking',
//         date: '2020-09-20', //// "2002-12-09T00:00:00.000Z"
//         location: 'Seville',
//         description: 'Board a kayak and explore the waterways of Lisbon that provide a quiet and idyllic perspective of the city.',
//         photoUrl: '',
//         host: 'John',
//         attendees: 'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Professional photography tour',
//         date: '2020-09-25',
//         location: 'Seville',
//         description:'Learn to take better photographs on a 3-hour private photo workshop across Lisbon. Get tips on composition, exposure, and other techniques', 
//         photoUrl:'',
//         host: 'Willem',
//         attendees: 'Alice',
//         type :'art',
//         type: 'sport'
//     },
//     {
//         name: 'Jogging',
//         date:  '2020-09-24',
//         location: 'Seville',
//         description:'Stay in shape or work up a sweat while exploring the beautiful city of Lisbon.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Spanish cooking class',
//         date: '2020-09-18',
//         location: 'Seville',
//         description:'Enjoy and learn to cook traditional Spanish courses like paella, tortilla de patata and tarta de Santiago .',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type :'food'
//     },
//     {
//         name: 'Nature reserve hiking tour',
//         date: '2020-09-22',
//         location: 'Seville',
//         description: 'Escape the city and venture into the vast wilderness of Spain for 1 day as you discover the incredible forests which lie outside of Seville.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Sailing',
//         date: '2020-09-24',
//         location: 'Seville',
//         description: 'Explore the  beauty of Seville on this full-day sailing tour.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Wildf Safari with Campfire Dinner',
//         date: '2020-09-22',
//         location: 'Seville',
//         description: 'Meet moose, deer, wild boars, hares, badgers, foxes and different bird species on this wildlife safari in the beautiful nature close to Seville.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Bike tour',
//         date: '2020-10-02',
//         location: 'Seville',
//         description:'Explore the Spanish capital in the most relaxed and convenient way on a guided bike tour.', 
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Summer music festival',
//         date: '2020-10-01',
//         location: 'Seville',
//         description: 'Join us to enjoy this summer music festival',
//         photoUrl:'',
//         host: 'John',
//         attendees: 'Alice',
//         type :'music'
//     },

// // SYDNEY
//     {
//         name: 'Kayaking',
//         date: '2020-09-20', //// "2002-12-09T00:00:00.000Z"
//         location: 'Sydney',
//         description: 'Board a kayak and explore the waterways of Australia that provide a quiet and idyllic perspective of the city.',
//         photoUrl: '',
//         host: 'John',
//         attendees: 'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Professional photography tour',
//         date: '2020-09-25',
//         location: 'Sydney',
//         description:'Learn to take better photographs on a 3-hour private photo workshop across Sidney. Get tips on composition, exposure, and other techniques', 
//         photoUrl:'',
//         host: 'Willem',
//         attendees: 'Alice',
//         type :'art',
//         type: 'sport'
//     },
//     {
//         name: 'Jogging',
//         date:  '2020-09-24',
//         location: 'Sydney',
//         description:'Stay in shape or work up a sweat while exploring the beautiful city of Sidney.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Australian cooking class',
//         date: '2020-09-18',
//         location: 'Sydney',
//         description:'Enjoy and learn to cook traditional Australian courses like prawn cocktail,Kangooroo on the grill and pavlova cake.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type :'food'
//     },
//     {
//         name: 'Nature reserve hiking tour',
//         date: '2020-09-22',
//         location: 'Sydney',
//         description: 'Escape the city and venture into the vast wilderness of Australia for 1 day as you discover the incredible forests which lie outside of Sydney.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Sailing',
//         date: '2020-09-24',
//         location: 'Sydney',
//         description: 'Explore the  beauty of Sydney on this full-day sailing tour.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice'
//     },
//     {
//         name: 'Wildf Safari with Campfire Dinner',
//         date: '2020-09-22',
//         location: 'Sydney',
//         description: 'Meet moose, deer, wild boars, hares, badgers, foxes and different bird species on this wildlife safari in the beautiful nature close to Sydney.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Bike tour',
//         date: '2020-10-02',
//         location: 'Sydney',
//         description:'Explore the Australian capital in the most relaxed and convenient way on a guided bike tour.', 
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Summer music festival',
//         date: '2020-10-01',
//         location: 'Sydney',
//         description: 'Join us to enjoy this summer music festival',
//         photoUrl:'',
//         host: 'John',
//         attendees: 'Alice',
//         type :'music'
//     },

// // PARIS
//     {
//         name: 'Kayaking',
//         date: '2020-09-20', //// "2002-12-09T00:00:00.000Z"
//         location: 'Paris',
//         description: 'Board a kayak and explore the waterways of Paris that provide a quiet and idyllic perspective of the city.',
//         photoUrl: '',
//         host: 'John',
//         attendees: 'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Professional photography tour',
//         date: '2020-09-25',
//         location: 'Paris',
//         description:'Learn to take better photographs on a 3-hour private photo workshop across Paris. Get tips on composition, exposure, and other techniques', 
//         photoUrl:'',
//         host: 'Willem',
//         attendees: 'Alice',
//         type :'art',
//         type: 'sport'
//     },
//     {
//         name: 'Jogging',
//         date:  '2020-09-24',
//         location: 'Paris',
//         description:'Stay in shape or work up a sweat while exploring the beautiful city of Paris.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'French cooking class',
//         date: '2020-09-18',
//         location: 'Paris',
//         description:'Enjoy and learn to cook traditional French courses like ratatouille,spinach soufflé and crêpes.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type :'food'
//     },
//     {
//         name: 'Nature reserve hiking tour',
//         date: '2020-09-22',
//         location: 'Paris',
//         description: 'Escape the city and venture into the vast wilderness of France for 1 day as you discover the incredible forests which lie outside of Paris.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Sailing',
//         date: '2020-09-24',
//         location: 'Paris',
//         description: 'Explore the beauty of Paris on this full-day sailing tour.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Wildf Safari with Campfire Dinner',
//         date: '2020-09-22',
//         location: 'Paris',
//         description: 'Meet moose, deer, wild boars, hares, badgers, foxes and different bird species on this wildlife safari in the beautiful nature close to Paris.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Bike tour',
//         date: '2020-10-02',
//         location: 'Paris',
//         description:'Explore the French capital in the most relaxed and convenient way on a guided bike tour.', 
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Summer Music Festival',
//         date: '2020-10-01',
//         location: 'Paris',
//         description: 'Join us to enjoy this summer music festival',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type :'music'
//     },

// // NEW YORK
//     {
//         name: 'Kayaking',
//         date: '2020-09-20', //// "2002-12-09T00:00:00.000Z"
//         location: 'New York',
//         description: 'Board a kayak and explore the waterways of New York that provide a quiet and idyllic perspective of the city.',
//         photoUrl: '',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Professional photography tour',
//         date: '2020-09-25',
//         location: 'New York',
//         description:'Learn to take better photographs on a 3-hour private photo workshop across New York. Get tips on composition, exposure, and other techniques', 
//         photoUrl:'',
//         host: 'Willem',
//         attendees:'Alice',
//         type :'art'
//     },
//     {
//         name: 'Jogging',
//         date:  '2020-09-24',
//         location: 'New York',
//         description:'Stay in shape or work up a sweat while exploring the beautiful city of New York.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'American cooking class',
//         date: '2020-09-18',
//         location: 'New York',
//         description:'Enjoy and learn to cook traditional American courses like barbecue ribs,clam chowder and apple pie.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type :'food',
//     },
//     {
//         name: 'Nature reserve hiking tour',
//         date: '2020-09-22',
//         location: 'New York',
//         description: 'Escape the city and venture into the vast wilderness of America for 1 day as you discover the incredible forests which lie outside of New York.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Sailing',
//         date: '2020-09-24',
//         location: 'New York',
//         description: 'Explore the  beauty of New York on this full-day sailing tour.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Wildf Safari with Campfire Dinner',
//         date: '2020-09-22',
//         location: 'New York',
//         description: 'Meet moose, deer, wild boars, hares, badgers, foxes and different bird species on this wildlife safari in the beautiful nature close to New York.',
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Bike tour',
//         date: '2020-10-02',
//         location: 'New York',
//         description:'Explore the American capital in the most relaxed and convenient way on a guided bike tour.', 
//         photoUrl:'',
//         host: 'John',
//         attendees:'Alice',
//         type: 'sport'
//     },
//     {
//         name: 'Summer Music Festival',
//         date: '2020-10-01',
//         location: 'New York',
//         description: 'Join us to enjoy this summer music festival',
//         photoUrl:'',
//         host: 'John',
//         attendees: 'Alice',
//         type :'music'
//     },
    
//   ];
  
City.create(cities)
  .then(citiesFromDB => {
    console.log(`Created ${citiesFromDB.length} cities`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating cities: ${err}`));

// Event.create(events)
//   .then(eventsFromDB => {
//     console.log(`Created ${eventsFromDB.length} events`);
//     mongoose.connection.close();
//   })
//   .catch(err => console.log(`An error occurred while creating events: ${err}`));