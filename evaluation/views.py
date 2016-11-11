from django.shortcuts import render

def index(request):
    context = {}

    return render(request, 'evaluation/index.html', context)
