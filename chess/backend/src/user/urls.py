from django.urls import path
from . import user, views

urlpatterns = [
    path("new_user/", user.create_user, name="create-user"),
    path("login/", user.login_user, name="login-user"),
    path("logout/", user.logout_user, name="logout-user"),
    path("is_logged_in/", user.is_logged_in, name="is_logged_in"),
    path('current_user/', views.current_user),
    path('users/', views.UserList.as_view())
]
