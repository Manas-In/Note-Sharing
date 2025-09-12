# from .serializesrs import NoteSerializers
# from .models import Notes

# from django.shortcuts import render
# from rest_framework.response import Response
# from rest_framework.views  import APIView
# from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework import generics, filters
# from django.shortcuts import get_object_or_404
# from django.db.models import Q


# # Create your views here.
# @api_view(['GET', 'POST'])
# def notes(request):
#   if request.method == "GET":
#      notse =  Notes.objects.all()
#      serializer = NoteSerializers(notse, many=True)
#      return Response (serializer.data )
 
#   elif request.method == 'POST':
#     serializer =  NoteSerializers(data = request.data) 
#     if serializer.is_valid():
#       serializer.save()
#       return Response(serializer.data, status = status.HTTP_201_CREATED)
#     return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


# @api_view(['GET' , 'PUT', 'DELETE'])
# def noteview(request,slug):
#    try:
#      note = get_object_or_404(Notes, slug=slug)
#    except :
#        return Response(status=status.HTTP_400_BAD_REQUEST)
   
   
#    if request.method == 'GET':
#        seriliazer = NoteSerializers(note)
#        return Response(seriliazer.data , status= status.HTTP_200_OK)
       
       
#    if request.method == 'PUT':
#        seriliazer = NoteSerializers(note ,data =  request.data)
#        if seriliazer.is_valid():
#            seriliazer.save()
#            return Response(seriliazer.data, status = status.HTTP_201_CREATED)
#        return Response(seriliazer.errors, status = status.HTTP_400_BAD_REQUEST)

#    if request.method  == 'DELETE':
#        note.delete()
#        return Response(status=status.HTTP_204_NO_CONTENT)    


# @api_view(['GET'])
# def notes_search(request, query):   # <-- take query from URL
#     # Search in title, body, and category
#     notes = Notes.objects.filter(
#         Q(title__icontains=query) |
#         Q(body__icontains=query) |
#         Q(catagory__icontains=query)
#     ).distinct()

#     serializer = NoteSerializers(notes, many=True)
#     return Response(serializer.data)



# class NotesSearchList(generics.ListAPIView):
#     queryset = Notes.objects.all()
#     serializer_class = NoteSerializers

#     # Enables search query param ?search=
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['title', 'body', 'catagory']  # searchable fields           
   
    
# class notes (generics.ListCreateAPIView):
#     queryset = Notes.objects.all()
#     serializer_class= NoteSerializers


# class notes(APIView) :
#   def get(self,request):
#     notes = Notes.objects.all()
#     serializers = NoteSerializers(notes , many = True)
#     return Response(serializers.data)
  
#   def post(self , request):
#     serializers = NoteSerializers(data = request.data)
#     if serializers.is_valid():
#       serializers.save()
#       return Response(serializers.data , status = status.HTTP_202_ACCEPTED)
#     return Response(serializers.errors , status = status.HTTP_400_BAD_REQUEST)
    
    
  
  
#   Last Vetson


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Notes
from .serializesrs import NoteSerializers

# Get all notes for logged-in user / Create new note
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def notes(request):
    if request.method == "GET":
        notes = Notes.objects.filter(user=request.user).order_by('-created_at')  # only user's notes
        serializer = NoteSerializers(notes, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = NoteSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # assign logged-in user automatically
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Single note view (GET, PUT, DELETE)
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def noteview(request, slug):
    try:
        note = Notes.objects.get(slug=slug, user=request.user)  # only user's note
    except Notes.DoesNotExist:
        return Response({"detail": "Note not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NoteSerializers(note)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = NoteSerializers(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# -------------------- Search Notes --------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notes_search(request, query):
    user = request.user
    # Filter search by logged-in user
    notes = Notes.objects.filter(
        Q(title__icontains=query) |
        Q(body__icontains=query) |
        Q(catagory__icontains=query),
        user=user
    ).distinct()
    
    serializer = NoteSerializers(notes, many=True)
    return Response(serializer.data)
