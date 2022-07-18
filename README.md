<h1 align="center"> This is my Tasky  App 📚📱📗📘📙🔎 </h1>
<h3 color="red" align="center">A React app to organize my daily activities (well you can name it as a TODO list if you like it) </h3>


  <br/>
  
  
**The main idea of the project was to create a complete stack development to deal Tasks and categories ,  be able to do a CRUD  all the tasks and  categories and finally storage the information with the web server and  clever cloud**

<p margin="20px">The project has been done with React & redux (<b>global state</b>) , React Router v5 (<b>Routing</b>) , Thunk(<b>
middleware to handle synchronous behavior</b>) , Swal and react-alert(<b>Alerts</b>) for the Front-end </p>



<h2 align="center">

![LaptopGIF (2)](https://user-images.githubusercontent.com/66389456/179600154-bcabbf40-6ee5-4897-8fa4-1fb243a9c0f4.gif)

</h2>



**To start with this project in local**


_First step :_

```
 git clone https://github.com/dijevic/Tasky.git
```

_Second step:_

```
 cd Tasky
 code .
```

_install all dependencies:_

```
 npm install
```

_Create a .env.development file:_

- add the following enviroment var for the API local URL :

```
REACT_APP_API_URL=http://localhost:4000/api/v1
```

NOTE : the *PORT* number has to be the same you has setted on the backend .



<br/>
<p align="center"><b>Then you have two ways to use the backend and integrate it with this front-end</b></p>
  <br/>

**first :**

- clone the Backend , follow the backend instructions and run it up :

[tasky-backend](https://github.com/dijevic/Tasky-backend)
<b>(Steps and instructions to use the backend are in the link)</b>

**second option:**


<p>You can also change the enviroment  to use the backend that is alive with railway and clever cloud(DB) </p>

- Change the API url in the enviroments(development enviroment) for:

```
REACT_APP_API_URL=https://tasky-backend-production.up.railway.app/api/v1

```


_You can also see the app alive here :_

<a href="https://taskys.netlify.app/" target="_blank">Go to taskys !</a>

- User to Log into the app :+1:

```
**Email**    : test@tasky.com
**password** : qwerty
```
![GoodJobGIF](https://user-images.githubusercontent.com/66389456/179578383-137e21ed-646e-4126-9de7-bf3c1a6ffafc.gif)

<p> And finally there you go again !</p>





