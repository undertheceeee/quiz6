from rest_framework.decorators import api_view
from rest_framework.response import Response


PRODUCTS = [
    {
        "id": 1,
        "name": "Example Product A",
        "price": 29.99,
        "description": "A sample product for testing the API.",
    },
    {
        "id": 2,
        "name": "Example Product B",
        "price": 49.99,
        "description": "Another sample product for testing the API.",
    },
]


@api_view(['GET'])
def getRoutes(request):
    """Return available API routes."""

    routes = [
        {
            "url": "/api/v1/",
            "method": "GET",
            "body": None,
            "description": "List API routes",
        },
        {
            "url": "/api/v1/services/list/",
            "method": "GET",
            "body": None,
            "description": "Get the list of all services",
        },
        {
            "url": "/api/v1/services/<int:pk>/",
            "method": "GET",
            "body": None,
            "description": "Get a single service by its id",
        },
    ]
    return Response(routes)


@api_view(['GET'])
def getProducts(request):
    """Return all products."""

    return Response(PRODUCTS)


@api_view(['GET'])
def getProduct(request, pk):
    """Return a single product by primary key."""

    product = next((p for p in PRODUCTS if p.get('id') == pk), None)
    if not product:
        return Response({'detail': 'Not found'}, status=404)
    return Response(product)
