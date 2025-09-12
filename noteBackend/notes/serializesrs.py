from rest_framework import serializers
from .models import Notes

class NoteSerializers(serializers.ModelSerializer):
  class Meta:
    model = Notes
    fields = ['title', 'body', 'catagory', 'slug', 'created_at', 'updated_at']
    # fields = '__all__'

