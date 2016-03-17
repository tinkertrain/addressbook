import Lockr from 'lockr';

// let contacts = [
//   {
//     id: 0,
//     firstname: 'Juan Pablo',
//     lastname: 'Lomeli Diaz',
//     email: 'tinkertrain@gmail.com',
//     country: 'MX'
//   },
//   {
//     id: 1,
//     firstname: 'Christopher',
//     lastname: 'Walken',
//     email: 'test@abc.com',
//     country: 'US'
//   }
// ];

let contacts = Lockr.get('contacts') || [];

export {
  contacts
};
