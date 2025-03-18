from django.urls import path
from .views import conversion_salaire

urlpatterns = [
    path("brutnet", conversion_salaire, name="conversion_salaire"),
]
