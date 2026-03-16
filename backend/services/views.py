from rest_framework import generics, permissions

from .models import Service
from .serializers import ServiceSerializer


class ServiceListView(generics.ListAPIView):
	queryset = Service.objects.all().order_by('-created_at')
	serializer_class = ServiceSerializer
	permission_classes = [permissions.AllowAny]


class ServiceDetailView(generics.RetrieveAPIView):
	queryset = Service.objects.all()
	serializer_class = ServiceSerializer
	permission_classes = [permissions.AllowAny]


class SellerServiceManageView(generics.ListCreateAPIView):
	serializer_class = ServiceSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		return Service.objects.filter(seller=self.request.user).order_by('-created_at')

	def perform_create(self, serializer):
		serializer.save(seller=self.request.user)


class SellerServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = ServiceSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		return Service.objects.filter(seller=self.request.user)
