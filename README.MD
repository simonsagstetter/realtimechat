# Real Time Chat Web Application

> Status: in development

**Description:**
A real time chat web application built in django, djangorestframework, channels and native javascript. A user can register and log into the web application. As soon as an admin user gives him the permission is_staff he can join chat rooms and start chatting with other users in the chat room. Only an admin user with the status/permission is_superuser can create chat rooms. The whole communication is implemented via websockets. The messages are sent to an api via javascript and stored in a local db.

**Requirements:**
* Python libaries...
```
  apt-get python3 python3-pip
  pip3 install -r requirements.txt
```

* Additional Software...
```
  apt-get install docker
```
**How to serve:**
* Run docker...
```
  sudo docker run -p 6379:6379 -d redis:2.8
```
* Make migrations...
```
  python3 manage.py makemigrations
  python3 manage.py makemigrations chats
```
* Add as superuser
```
  python3 manage.py createsuperuser
```
* Run the server
```
  python3 manage.py runserver
```
* Open your web browser and got to localhost:8000/

## Tips:
> You can navigate to localhost:8000/backdoor/admin and also add or remove users

> Windows users have to install visual c++ build tools 2014 to install django channels https://www.microsoft.com/de-de/download/details.aspx?id=48159
