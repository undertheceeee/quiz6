from django.conf import settings
from django.db import models



# Auto Repair and Diagnostic Service Model
class Service(models.Model):
	seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='services')
	service_name = models.CharField(max_length=255)
	description = models.TextField(blank=True)
	price = models.DecimalField(max_digits=10, decimal_places=2)
	duration_of_service = models.CharField(max_length=64, blank=True)
	sample_image = models.ImageField(upload_to='services/', blank=True, null=True)
	created_at = models.DateTimeField(auto_now_add=True)

	# Auto repair/diagnostic specific fields (optional, for future expansion)
	# category = models.CharField(max_length=100, blank=True)
	# vehicle_type = models.CharField(max_length=100, blank=True)

	def __str__(self):
		return f"{self.service_name} - {self.seller.username}"

# Create your models here.
