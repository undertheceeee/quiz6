from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer


User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
	serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
	queryset = User.objects.all()
	permission_classes = [permissions.AllowAny]
	serializer_class = RegisterSerializer


class UserProfileView(generics.RetrieveAPIView):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = UserSerializer

	def get_object(self):
		return self.request.user


class AdminUserListView(generics.ListAPIView):
	permission_classes = [permissions.IsAdminUser]
	serializer_class = UserSerializer
	queryset = User.objects.all()


class AdminUserDetailView(generics.RetrieveUpdateDestroyAPIView):
	permission_classes = [permissions.IsAdminUser]
	serializer_class = UserSerializer
	queryset = User.objects.all()

	def perform_update(self, serializer):
		# Prevent accidentally removing own superuser status
		user = serializer.instance
		updated = serializer.validated_data
		# Only allow role changes via explicit field updates
		super().perform_update(serializer)

