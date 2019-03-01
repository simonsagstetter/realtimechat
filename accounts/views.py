from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.contrib.auth.views import (
LoginView,
LogoutView
)
from django.contrib.auth import (
authenticate,
login
)
from django.contrib import messages


from accounts.forms import (
SigninForm,
RegisterForm
)


class Signin(LoginView):
    template_name = 'accounts/login.html'
    form_class = SigninForm

class Signout(LogoutView):
    next_page = '/manage/signin/'

class Register(TemplateView):
    template_name = 'accounts/register.html'

    def get(self, request, *args, **kwargs):
        form = RegisterForm(request.GET or None)

        args = {
            'form': form,
        }

        return render(request, self.template_name, args)

    def post(self, request, *args, **kwargs):
        form = RegisterForm(request.POST or None)
        if form.is_valid():
            form.save()
            messages.success(request, "Thanks for registering. You are now logged in.")
            new_user = authenticate(username=form.cleaned_data['username'],
                                    password=form.cleaned_data['password1'],
                                    )
            login(request, new_user)
            return redirect('chats:index')
        return render(request, self.template_name, {'form': form})
