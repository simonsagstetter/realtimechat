from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^backdoor/admin/', admin.site.urls),
    url(r'^', include('chats.urls', namespace='chats') ),
    url(r'^manage/', include('accounts.urls', namespace='accounts') ),
]
