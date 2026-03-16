from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import SellerApplication
from .serializers import SellerApplicationSerializer


User = get_user_model()


class SubmitApplicationView(generics.CreateAPIView):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = SellerApplicationSerializer

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)


class ListApplicationView(generics.ListAPIView):
	permission_classes = [permissions.IsAdminUser]
	serializer_class = SellerApplicationSerializer
	queryset = SellerApplication.objects.all().order_by('-created_at')


class ApproveApplicationView(generics.UpdateAPIView):
	permission_classes = [permissions.IsAdminUser]
	serializer_class = SellerApplicationSerializer
	queryset = SellerApplication.objects.all()

	def update(self, request, *args, **kwargs):
		instance = self.get_object()
		instance.status = 'approved'
		merchant_id = request.data.get('merchant_id')
		if merchant_id:
			user = instance.user
			user.merchant_id = merchant_id
			user.role = 'seller'
			user.save()
		instance.save()
		return Response(self.get_serializer(instance).data)


class DeclineApplicationView(generics.UpdateAPIView):
	permission_classes = [permissions.IsAdminUser]
	serializer_class = SellerApplicationSerializer
	queryset = SellerApplication.objects.all()

	def update(self, request, *args, **kwargs):
		instance = self.get_object()
		instance.status = 'declined'
		instance.decline_reason = request.data.get('decline_reason', '')
		instance.save()
		return Response(self.get_serializer(instance).data)
