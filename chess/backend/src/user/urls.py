from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='gaston-is-wrong'),
    path('about/', views.about, name='what-im-about'),
]
