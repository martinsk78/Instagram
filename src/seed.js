// Import Firebase Firestore functions from Firebase v9
import { collection, addDoc } from 'firebase/firestore';

export default async function seedDatabase(db) {
  const users = [
    {
      userId: 'Ntvo0kFzSuQ8IFMB1tzA6y05HfP2',
      username: 'karl',
      fullName: 'Karl Hadwen',
      emailAddress: 'martinjoameza@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now(),
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['Ntvo0kFzSuQ8IFMB1tzA6y05HfP2'],
      dateCreated: Date.now(),
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['Ntvo0kFzSuQ8IFMB1tzA6y05HfP2'],
      dateCreated: Date.now(),
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['Ntvo0kFzSuQ8IFMB1tzA6y05HfP2'],
      dateCreated: Date.now(),
    },
  ];

  for (const user of users) {
    // Use Firestore collection() and addDoc() to add data
    await addDoc(collection(db, 'users'), user);
  }

  for (let i = 1; i <= 5; ++i) {
    const photoData = {
      photoId: i,
      userId: '2',
      imageSrc: `/images/users/raphael/${i}.jpg`,
      caption: 'Saint George and the Dragon',
      likes: [],
      comments: [
        {
          displayName: 'dali',
          comment: 'Love this place, looks like my animal farm!',
        },
        {
          displayName: 'orwell',
          comment: 'Would you mind if I used this picture?',
        },
      ],
      userLatitude: '40.7128°',
      userLongitude: '74.0060°',
      dateCreated: Date.now(),
    };

    // Use Firestore collection() and addDoc() to add data
    await addDoc(collection(db, 'photos'), photoData);
  }
}
