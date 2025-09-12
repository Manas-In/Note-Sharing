# from django.db import models
# from django.utils.text import slugify
# from django.utils.crypto import get_random_string
# # Create your models here.


# class Notes(models.Model):
  
#   CATAGORY = [
#   ('ALL','all'),
#   ('IMPORTANT', 'Important'),
#   ('BUSINESS', 'Business'),
#   ('PERSONAL', 'Personal'),
#   ]
#   title = models.CharField(max_length=100)
#   body = models.TextField()
#   slug = models.SlugField(unique=True, blank=True )
#   catagory = models.CharField( max_length=15 , choices=CATAGORY, default='Pesronal')
#   created_at = models.DateTimeField(auto_now_add=True)
#   updated_at = models.DateTimeField(auto_now=True)
  
#   def __str__(self):
#     return self.title
  
#   def save (self ,*args, **kwargs):
#     if not self.slug :
#       slug_base = slugify(self.title)
#       slug = slug_base     
#       if Notes.objects.filter(slug = slug).exists():
#         slug = f'{slug_base}-{get_random_string(5)}'
#       self.slug = slug  
#     super(Notes,self).save(*args , **kwargs)  
  
  
  
  
from django.db import models
from django.utils.text import slugify
from django.utils.crypto import get_random_string
from user.models import CustomUser
# Create your models here.


class Notes(models.Model):
  
  CATAGORY = [
  ('ALL','all'),
  ('IMPORTANT', 'Important'),
  ('BUSINESS', 'Business'),
  ('PERSONAL', 'Personal'),
  ]
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  title = models.CharField(max_length=100)
  body = models.TextField()
  slug = models.SlugField(unique=True, blank=True )
  catagory = models.CharField( max_length=15 , choices=CATAGORY, default='PERSONAL')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  
  def __str__(self):
    return self.title
  
  def save (self ,*args, **kwargs):
    if not self.slug :
      slug_base = slugify(self.title)
      slug = slug_base     
      if Notes.objects.filter(slug = slug).exists():
        slug = f'{slug_base}-{get_random_string(5)}'
      self.slug = slug  
    super(Notes,self).save(*args , **kwargs)  
  