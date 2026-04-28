from rest_framework import generics, permissions
from .models import Therapist
from .serializers import TherapistSerializer


class TherapistListView(generics.ListAPIView):
    serializer_class   = TherapistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = Therapist.objects.all()
        available = self.request.query_params.get('available')
        if available is not None:
            qs = qs.filter(available=available.lower() == 'true')
        specialty = self.request.query_params.get('specialty')
        if specialty:
            qs = qs.filter(specialty__icontains=specialty)
        return qs


class TherapistDetailView(generics.RetrieveAPIView):
    serializer_class   = TherapistSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset           = Therapist.objects.all()
