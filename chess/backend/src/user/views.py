from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>What up big dog</h1>")

# Create your views here.
def about(request):
    return HttpResponse("<h1>YOU WANNA KNOW WHAT I'M ABOUT</h1>")
