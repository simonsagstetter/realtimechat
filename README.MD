# Real Time Chat Web Application

> Status: in development

> Tested on Windows 10 and Linux Ubuntu Desktop 16.04 LTS

**Description:**
A real time chat web application built in django, djangorestframework, channels and native javascript. A user can register and log into the web application. As soon as an admin user gives him the permission is_staff he can join chat rooms and start chatting with other users in the chat room. Only an admin user with the status/permission is_superuser can create chat rooms. The whole communication is implemented via websockets. The messages are sent to an api via javascript and stored in a local db.

## Linux Setup

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

## Windows Setup

**Requirements:**
* Python3: https://www.python.org/downloads/

* Docker Desktop https://hub.docker.com/editions/community/docker-ce-desktop-windows

* Visual Studio c++ build tools 2015 https://www.microsoft.com/de-de/download/details.aspx?id=48159

* Visual Studio c++ build tools 2017 https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools&rel=15

* Python Pip3 Packages/Libaries
```
  aioredis==1.2.0
  asgiref==2.3.2
  astroid==2.1.0
  async-timeout==3.0.1
  attrs==19.1.0
  autobahn==19.2.1
  Automat==0.7.0
  channels==2.1.7
  channels-redis==2.3.3
  colorama==0.4.1
  constantly==15.1.0
  daphne==2.2.5
  Django==1.11.18
  djangorestframework==3.9.2
  hiredis==1.0.0
  hyperlink==18.0.0
  idna==2.8
  incremental==17.5.0
  isort==4.3.4
  lazy-object-proxy==1.3.1
  mccabe==0.6.1
  msgpack==0.6.1
  msgpack-python==0.5.6
  PyHamcrest==1.9.0
  pylint==2.2.2
  pypiwin32==223
  pytz==2018.9
  pywin32==224
  six==1.12.0
  Twisted==18.9.0
  txaio==18.8.1
  virtualenv==16.4.0
  wrapt==1.11.1
  zope.interface==4.6.0
```

## Running the application

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

> If windows users get an error when starting the container it can often help by just restarting docker desktop