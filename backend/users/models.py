from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
	"""Custom user model with extended profile fields."""

	ROLE_CHOICES = [
		('admin', 'Admin'),
		('seller', 'Seller'),
		('user', 'User'),
	]

	phone_number = models.CharField(max_length=30, blank=True, null=True)
	location = models.CharField(max_length=255, blank=True, null=True)
	gender = models.CharField(max_length=32, blank=True, null=True)
	role = models.CharField(max_length=16, choices=ROLE_CHOICES, default='user')
	merchant_id = models.CharField(max_length=128, blank=True, null=True)

	def __str__(self):
		return self.username

# Create your models here.
