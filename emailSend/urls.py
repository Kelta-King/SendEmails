
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.homePage),
    path('uploadExcel', views.fileUpload),
]
