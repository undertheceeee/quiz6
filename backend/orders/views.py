from rest_framework import generics, permissions

from .models import Order
from .serializers import OrderSerializer


class CreateOrderView(generics.CreateAPIView):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = OrderSerializer

	def perform_create(self, serializer):
		serializer.save(buyer=self.request.user)


class UserOrderHistoryView(generics.ListAPIView):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = OrderSerializer

	def get_queryset(self):
		return Order.objects.filter(buyer=self.request.user).order_by('-date_purchased')
