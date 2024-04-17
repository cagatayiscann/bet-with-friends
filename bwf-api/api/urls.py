from django.urls import include, path
from api import views
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import re_path

router = routers.DefaultRouter()
router.register(r'groups', views.GroupViewset)
router.register(r'events', views.EventViewset)
router.register(r'bets', views.BetViewset)
router.register(r'members', views.MemberViewset)
router.register(r'comments', views.CommentViewset)
router.register(r'users', views.UserViewSet)
router.register(r'profile', views.UserProfileViewset)


urlpatterns = [
    re_path(r'^', include(router.urls)),
    re_path('authenticate/', views.CustomObtainAuthToken.as_view()),
]
