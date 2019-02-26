from django import forms
from django.contrib.auth.forms import AuthenticationForm, UsernameField

class SigninForm(AuthenticationForm):
    username =      UsernameField(
        label="Username",
        widget=forms.widgets.TextInput(
            attrs={
                "class": "form-control",
                "placeholder": "Username",
                "max_length": 100,
                "required": True,
                "autofocus": True
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
