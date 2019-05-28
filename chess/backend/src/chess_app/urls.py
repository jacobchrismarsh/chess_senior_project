from django.urls import path, include

urlpatterns = [
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("game/", include("game.urls")),
    path("user/", include("user.urls")),
]
