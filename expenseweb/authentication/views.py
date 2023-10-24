from django.shortcuts import render
from django.views import View
import json
from django.http import JsonResponse
from django.contrib.auth.models import User #to check if username exists
from validate_email import validate_email 
from django.contrib import messages

# Create your views here.



        
class RegistrationView(View):
    def get(self,request):
        return render(request,'authentication/register.html') 
    def post(self,request):
        messages.debug(request, "%s SQL statements were executed." )
        messages.info(request, "Three credits remain in your account.")
        messages.success(request, "Profile details updated.")
        messages.warning(request, "Your account expires in three days.")
        messages.error(request, "Document deleted.")
        return render(request,'authentication/register.html')    

class UsernameValidationView(View):
     def post(self,request):
        data=json.loads(request.body)
        username=data['username']

        if not str(username).isalnum():
            # return JsonResponse({'username_error':'Username should only contain alphanumeric characters'})      
             return JsonResponse({'username_error':'Username should only contain alphanumeric characters'},status=400)     
             #status visible in PostMan 
        if User.objects.filter(username=username).exists():     
             return JsonResponse({'username_error':'Sorry username in use choose another one'},status=409)
             #now link this to the frontend by going onto register.html          

        return JsonResponse({'username_valid':True})

class EmailValidationView(View):
     def post(self,request):
        data=json.loads(request.body) #kaha se aaya
        email=data['email']

        if not validate_email(email):    
             return JsonResponse({'email_error':'Email Invalid'},status=400)     
        if User.objects.filter(email=email).exists():     
             return JsonResponse({'email_error':'Email is already taken'},status=409)
             #now link this to the frontend by going onto register.html          

        return JsonResponse({'email_valid':True})
