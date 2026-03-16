from rest_framework import serializers

from .models import Service



# Auto Repair and Diagnostic Service Serializer
class ServiceSerializer(serializers.ModelSerializer):
    seller_name = serializers.CharField(source='seller.username', read_only=True)
    seller_merchant_id = serializers.CharField(source='seller.merchant_id', read_only=True)

    class Meta:
        model = Service
        fields = [
            'id',
            'seller',
            'seller_name',
            'seller_merchant_id',
            'service_name',
            'description',
            'price',
            'duration_of_service',
            'sample_image',
            'created_at',
        ]
        read_only_fields = ['id', 'seller', 'seller_name', 'created_at']
