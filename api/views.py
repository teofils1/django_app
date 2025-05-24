from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Item
from .serializers import ItemSerializer

class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'List': '/api/items/',
        'Detail View': '/api/items/<int:id>/',
        'Create': '/api/items/',
        'Update': '/api/items/<int:id>/',
        'Delete': '/api/items/<int:id>/',
    }
    return Response(api_urls)
