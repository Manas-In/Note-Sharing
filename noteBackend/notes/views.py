from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Notes
from .serializesrs import NoteSerializers

# Get all notes for logged-in user / Create new note
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
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
@permission_classes([AllowAny])
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
@permission_classes([AllowAny])
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
