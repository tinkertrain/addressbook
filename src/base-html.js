import { capitalizePath } from './utils/utils';

export default function template(htmlRenderedByReact, pathname, assets) {
  return `
<!doctype html>
<html lang='en'>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AddressBook</title>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css">
    <link rel="stylesheet" href="/style.css"/>
  </head>
  <body>
    <div id='root'>${htmlRenderedByReact}</div>
    <script src='${assets.main}'></script>
  </body>
</html>
`;
}
