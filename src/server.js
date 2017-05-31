// // server.js 
//  //1212
// import { renderToString } from 'react-dom/server';
// import App from './index.js';
//  //nihao 
// export default function serverRenderer() {
//     return function * (req, res, next) {
//         res.status(200).send(`
//             <!doctype html>
//             <html>
//             <head>
//                 <title>App</title>
//             </head>
//             <body>
//                 <div id="root">
//                     ${renderToString(<App />)}
//                 </div>
//                 <script src="/client.js"></script>
//             </body>
//             </html>
//         `);
//     };
// }


