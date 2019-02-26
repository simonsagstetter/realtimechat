# Real Time Chat Web Application
### Still in development

**Description:**
A real time web based chat application build with django, djangorestframework, channels and javascript. A logged in user can enter or create chat rooms and communicate with others in real time via websockets.

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
> You can navigate to localhost:8000/backdoor/admin and add a normal user (non superuser status) to test the websockets diffrent web browsers

> Windows users can have troubles with missing visual c++ build tools when installing django-channels
