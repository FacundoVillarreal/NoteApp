// // imports

// importScripts('/js/sw-utils.js');

// const STATIC_CACHE    = 'static-v2';
// const DYNAMIC_CACHE   = 'dynamic-v2';
// const INMUTABLE_CACHE = 'inmutable-v2';

// const APP_SHELL = [
//     '/',
//     'css/main.css',
//     'img/icon.png',
//     'js/app.js',
//     'js/sw-utils.js',

// ];

// const APP_SHELL_INMUTABLE= [
//         'https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/lux/bootstrap.min.css',
//         'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
//         'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
//         'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css',
//         'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css'

// ];

// // Instalacion del SW

// self.addEventListener('install', e => {
//     const cacheStatic = caches.open(STATIC_CACHE).then(cache =>
//         cache.addAll(APP_SHELL));

//     const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>
//         cache.addAll(APP_SHELL_INMUTABLE));

//     e.waitUntil(Promise.all([cacheStatic,cacheInmutable]));
// });

// // Active del SW

// self.addEventListener('activate', e => {
//     // Proceso para que cada vez que yo cambie el SW me borre los cache anteriores que no me van a servir.

//     const respuesta = caches.keys().then(keys =>{
//         keys.forEach(key =>{
//             if(key !== STATIC_CACHE && key.includes('static')){
//                return caches.delete(key);
//             }
//             if(key !== DYNAMIC_CACHE && key.includes('dynamic')){
//                return caches.delete(key);
//             }
//         });
//     });

//     e.waitUntil(respuesta);
// });

// // Estrategia del cache:

// self.addEventListener('fetch', e =>{

//     const respuesta = caches.match(e.request)
//         .then(res => {
//             // Evaluamos si el res existe:
//             if( res ) return res; //Si existe la respuesta hago un retorn de la respuesta

//             // Si entro a este punto quiere decir que NO existe el archivo que me esta pidiendo, entonces tengo que ir a la red
//             console.log('No existe,', e.request.url);

//             //Tengo que ir a la web y buscar ese archivo: tengo que hacer un fecth y traer ese archivo.
//             return fetch( e.request ) //Tengo que regresar esa respesta por eso utilizamos el return.
//                     .then( newResp => {//Si este then se logra hacer quiere decir que encontro el archivo.
//                         //Entonces si no existe, lo obtenemos de la web y lo grabamos en el cache:
//                         caches.open(DYNAMIC_CACHE)
//                             .then(cache =>{
//                                 cache.put( e.request, newResp );
//                                 //Luego de poner el nuevo elemento en el cache nuevo aqui podemos poner la funcion de limpiar cache.

//                         });
//                         return newResp.clone();
//                     });

//         });

//     e.respondWith(respuesta)
// });



















/* -----------------NO FUNCIONA EL SW------------ */

// self.addEventListener("install", (e) => {
//   // GUARDAR APP SHEL A LA HORA DE INSTALAR EL SW
//   // APP SHEL = ES LO QUE LA APLICACION NECESITA A FUERZA PARA QUE LA APP FUNCIONE
//   const cacheProm = caches.open("cache-v1")
//     // Guardamos el app shell en el chache:
//     .then((cache) => {
//       return cache.add(fetch(e.request).then(resp => resp));
//     });

//   e.waitUntil(Promise.resolve(cacheProm)); // Espera hasta que cacheProm se resuelva.
// });

// self.addEventListener("fetch", (e) => {
//   const respuesta = caches.match(e.request).then((res) => {
//     // Evaluamos si el res existe:
//     if (res) return res; //Si existe la respuesta hago un retorn de la respuesta

//     // Si entro a este punto quiere decir que NO existe el archivo que me esta pidiendo, entonces tengo que ir a la red
//     // console.log('No existe,', e.request.url);
// console.log('No existe,', e.request.url);

//     //Tengo que ir a la web y buscar ese archivo: tengo que hacer un fetch y traer ese archivo.
//     return fetch(e.request) //Tengo que regresar esa respesta por eso utilizamos el return.
//       .then((newResp) => {
//         //Si este then se logra hacer quiere decir que encontro el archivo.
//         //Entonces si no existe, lo obtenemos de la web y lo grabamos en el cache:
        
//         caches.open("cache-dinamico-v1").then((cache) => {
//           cache.put(e.request, newResp);
//           //Luego de poner el nuevo elemento en el cache nuevo aqui podemos poner la funcion de limpiar cache.
//           // limpiarCache(CACHE_DYNAMIC_NAME, 50);
//         });
//         return newResp.clone();
//       });
//   });

//   e.respondWith(respuesta);
// });
















var cacheName = 'static_v3';

self.addEventListener('install', function(e) {   
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.add(    
                '/'
            ).then(function() {
                self.skipWaiting();
            });
        })
    );
});
// Active del SW

self.addEventListener('activate', e => {
    // Proceso para que cada vez que yo cambie el SW me borre los cache anteriores que no me van a servir.

    const respuesta = caches.keys().then(keys =>{
        keys.forEach(key =>{
            if(key !== cacheName && key.includes('static')){
               return caches.delete(key);
            }
        });
    });

    e.waitUntil(respuesta)

})


self.addEventListener('fetch', function(event) {   
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {              
                return response;
            }          
            return fetch(event.request);
        })
    );
});