# Generated by Django 2.2 on 2019-06-06 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('move', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='moves',
            name='post_move_fen',
            field=models.CharField(default='', max_length=128),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='moves',
            name='pre_move_fen',
            field=models.CharField(default='', max_length=128),
            preserve_default=False,
        ),
    ]
