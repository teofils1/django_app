from django.core.management.base import BaseCommand
from api.models import Item
from decimal import Decimal

class Command(BaseCommand):
    help = 'Create sample data for the Item model'

    def handle(self, *args, **options):
        # Create sample items if they don't exist
        if Item.objects.count() == 0:
            items_data = [
                {
                    'name': 'Wireless Headphones',
                    'description': 'High-quality wireless headphones with noise cancellation',
                    'price': Decimal('129.99')
                },
                {
                    'name': 'Smartphone',
                    'description': 'Latest model smartphone with advanced camera',
                    'price': Decimal('699.99')
                },
                {
                    'name': 'Coffee Mug',
                    'description': 'Ceramic coffee mug with custom design',
                    'price': Decimal('15.99')
                },
                {
                    'name': 'Laptop Stand',
                    'description': 'Adjustable aluminum laptop stand for better ergonomics',
                    'price': Decimal('45.50')
                },
                {
                    'name': 'Gaming Mouse',
                    'description': 'High-precision gaming mouse with RGB lighting',
                    'price': Decimal('89.99')
                }
            ]
            
            for item_data in items_data:
                Item.objects.create(**item_data)
            
            self.stdout.write(
                self.style.SUCCESS(f'Successfully created {len(items_data)} sample items!')
            )
        else:
            self.stdout.write(
                self.style.WARNING(f'Items already exist in database. Total: {Item.objects.count()}')
            )
            
        # List all items
        self.stdout.write(self.style.SUCCESS('Current items in database:'))
        for item in Item.objects.all():
            self.stdout.write(f'- {item.name}: ${item.price}')
