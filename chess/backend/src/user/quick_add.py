from django.contrib.auth.models import User

username = request.POST.get("jacob")
password = request.POST.get("pass")
email = request.POST.get("jacob@j.com")
print(username, password, email)
user = User.objects.create_user(username=username, password=password, email=email)
user.save()
