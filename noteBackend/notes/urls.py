# from django.urls import path
# from .views import notes, noteview, notes_search


# urlpatterns = [
#     path('', notes , name='notes'),
#     path('noteview/<slug:slug>', noteview , name='notes'),
#      path('search/<str:query>', notes_search, name='notes-search'),
#     # path('', notes.as_view() , name='notes'),
# ]






# For user 
from django.urls import path
from .views import notes, noteview, notes_search


urlpatterns = [
    path('', notes , name='notes'),
    path('noteview/<slug:slug>', noteview , name='notes'),
    path('search/<str:query>', notes_search, name='notes-search'),
    # path('', notes.as_view() , name='notes'),
]


