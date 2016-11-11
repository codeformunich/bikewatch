from django.http import HttpResponse

from django.shortcuts import render



def index(request):
    context = {}

    return render(request, 'evaluation/index.html', context)


def update_map(request):

    lt = request.GET.get('lt', ())
    rb = request.GET.get('rb', ())
    date = request.GET.get('date', '')
    hour = request.GET.get('hour', '')

    data = []
    # data füllen....
    
    json_str = json.dumps(data, sort_keys=True)
    return HttpResponse(json_str, content_type='application/json')
