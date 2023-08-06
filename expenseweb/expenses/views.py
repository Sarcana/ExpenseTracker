from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request,'expenses/index.html') #why expenses/index

def add_expense(request):
    return render(request,'expenses/add_expense.html')
