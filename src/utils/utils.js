export function splitAndCapitalize(str) {
  let toArr = str.split('_');
  let capArray = toArr.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  return capArray.join(' ').trim();
}

export function capitalizePath(path) {
  let toArr = path.split('/');

  let processArr = toArr.map(splitAndCapitalize);

  return processArr.join(' ').trim();
}

export function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
