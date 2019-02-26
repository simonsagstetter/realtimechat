from django.conf.urls import url

from accounts.views import (
Signin,
Signout
)

app_name = 'accounts'

urlpatterns = [
    url(r'^signin/$', Signin.as_view(), name='signin'),
    url(r'^signout/$', Signout.as_view(), name='signout')
]
