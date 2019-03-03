from django.db import models

# Create your models here.


class Games(models.Model):
    id = models.AutoField(primary_key=True)
    user_id_1 = models.IntegerField()
    user_id_2 = models.IntegerField()
    white_user_id = models.IntegerField()
    black_user_id = models.IntegerField()
    difficulty_level = models.IntegerField(default=None)
