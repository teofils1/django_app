from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Item
from .serializers import ItemSerializer

class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

class ItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def api_overview(request):
    api_urls = {
        'List': '/api/items/',
        'Detail View': '/api/items/<int:id>/',
        'Create': '/api/items/',
        'Update': '/api/items/<int:id>/',
        'Delete': '/api/items/<int:id>/',
    }
    return Response(api_urls)
