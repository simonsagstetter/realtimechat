from rest_framework import routers

from accounts.api.views import (
UserAPI,
ProfileAPI
)

router = routers.SimpleRouter()
router.register(r'users', UserAPI)
router.register(r'profiles', ProfileAPI)
urlpatterns = router.urls
