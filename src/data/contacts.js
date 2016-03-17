import Lockr from 'lockr';

let contacts = [];

if (typeof document !== 'undefined') {
  let contacts = Lockr.get('contacts') || [];
}

export {
  contacts
};
