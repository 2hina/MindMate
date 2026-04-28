from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/',        include('apps.users.urls')),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/moods/',       include('apps.moods.urls')),
    path('api/stress/',      include('apps.stress.urls')),
    path('api/chat/',        include('apps.chat.urls')),
    path('api/therapists/',  include('apps.therapists.urls')),
]
