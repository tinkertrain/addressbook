import Lockr from 'lockr';

let contacts = [];

if (typeof document !== 'undefined') {
  contacts = Lockr.get('contacts') || [];
}

export {
  contacts
};
