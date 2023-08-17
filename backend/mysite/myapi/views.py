from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication
from .models import Waitlist, Email
from .serializers import WaitlistSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action


class PagesViewSet(viewsets.ModelViewSet):
    serializer_class = WaitlistSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request, *args, **kwargs):
        print('list called')
        name = request.query_params.get('name')
        
        if name:
            queryset = Waitlist.objects.filter(name__icontains=name)
            first_object = queryset.first()
            
            if first_object:
                serialized_data = self.serializer_class(first_object).data
                return Response(serialized_data)
            else:
                return Response({'message': 'No matching object found'}, status=404)
        
        return Response([])
    
    
    def create(self, request, *args, **kwargs):
        print("Post called")
        email = request.data.get('email')
        waitlistId = request.data.get('waitlistId')
       
        if email and waitlistId:
            email_model = Email.objects.create(email_address=email)
            waitlist_model = Waitlist.objects.get(id=waitlistId)
            waitlist_model.emails.add(email_model)
            waitlist_model.save()
            print(f"Successfully saved {email} to {waitlist_model.name}")
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Email and waitlistId are required'}, status=status.HTTP_400_BAD_REQUEST)

class WaitlistViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]  # Add this line for token-based authentication
    http_method_names = ['get', 'post', 'delete', 'patch']

    def get_queryset(self):
        print("get_queryset()")
        user = self.request.user
        return Waitlist.objects.filter(user=user)

    def list(self, request):
        print("listing ... ")
        queryset = self.get_queryset()
        serializer = WaitlistSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        print("Creating ...")
        if request.user.is_authenticated:
            user = request.user
            data = request.data.copy()
            data['user'] = user.id  # Use user.id instead of user object
        else:
            return Response({"error": "User not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = WaitlistSerializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            print(e.detail)  # Print the validation error details
            return Response({"error": "Invalid data provided."}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def retrieve(self, request, pk=None):
        print("retrieve called ...")
        queryset = self.get_queryset()
        waitlist = get_object_or_404(queryset, pk=pk)
        serializer = WaitlistSerializer(waitlist)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'])
    def update_waitlist(self, request, pk=None):
        queryset = self.get_queryset()
        waitlist = get_object_or_404(queryset, pk=pk)        
        data = request.data.copy()
        data["user"] = waitlist.user_id
        data["name"] = waitlist.name
        serializer = WaitlistSerializer(waitlist, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'])
    def destroy_waitlist(self, request, pk=None):
        queryset = self.get_queryset()
        try:
            waitlist = get_object_or_404(queryset, pk=pk)
            waitlist.delete()
            return Response({'message': 'Successfully deleted waitlist.'}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({'message': 'Waitlist not found.'}, status=status.HTTP_404_NOT_FOUND)

 