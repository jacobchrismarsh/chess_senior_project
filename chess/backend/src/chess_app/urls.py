from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("game/", include("game.urls")),
    path("user/", include("user.urls")),
    path("token-auth/", obtain_jwt_token),
]
