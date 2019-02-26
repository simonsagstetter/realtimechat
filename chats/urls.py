from django.conf.urls import url, include
from django.contrib.auth.decorators import login_required

from chats import views

app_name = 'chats'

urlpatterns = [
    url(r'^$', login_required(views.index), name='index'),
    url(r'^(?P<room_name>[^/]+)/$', login_required(views.room), name='room'),
    url(r'^api/', include('chats.api.routing', namespace='api') ),
]
