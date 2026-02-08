import os
import django
import datetime

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'maritime_project.settings')
django.setup()

from core.models import Vessel, Port, Voyage, Event, User

def seed_maritime_data():
    # 1. Create Ports
    chennai = Port.objects.create(name="Chennai Terminal", latitude=13.10, longitude=80.30, total_berths=10)
    singapore = Port.objects.create(name="Singapore Port", latitude=1.29, longitude=103.85, total_berths=25)

    # 2. Create Vessels
    v1 = Vessel.objects.create(imo_number="IMO9123456", name="MV Southern Star", vessel_type="Cargo", capacity_teu=5000)
    v2 = Vessel.objects.create(imo_number="IMO9876543", name="Tanker Alpha", vessel_type="Tanker", capacity_teu=12000)

    # 3. Create Voyages
    Voyage.objects.create(
        vessel=v1, origin_port=singapore, destination_port=chennai, 
        eta=datetime.datetime.now() + datetime.timedelta(days=2), status='en_route'
    )

    # 4. Create Threat Events
    Event.objects.create(type='storm', severity='high', lat=13.20, lng: 80.45)
    Event.objects.create(type='piracy', severity='critical', lat=12.98, lng: 80.15)

    print("✅ Maritime database seeded successfully!")

if __name__ == '__main__':
    seed_maritime_data()