from django.shortcuts import render
from django.contrib.auth.views import LoginView, LogoutView

from accounts.forms import SigninForm

class Signin(LoginView):
    template_name = 'accounts/login.html'
    form_class = SigninForm

class Signout(LogoutView):
    next_page = '/manage/signin/'
