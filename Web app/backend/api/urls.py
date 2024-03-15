from django.urls import path
from . import views
from api.views import ModelApi
urlpatterns = [
    path('',ModelApi.as_view()),
]