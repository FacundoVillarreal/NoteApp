note-app

BACK-END


1-npm init 

2-npm i express 

3-npm i express-handlebars: motor de plantillas

4-npm i express-session: Se utiliza para crear sesiones dentro del servidor , es decir, cuando el usuario se autentique el va a insertar sus datos, su contraseña y su usuario, pero luego cuando visita otra pagina no queremos que se vuelva a autenticar, es por eso que vamos a almacenar temporalmente sus datos en una sesion.

5-npm i method-override: Este metodo es para poder extender la funcionalidad de los formularios. Por lo general los formularios te permiten enviar metodos post y metodos get, pero existen otros metodos como el put y delete, que se envian a traves de metodos ajax o js pero los formularios no puede hacer eso, es por eso que vamos a utilizar metodos override para utilizar un hack o un pequeño truco para que el formulario pueda enviar metodos put y metodos delete tambien.

5- npm i mongoose: modulo que nos permite unir express con una base de datos; mongoose me permite conectarnos con mongodb, es tan solo el modulo de conexion

6- npm i passport passport-local: Modulo para poder autenticar a mi usuario.

7- npm i bcryptjs: Este modulo nos permite cifrar una contraseña,nos permite aplicar un algoritmo a determinado texto o string y poder convertirlo en un hash, de esta manera la contraseña que el usuario me esta ingresando es cifrada.

8- npm i connect-flash : Este modulo es para enviar mensajes entre multiples vistas, cuando el usuario se equivoque enviar un mensaje, cuando el usuario escriba su nueva contraseña y sea menor a 4 digitos vamos a enviar un mensaje que diga su contraseña debe ser mayor a cuatro digitos, cualquier mensaje.

9-Creo src y un archivo index.js: archivo principal en mi app y database.js: archivo para tener una conexion a una base de datos y este archivo sera utilizado por index.js   

10-$ cd src 
   $ mkdir config helpers model public routes views 
   cada una de estas carpetas tienen una funcion diferente
config: Esta carpeta contiene mis archivos de config 
helpers: Aqui vamos a colocar funciones que mi servidor pueda utilizar y que luego podamos reeutilizar en cualquier parte
model: Aqui vamos a definir como van a lucir los datos que queremos almacenar en nuestra base de datos, tambien vamos a definir el usuario
public: Aqui vamos a insertar todos los archivos estaticos
routes: Aqui vamos a crear las url o las rutas de nuestro servidor 
views: Va almacenar todos los archivos que vamos a enviar al navegador


11-Creo un puerto 

12- Instalo nodemon -D

13-
path.join modulo para unir directorios 
configuro la ubicacion de mi carpeta views:
app.set('views', path.join(__dirname, 'views'))

14-configuro el modulo handlebars:

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutDir: ,
	partialsDir ,
	extname			
}))

.hbs para saber que son archivos de handlebars, utilizo el modulo  exphbs y como es una funcion voy a ejecutarla y adentro voy a darle un objeto de config, este obejto tiene algunas propiedades. estas propiedades sirven para saber de que manera vamos a utilizar las vistas, en nuestro proyecto vamos a tener muchas vistas muchos archivos hmtl que vamos a enviar al navegador, y todos eso archivos van a tener cosas en comun, por ej: una navegacion que se va a repetir en todas las vistas, para no estar escribiendo la navegacion en todos los archivos voy a utilizar una especie de marco una especie de plantilla donde voy a colocar mi diseño principal y luego las partes que van a cambiar.

15- /views creo una carpeta layouts y un archivo main.hbs
 
defaultLayout: aqui va mi archivo principal.
  
layoutDir: por defecto el motor express-handlebars no conoce la direccion de la carpeta layout, entonces vamos a darle la direccion , pero recuerda que ya configure la dirrecion de views, entonces le voy a decir obten la direccion de views y concatenalo con layouts = path.join(app.get('views', 'layouts')).

partialsDir: Partials son pequelas partes de html que podemos reutilizar en cualquier vista. 
pero para guardarlo vamos a crear una carpeta llamada partials.
y tambien necesitamos darle la direccion: 
path.join(app.get('views'), 'partials')

extname: sirve para colocarle que extencion van a tener nuestros archivos: '.hbs', entonces voy a decirle que todos mis archivos terminan en '.hbs'.
Y con esto he terminado mi config. pero no la estamos utilizando aun, falta agregar una linea de codigo

app.set('view engine', '.hbs') = configuramos el motor de plantillas y que motor voy a utilizar .hbs


16- En los middleware voy a confgurar ciertas cosas del servidor que luego me van a servir, 
app.use(express.urlencoded({extendend:false})) 
= Metodo de express, sirve para que cuando un formulario quiere enviarme determinado dato yo pueda entenderlo, cuando un usuario quiera enviarme su email y contraseña  entonces yo quiero recibir esos datos, la opcion extendend: false con esta propiedad aseguro que yo solo quiero sus datos. 

17-
app.use(methodOverride('_method')) este metodo sirve para que los formularios puedan enviar otro tipo de metodos.

18- 
app.use(session({
	secret:'mysrecetapp'
	resave: true,
	saveUninitialized: true
}))
estas configuraciones nos van a permitir luego poder autenticar al usuario y poder almacenar esos datos temporalmente.


19- Routes:

index.js: url de mi pagina principal
users.js: url donde el se pueda autentir 
notes.js: url para que el usuario puedo crear notas
     
20- 

// routes

app.use(require('./routes/index') quiero que requieras este archivos que esta dentro de la carpeta routes llamado index.

21-

Creo mis rutas en user.js
('/users/signin'): ruta para ingresar a la app
('/users/signup'):ruta para registrarme

22-
creo mi ruta para las notas notes.js
('/notes')
esta ruta es para devolver todas las notas que estan en mi base de datos, todas las notas que un usuario ha creado.

23-establezco mi carpeta public en //static files index.js

app.use(express.static(path.join(__dirname, 'public')))
	
24-Conectamos nuestra base de datos

Voy al archivo database.js y rqr mongoose para establecer la conexion de mi app con una base de datos:

luego utilizo su metodo llamado connect : mongoose.connect() que permite conectarnos a una direccion de internet.

mongoose.connect('mongodb://localhost/notes-db'), en este caso mongod se ha instalado en mi propia maquina local. mongoose conectate al localhost y al nombre de la datebase, si la base de datos existe se va a conectar, si no existe va a crear una nueva,
,{
		

}  

Finalmente añadimos un objeto para configurarlo, necesitamos de estas configuraciones porque el modulo esta actualizandose constantemente y necesita las siguientes configuraciones si no me va a dar un error por consola:
{
useCreateIndex: true,
useNewUrlParser: true,
useFindAndModify: false
})

Cuando se conecte quiero ver un mensaje por consola voy a ejecutar una promesa:

.then(db => consolge.log('Db is connectd') )
cuando te conectes muestrame un mensaje por consola
.catch(err => console.error(err))
caso contrario si obtuvo algun error, captura ese error y muestramelo por consola 	

para ejecutar ese codigo tenemos que llamarlo desde index.js en la seccion initiliazations
req('./database') 


VIEWS TEMPLATE ENGINE:


Aqui vamos a configurar todas las vistas, vamos a dejar todos los archivos que sean necesarios para enviar al front-end

1-
//Views

creo dos archivos 
index.gn
about.hbs 
y condiguro las rutas.
modifico el main.hbs

2-
creo una carpeta users
aqui voy a tener dos vistas una para signin y signup, entonces las creo y desde mi routes user las renderizo.

3-Estilizamos con bootstrap


4- 
Por lo general tambien vamos a tener nuestro propio css; entonces:
creo mi carpeta css dentro de la carpeta public, y creo un archivo main.css, luego lo especifico en mi main.hbs

5- Agrego un degradado en css .



CRUD


1-Creamos una ruta en note.js y lo renderizamos 
.get('/notes/add',()=>{
	render('notes/new-note')
})
	

2-dento de new-note creamos un formulario para las nuevas notas:

en el form action voy a escribir cuando un usuario inserte los datos aqui es donde voy a enviar la direccion de internet.

-cada input tiene una propiedad llamada "name", esta propiedad name es la manera en la que el servidor la va a recibir, es decir ej; name = "title", el servidor lo va a recibir con una propiedad llamada tilte y el valor de lo que el usuario ha escrito.

-btn type:"submit"; esta propiedad es para cuando el usuario de un click se ejecute el evento del formulario y el formulario enviara una peticion al servidor .


- voy a crear la ruta especifica para recibir los datos del formulario: .post('/notes/new-note'),
en el formulario agrego la ruta a donde voy a enviar los datos action='/notes/new-note' y el motedo que voy a utilizar para enviar los datos: menthod="POST".

- Ahora voy a manejar los datos que recibo del formulario:

.post('/',(req, res)=>{
	console.log(req.body)
})

Los datos que recibo son un obejeto, con esos datos puedo hacer destructurin, es decir sacar cada propiedad por separado en una constanste o variable a parartir de un objeto: const {title, description} = req.body ;
de ese objeto tan solo quiero el titulo y la descripcion. 

ahora lo voy a validar:
creamos un arreglo y vamos a colocar los mensajes de errores en caso de que existan:
const errors = [];
y vamos a validar los campos =
si no hay un titulo o esta vacio vamos a insertar en este arreglo de errors un nuevo objeto que tendra una propiedad llamada text y como valor: please...
if(!title){
	errors.push({text: 'Please Write a Title'}) 		
}	

y con esto estamos enviando un mensaje al usuario, pero puede pasar que el usuario no me envie una descripcion
entonces le digo al arreglo de errores voy a insertarle un nuevo mensaje que diga please...

if (!description){
	errors.push({text: 'Please Write a Description'})
}


con esto ya tenemos nuestros dos errores validados y con esto estamos guardando los mensajes que vamos a enviarle al usuario, pero no sabemos que le vamos a enviar, entonces voy a validar: 

si la longitud de errores es mayor a 0 es decir hay algun error le voy a renderizar notes/new-note, esto es el mismo formulario pero tambien le voy a pasar los errorres a traves de un objeto, esto lo hago para que los pueda mostrar en la vista tambien, lo puedo mostrar en forma de alerta . Ademas quisiera que el usuario no vuelva a tipiar el titulo y la descripcion, entonces le paso title y description.     
if(errors.length > 0){
	res.render('notes/new-note', {
	errors,
	title,
	description
})
}else{res.send('ok')};

con esto lo que estamos haciendo es que si hay algun error vamos a volver a mostrarle los campos que estan mal y algunos mensajes de errores, y en caso contrario envia un mensaje de ok

-Para mostrar los errores nosotros podemos colocar alertas de bootstrap arriba de nuestro formulario;
	
Como estamos recibiendo datos vamos a utilizar la sintaxis de hbd vamos a validar con un each
esto es como decirle si extiste un error empieza a recorrer ese arreglo de errores y por cada recorrido me vas a generar una plantilla de error () alert
{{#each}}
alert
{{/each}}
   
3-
Para almacenar los datos en nuestra base de datos hay que crear un models; carpeta models aqui vamos a definir como van a lucir los datos y apartir de como van a lucir nosotros podemos empezar a insertar datos alli
Entonces creamos un archivo Notes.js

Requerimos mongoose para crear shema de datos
desde mongoose tan solo quiero el {Schema}

const mongoose = rqr('mongoose')	  
const {Shema} = mongoose;

Definimos que propiedades van a tener mis notas, las notas van a tener 4 datos; title, description, date,

default: date.now es para generar una fecha automaticamente, es decir si yo creo una nota con un titulo y una descripcion y no le coloco una fecha con esta propiedad le va a colocar una fecha automaticamente.   
required para que no este vacio.
 	
const NoteSchema = new Schema ({
title:{type: String, required: true},
})

Lo guardarlo en una constante, este esquema es solo para ddecirle a mongodb como va a lucir mis datos aun no sabe el como crear el modelo, entonces: 
module.exports para utilizar este modelo de datos en otras partes de mi app, y voy a utilizar desde mongoose el modelo, al utilizar el modelo necesito dos parametros, '','' , la nota y el esquema que he creado:
 
module.exports = mongoose.model('Note', NoteSchema)

con esto ya tengo un dato que puede ser utilizado para yo poder almacenar una nueva nota, actualizarla , etc.

- Vamos a probrarlo, vamos a requerir este nuevo modelo de datos: 

routes/notes.js

requiero desde subir un nivel entro a la carpeta models y tomo el archivo note, al tomar este modelo de datos lo guardo en una constante,

const Note = rqr('../moduls/Note')
gracias a este Note(const) yo voy a poder decir note, quiero ingresar un nuevo dato save, quiero actualizar un dato update, quiero eliminar un dato .delete, gracias a este note yo voy a utilizar sus metodos.
  

Entonces para crear un nuevo dato voy a tener que instanciar esa constante, porque esa constante es una clase, al crear un schema estamos creando una especie de clase y eso tenemos que instanciar para crear un nuevo dato:  
new Note , con esto estoy creando un nuevo dato pero recuerda que quiero pasarle el titulo y la descripcion {}, con esto ya tengo una nota nueva y puedo almacenarla en una constante newNote esta es mi nota nueva.  



 else{
	const newNote = new Note({title, description}) 		

}

Tan solo instanciando la clase y pasandole los datos el ha creado un nuevo dato para guardar en mongodb, tenemos que empezar a guardarlo con el metodo save

newNote.save();

cunado estamos guardando u operando con una base de datos, nosotros no sabemos en que momento va a terminar la operacion de la base de datos y esto es muy importante en node porque  node esta enfocado en ser asincrono, en ir ejecutando muchas tareas a medida que otros procesos terminan, es decir, newNote.save lo que esta haciendo es guardar el dato dentro de mongodb y esto va a tomar algunos segundos, y como yo no quiero que mi servidor se mantenga esperando a que todo esto termine porque mi servidor tiene que hacer otras cosas como escuchar las peticiones de mis usuarios, pues voy a decirle que esto es una peticion asincrona, debo agregarle a mi funcion principal la palabra clave async 
esta palabra clase le dice a la funcion que aca habra procesos asincronos, entonces yo para poder identificar esos procesos asincronos, simplemente le agrego una palabra clave para identificar esos procesos asincronos simplemente le agrego await, ahora mi codigo sabe que esto de aqui va a tomar algun tiempo de ejecucion, cuando termine puedes continuar con el resto de codigo que este debajo, cuando termine de guardar voy a redirecionarlo a otra vista, 
res.redirect('/notes') 

esta ruta sera encargada de consultar todos los datos desde la base de datos, cuando guarde un nuevo dato luego se le mostrara al usuario esa vista, con la lista de los datos guardados dentro de la base de datos.

Ahora vamos a consultar los datos que tenemos guardados en nuestra base de datos,:

tenemos el modelo de datos Note que nos permite operar con la base de datos, este es el schema, entonces yo le digo desde las notas que tengo en la base de datos, quiero buscar, todos los datos .find(), esto tambien es un proceso asincrono, await, cuando termine la consulta el me da a devolver los datos y los voy a almacenar en una constante llamada  notes, una vez los almacene voy a poder retornarlos a una vista.  res.render

{
const notes =	await Note.find()
res.render('notes/all-notes', {notes})
}  
resnderiza desde la carpeta notes el archivo all-notes y pasale los datos de las notes. 
 


-Creamos la funcion de editar mis notas:



Al hacer click en el enlace de el lapiz lo voy a redireccionar a una ruta /notes/edit/_id
al obtener el id voy a saber que nota editar.
Al hacer esto voy a estar creando una ruta para cada una de estas tareas 

creamos la ruta para editar notas, para enviarle un formulario. 



router.get('/notes/edit/:id', async(req, res)=>{
const note=      await	Note.findById(req.paramas.id)
	res.render('notes/edit-note', {})
}) 

si el usuario quiere editar algo el tiene que saber la diferencia entre los datos viejos y los que quiere actualizar, 


Note.findById(req.paramas.id)= con esto le estoy pasandado el id que me esta enviando usuario , y .findbyid es una consulta a la base de datos, 

con esto le estoy pasando los datos a mi nuevo formulario.

-creamos la ruta del formulario de edit note,

para utilizar el metodo put creamos un input oculto dentro del formulario edit note, este input sera utilizado para que el servidor sepa que vamos enviar un metodo put, 

input type="hidden" name="_method" value="put"
el name es necesario, es la manera en el que el servidor va a revisar este input, el midleware methodOverride se esncarga de revisar por el input oculto

entonces creamos la ruta put:

router.put('/notes/edit-note/:id', (){
	const {title, description} = req.body;
await	Note.findByIdAndUpdate(req.params.id, {title, description})
res.redirect('/notes')
})

como estoy recibiendo desde el req body valores ya que es un formulario, pues voy a obtener tanto el tilte como la descrition entonces lo voy a guardar en una const,
abajo voy a empezar a guardar o acualizar esos datos, 
desde el modelo Note voy a buscar por id y luego voy a actualizar(le paso el id req.paramas.id, y los nuevos datos que quiero actualizar : title, description) es un metodo asincrono, una vez actualize vamos a redireccionarlo a las notas,
 
-Ahora vamos a darle la funcion de eliminar nota: 




Ahora nos vamos al button delete y lo enlasamos con un formulario para que pueda enviar una peticion delete a traves de el input oculto, button dentro del formulario 
form action =.....?_method=DELETE method=post
input type=hidden name=_method value=DELETE 
button
EL BOTON PARA QUE PUEDA EJECUTAR EL FORMULARIO DEBE SER DE TYPE SUBMIT
 Y este formulario va a ejecutar una peticion delete , a traves del metodo override que reemplaza el metodo post con un metodo delete.
 

router.delete('/notes/delete/:id', (req,res){
await	Note.findIdAndDelete(req.params.id)		
res.redirect('/notes')
})

desde el modelo de datos Note quiero buscar por ID y eliminar
findIdAndDelete ()con esto estoy asegurando que lo estoy eliminando desde la base de datos , pero tengo que pasarle el id y esta es una peticion asincrona.


-Vamos a guardar unos mensajes con connect-flash,  gracias a este modulo podemos enviar mensajes entre multiples vistas,   	de esta manera cuando agregemos un dato le mostramos un mensaje al usuario, etc.

/index.js
const flash = rqr('connect-flash');

y para utilizarlo tmb es un midleware, 

app.use(flash());


Cuando estamos enviando un mensaje yo quiero que todas las vistas tengan accesso a ese mensaje ya que si el usuario navega a otra pagina quiero seguir mostrandole ese mensaje apesar de navegar a una vista que no conozco, entonces voy a crear una variable global que almacene un ese mensaje flash: 

//Global variables
app.use(req, res, next)=>{
req.locals.success_msg =req.flash('success_msg')
req.locals.error_msg =req.flash('error_msg')
next()
}
 	 
Para guardar un dato de manera global req.locals.y el nombre que le queremos dar a la variable, esta variable va a almacenar los mensajes que envie a traves de flash, que se llamen success msg

vamos a probarlo


en la parte de guardar notas /notes.js

cuando yo estoy agregando una nuevo nota quiero mostrarle un mensaje al usuario: 
vamos a crear un mensaje de flash:
req.flash('success_msg', 'Note added Successfully'), 
creamos un mensaje de exito y el valor del mensaje.


Para ver este mensaje al igual que como hicimos con los errores lo tenemos que recorrer, pero si recuerdas cuando hicimos el de los errores tuvimos que pasarlo a la vista que estabamos renderizado para poder mostrarlo, no vamos a tenr que hacerlo con flash porque estamos creando una variable global: 



en la vista layout:
Todas mis vistas quisiera que pueda mostrar distintos mensajes. 
Creamos un partials messages.hbs, lo que va a hacer es recorrer esta variable global llamada success_msg, utilizamos un if con el nombre de la variable, success_msg
adentro colocamos alertas de bootstrap, cerramos {{/if}}.
 Utilizamos if porque los mensajes es una variable unica, no es un arreglo, y no hace falta reccorrerlo. es como decirle si existe un mensage sastifactorio pinta una alerta con el texto del mensaje. 
Para utilizarlo:
vamos a la carpeta layouts main.hbs
{{> messages}}llamamos el partials, no necesitamos colocar el nombre de la carpeta porque ya lo habiamos configurado cuando empezamos a definir como se iba comportar .hbs, ya conoce la direccion de partials.

creamos mensajes de error y editar.





REGISTER/SING UP:

En esta seccion vamos a empezara a autenticar nuestros usuario vamos a empezar a agregar un login y singup, para eso vamos a utilizar nuestro modulo passport pero adicional a eso tmb a almacenarlo dentro de la base de datos y luego vamos a decirle a los usuario cual pagina estan autorizados para ver y cual no.


Necesitamos que cada usuario tenga sus propias notas y no interfieran con la del resto, para hacer eso tenemos que resgistrar un usuario nuevo:


routes//users.js 


signIn para poder hcaer que el usuario ingrese a la app y el signUp es para que usuario se pueda registar.

signup.hb=
creamos el formulario bootstrap


creamos la ruta a donde vamos a recibir los datos del formulario:

router.post('/users/signup',()=>{});
  
creamos un arreglo errors para insertar un text con errores, y creamos condicionales if 

nosotros no tenemos que volver a pintar o recorrer el error en la vista de signup porque en new-note.hbs ya tenemos un each errors, entonces creamos un partials con este codigo... 
en partials nuevo archivo : errors.hbs y aqui pegamos el codigo each, y en layout main.hbs llamamos el error abajo de messages colocamos el partials errors {{>errors}}.
cuando renderizamos a signup, le enviamos los datos errors, name, email, etc y para verlos en el formulario debo colocarle value y el nombre del valor="{{name}}",valor="email", etc.


-vamos a crear un schema users.js

Voy a requerir modulo mongoose, 

desde mongoose solo quiero tu schema, 

con esto voy a crear un nuevo schema que va a ser para los usuarios. 
los usuarios van a tener los sigientes datos,


new Schema({

	name:{type: String, rqr:true},
	email:{type="String, rqr true"
})																lo guardamos en una constante para poder reutilizarlo:

y lo exportamos:

module.exports = mongoose.model('User','UserSchema')
user Schmea y nombre de moldelo.

								Hay que cifrar las contraseñas: creamos 2 metodos																		Para crear metodos para este modelo de datos :
llamamos el esquema UserSchema.methods.encryptPassword.
este metodo va a recibir una contraseña y la voy a cifrar con modulo bycript.js, este modulo tiene un algoritmo que nosotros podemos utilizar para cifrar contraseñas, lo requerimos, 

ahora utilizamos el modulo dentro del metodo, este modulo se puede utilizar de manera asincrona, igual que la base de datos que toma su tiempo para generar o para hacer una tarea: bcrypt tambien puede ser asincrono.
bcrypt.gensalt(10) es para generar un hash y le digo que aplique 10 veces el algoritmo y que no consume tantos recursos.
cuando termine me va a devolver este hash y voy a utilizarlo = const salt, luego voy a tener que darselo a la contraseña y ahi es donde se va a generar la contraseña cifrada,
brypt.hash(password, salt), y con esto voy a conseguir la contraseña cifrada y  esto es lo que voy a retornar return hash. este metodo nos va permitir cifrar la contraseña, nosotros le damos la contraseña y nos a va retornar la contraseña cifrada.
Si la contraseña esta cifrada en nuestra base de datos, luego el usuario como se va a poder logear ya que la contraseña es distinta a la que el usuario me va a insertar?. este mismo modulo permite comparar la contraseña que me de el usuario con la contraseña cifrada,  de manera practica lo que hace es volver a cifrarlo, es decir lo que el usuario me ingresa lo va volver a cifrar y lo va a comparar con lo que tengo en la base de datos  :

UserSchema.methods.matchPasswprd = function (password) {
	
}  
Este metodo va a tomar la contraseña y lo va comparar con lo que tengo en la base de datos. uso la funcion de ES5 porque  necesito que la contraseña haga referencia a un elemento del UserSchema, a esta funcion cuando la ejecutamos puede acceder a las propiedades de UserSchema a traves de la palabrea clave this,  voy a retornar un true o false
return bcrypt.compare(password, this.password) voy a utilizar el motodo compare y le paso dos datos: la contraseña que me pase el usuario y la que tengo guardada en el modelo datos,
y esto va a tomar su tiempo es una funcion asincrona.      
 								Resumen: Cada usuario debe llenar estos campos(input), para nosotros poder cifrar una contraseña vamos a crear un metodo, voy a llamar este metodo del user encryptPassword y le voy a dar una contraseña que me va a retornar de nuevo una contraseña cifrada, luego utilizamos matchPassword cuando estemos logeando al usuario, para poder compararla con la base de datos
lo utilizamos:

instanciamos el modulo del usuario:

const User = rqr('../models/User') este es el modelo de datos, como es el modelo de datos yo voy a poder utilizarlo para guardar un nuevo dato, 
const newUser = new User({name, email, password})  		await newUser.save(); 						voy a crear un nuevo usuario con que datos, con el name, email ,password, y 	con esto me va a generar un objeto nuevo y lo guardamos. y guardamos la contraseña cifrada newUser.password = await newUser.encryptPassword(password);
es decir yo creo un objeto luego ese objeto en su propiedad pasword lo voy a reemplazar por la contraseña cifrada utilizando el metodo encryptPassword y luego lo guardo.
y luego mando un mensaje flash
req.flash('success_msg', 'You are registered')
luego lo redireccionamos al signin ya que esta registrado
res.redirect('/users/signin');


validamos el email, :
buscamos un dato email,  
User.findOne({email: email})
cuando termine de buscar el dato me va a retornar posiblemente el correo  del usuario , entonces comparo si email user existe o sea si a encontrado una coincidiencia con el correo;
if(emailUser){
req.flash('error_msg', 'The Email is already in use');
res.redirect('/users/signup')
}
Registro listo.



SIGN IN
USER'S SIGN IN

En esta seccion vamos a ver como logear a un usuario.
Ahora vamos a autenticar al usuario, si el usuario esta registrado en nuestra base de datos va a poder ingresar a nuestra aplicacion sino vamos a enviarle un mensaje de error
LOGIN = INICIAR SESION


Ahora queremos enviar estos datos al backend,

						
-Con lo paquetes passport y passport-local vamos a poder autenticar al usuario, este paquete nos va permitir guardar los datos del usuario en una sesion, de esta manera nosotros no vamos a pedir a cada momento los datos del usuario, 

creamos un archivo en config passport.js instalamos el modulo passport.
Con este modulo vamos a utilizar una manera de autenticar al usuario, puede ser con google , twitter, github, etc. en este caso vamos a utilizar la autenticacion de manera local.
rqr passport-local tan solo queremos la Strategy de autenticacion, 

utilizamos un metodo passport.use() que es para poder definir una nueva estrategia de autenticacion y le pasamos algunos parametro por ej; que parametro el usuario me va a enviar cuando se quiera autenticar, ej: contraseña, nombre, email, etx.  usernameField(A traves que se va a autenticar el usuario):email, adicional a esto voy a necesitar una funcion para poder validarlo, aca vamos a recibir los datos, correo, contraseña y un callback para terminar con la autenticacion, en este momento estamos definiendo la autenticacion, esto de aqui luego lo voy a tener que utilizar en una ruta.
Adentro voy a empezar a interactuar con la base de datos, ej: ver si el usuario quiere ingresar con correo existente, validar contraseña ,etc.. voy a tener que consultar con la base de datos, por eso voy a traer el modelo user. User =rqr('../models/User')   
Ahora busco en correo que me esta dando el usuario en la base de datos: findOne, esto va a llevar tiempo por eso le digo awayt, cuando esto termine va a devolver un resultado, posiblemente un usuario porque estoy buscando un usuario a traves del correo.

Luego hago una validacion: si no existe un usuario en la base de datos entonces siginifica que esta persona se esta intentando autenticar  sin un correo valido, entonces voy a retornar todo este proceso de autenticacion con este callback done, es decir este callback sirve paa terminar el proceso de autenticacion, puede terminar con algun error, con ningun usuario, etc. le voy a envar null para el usuario, false para   el error(usuario inexistente),  y el mensaje {message: 'Not User found.'}.
Pero puede pasar que el si haya encontrado un usuario else{}
Si encontro el usuario vamos a validar su contraseña: utilizamos el modelo que habiamos creado matchPassword(password) recibe una contraseña y me retornaba true o false si existia esa contraseña o no,  

 const match = await User.matchPassword(password)  

le digo si match es verdad voy a retornar con el callback done null para el error y el usuario, el primer dato es para retornar un error si le devuelves null significa que no ha habido ningun error, si devuelvo false significa que no hay ningun usuario, y luego un mensage si es necesario, en el siguiente caso le estoy colocando null porque no hay ningun error y le estoy devolviendo user ya que esto me devolvio true significa que la contraseña que el usuario ha ingresado mas el correo que se ha encontrado entonces todo esta valido, por eso devuelvo el usuario, pero que pasa si el nada es correcto else{}, significa que su contraseña es incorrecta entonces le voy a retornar un mensaje: return done(null, false, {message: 'Incorrect Password'}) null porque no ha habido ningun error, false porque no ha habido ningun usuario.      
	 
 if(match){
  return done(null,user)
}else{
  return done(null, false, {mesagge: 'Incorrect Password'})	
}
  
.use(new LocalStrategy({ 
	usernameField:'email'
    
}, async (email, password, done) => {
const user = await User.findOne(email: email)
if(!user){
   return done()	
}else{

}
}))

De esta manera va a funcionar la autenticacion, el usuario va a tener que ser almacenado en algun lugar y es por eso que nosotros vamos a tratar de utilizar una manera de poder almacenaro en una sesion entonces vamos a utilizar  otra configuracion que solicita passport llamada serializeUse toma un usuario y un callback, lo que hacemos aca va a ser ejecutar el callback con un error (null porq no hay ninguno) y con un user.id es decir que el momento que el usuario se autentique nosotros vamos a almacenar en una sesion el id del usuario para que en proximas sesiones nosotros podamos evitar pedirle que se logee todo el tiempo, 
((user, done) =>{
 donde(null, user.id)					
})   

ahora creamos otro metodo que esta relacionado con el anterior: 
passport.deserializeUser() esto hace el proceso inverso, toma un id y genera un usuario y hace una busqueda a la base de datos y lo que vamos a hacer es tomar el id de la sesion. es decir si hay un usuario en la sesion lo que voy a hacer es buscar por id ese usuario , en la busqueda puedo obtener un error o encontrarlo , si lo encuentro voy a obtener ese usuario y lo voy a retornar con el callback : done(err,user) si hay un error lo devuelvo ysi hay un usuario lo devuvlo tambien,.
En el proceso anterior si el usuario se logeaba lo almacenamos en una sesion su id luego si nosotros queriamos deserealizar el usuario el proceso inverso tomamos el id y generamos un usuario para poder utilizar sus datos



Toma un id y un callback: ((id, done) =>{
	User.findById(id, (err,done)=>{
	done(err, user)	
 })
})

Con esto ya tenemos definido su manera de autenticar y vamos a poder validar cada momento si un usuario se quiera logear en nuestra aplicacion para utilizarlo tenemos que aplicar varias configuraciones en index.js :

-requerimos passport,
 
-vamos a middleware y configuramos:
app.use(passport.initialize())	 
app.use(passport.session())para q utilize la session de expres
app.use(flash())despues de passport porque es posible que envie mensajes con passport.
Ahora importamos nuestro archivo de autenticacion:
//initiliazations rqr('./config/passport');
con esto esta terminada nuestra autenticacion pero tenemos que crear las rutas:

//routes user.js

.post('/users/signin', ) desde esta ruta voy a tratar de autenticar al usuario y aqui no tengo que escribir una funcion simplemente tengo que importar passport nuevamente.
const passport = rqr('passport'), porque utilizo passport nuevamente aqui? porque anteriormente hemos creado una estrategia de autenticacion passport.authenticate('local*') aqui le tengo que dar el nombre de la autenticacion por defecto es local, entonces le pasamos local* y al darle eso  el va a aplicar toda la autenticacion, adicional a esto puede pasar algunas cosas puede que el usuario sea  correcto, puede que el usuario este insertando datos mal, entonces notros tenemos que decirle que es lo que tiene que hacer passport a donde lo debe redireccionar: si el usuario me esta enviando su usuario y su contraseña correcto entonces es un 
successredirect: '/notes', para que empieze a crear notas

puede que el usuario este insertando mal el usuario o contraseña entonces es un :

failureRedirect: '/users/signin'
para que se vuelva a registrar quizas hizo algo mal     	  
luego
failureFlash: true sirve para que en la autenticaion nosotros podamos enviarle mensages flash.
 	

Creamos la navegacion, creamos un partials con la navigation 


Creamos una ruta para el logout.

Creamos un archivos en la carpeta helpers llamado auth.js

Creamos un helpers que va a ser un objeto con multiples metodos, un metodo va a comprobar si el usuario esta autenticado o no, en teoria es un midleware que es una funcion que se ejecuta dependiendo lo que le pasemos, yo aqui qiero comprobar si el usuario esta autenticado si existe una sesion o no, es por eso que voy a tomar un req, res, next
en passport tenemos un metodo que hace esta autenticacion, revisa si existe una sesion o no.
la funcion que viene desde passport se llama is.Authenticated
si el usuario se ha logeado retornamos next que continuo con la siguiente funciom.
si no se ha logeado pues nosotros enviamos un error y lo redireccionamos a una ventana de logeo. (mensaje de error y redirect) 



helpers.isAthenticated = (req, res, next)=>{
   if(req.isAutehnticated()){
	return next()
}else{req.flash('error_msg', 'Not authorized'); res.redirect('/users/signin')}	  
}) 



-Creamos un mensaje de bienvenida al usuario, 
Creamos una variable local: 

cuando passport autentica un usuario el guarda la informacion de ese usuario en un objeto dentro de request 
res.locals.user = req.user || null;

vamos al archivo all-notes.hb y llamamos a la variable global con el nombre del usuario:

h1> Hello {{user.name}}

con esa variable global podemos utilizarla para mostrar determinadas rutas , es decir, si el usuario ya esta logeado no deberia mostrale las rutas de signin y signup. Y si no esta logeado no deberia mostrale las rutas de notas.

vamos a partials navigation...
  
creamos una validacion if.



Personal Data for Users:

Al ingresar con un usuario y crear una nota esa misma nota queda guardada para todos los usuario y no queremos que eso pase porque cada usuario deberia tener sus propias notas.

vamos al modelo de Notas y vamos a enlazar cada nota con el id del usuario

cramos un tipo de dato string, y este user va almacenar el id del usuario  en el momento que se crea una nota nueva.   		
user:{type: string}.
 
ahora vamos a rutas de notes:
seccion post new note, antes del save:

esta propiedad user es igual al req.user.id utilizamos esta propiedad porque passport ha autenticado al usuario lo esta guardando dentro de request user todos los datos del usuario pero en este caso yo slo quiero el id para enlazarlo con la nota.   

newNote.user = req.user.id


- al momento de traer todas las notas voy aplicar una consulta: si voy a buscar todas las notas tan solo traeme las notas que coincidan con el user id, es decir con esta propiedad user de todas las notas tan solo quiero las que coincidan con el usuario que se ha autenticado y lo que hara es traerme las notas pj: tan solo de ryan, tan solo de juan, tan solo las notas de ese usuario. no todas las notas... 

Note.find({user: req.user.id}) 























































	 













  

































