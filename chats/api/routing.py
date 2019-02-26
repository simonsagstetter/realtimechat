from rest_framework import routers

from chats.api.views import (
ChatAPI,
MessageAPI
)

router = routers.SimpleRouter()
router.register(r'chats', ChatAPI)
router.register(r'messages', MessageAPI)
urlpatterns = router.urls
