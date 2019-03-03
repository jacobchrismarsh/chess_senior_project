from django.db import models


class Moves(models.Model):
    id = models.AutoField(primary_key=True)
    white_user_id = models.IntegerField()
    black_user_id = models.IntegerField()
    move_number = models.IntegerField()
    pre_move_fen = models.CharField(max_length=128),
    post_move_fen = models.CharField(max_length=128),
    move_algebraic = models.CharField(max_length=32)
    game_id = models.ForeignKey('game.Games', on_delete=models.CASCADE)
    turn = models.CharField(max_length=8)
