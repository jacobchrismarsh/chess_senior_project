from django.urls import url, include

urlpatterns = [
    url('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
