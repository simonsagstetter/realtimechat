from django import forms
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.forms import (
AuthenticationForm,
UsernameField,
UserCreationForm
)

class SigninForm(AuthenticationForm):
    username =      UsernameField(
        label="Username",
        widget=forms.widgets.TextInput(
            attrs={
                "class": "form-control",
                "placeholder": "Username",
                "max_length": 150,
                "required": True,
                "autofocus": True,
            }
        )
    )

    password =      forms.CharField(
        label="Password",
        strip=False,
        widget=forms.widgets.PasswordInput(
            attrs={
                "class": "form-control",
                "placeholder": "Password",
                "required": True,
            }
        )
    )

class RegisterForm(UserCreationForm):
    username_validator = UnicodeUsernameValidator()

    username = UsernameField(
        label='Username',
        validators=[username_validator],
        widget=forms.widgets.TextInput(
            attrs={
                "class": "form-control",
                "placeholder": "Username",
                "max_length": 150,
                "required": True,
                "autofocus": True
            }
        )
    )
    password1 = forms.CharField(
        label="Password",
        strip=False,
        widget=forms.widgets.PasswordInput(
            attrs={
                "class": "form-control",
                "placeholder": "Password",
                "required": True,
            }
        ),
    )
    password2 = forms.CharField(
        label="Password confirmation",
        widget=forms.widgets.PasswordInput(
            attrs={
                "class": "form-control",
                "placeholder": "Password confirmation",
                "required": True,
            }
        ),
        strip=False,
    )
