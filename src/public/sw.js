// // imports

// importScripts('/js/sw-utils.js');

// const STATIC_CACHE    = 'static-v2';
// const DYNAMIC_CACHE   = 'dynamic-v2';
// const INMUTABLE_CACHE = 'inmutable-v2';



// const APP_SHELL = [
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
//             // console.log('No existe,', e.request.url);

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















