from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.core.mail import EmailMessage
import pandas as pd
import os
import base64
import json
import re

df_dataset = {
    'df': pd.DataFrame(),
    'emailColumn': '',
    'allColumns': list()
}

# This class will help to overwrite the existing file in the location
class OverwriteStorage(FileSystemStorage):

    def get_available_name(self, name, max_length = None):
        
        # If the filename already exists, remove it as if it was a true file system
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        
        return name

def emailCheck(email):
    
    regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'
    if(re.search(regex, email)):
        print("Valid Email")
        return True

    else:
        print("Invalid Email")
        return False

def homePage(request):
    return render(request, 'fileUploadPage.html')

def fileUpload(request):

    if request.method == "POST":

        excel_file = request.FILES["excel_sheet"]
        fs = FileSystemStorage()
        filename, ext = str(excel_file).split('.')

        ows = OverwriteStorage()        
        # Overwrite file. So, less disk space will be used
        name = 'theFile.'+str(ext)
        try:
            
            # If user does not allow access then it will throw an exception and code will stop executing
            ows.get_available_name(name)
            # So handling exception

        except Exception as e:
            print(e)

        fl = fs.save(name, excel_file)

        try:
            if ext == "xlsx":
                df = pd.read_excel(fl)

            elif ext == "csv":
                df = pd.read_csv(fl)
                        
            else:
                df = pd.read_excel(fl)
        
        except Exception as e:
            print(e)
            return HttpResponse("Error: " + str(e))

        df_dataset['df'] = df
        df_dataset['allColumns'] = df.columns
        return render(request, 'emailSendPage.html', {'columns': df_dataset['allColumns']})
    
    else:
        return HttpResponse("Something went wrong")

def setEmailColumn(request):

    if request.method == "GET":
        
        vals = request.GET.get('vals')
        vals = base64.b64decode(vals)
        
        df = df_dataset['df']

        vals = json.loads(vals)
        emailColumn = vals['column']

        if not emailCheck(df[emailColumn][0]):
            return HttpResponse("Error: Please provide proper emails in this colum")

        df_dataset['emailColumn'] = emailColumn

        return HttpResponse("success")

    else:
        return HttpResponse("Error: Something went wrong")
    

def sendEmail(request):

    if request.method == "POST":
        
        subject = request.POST.get('subject')
        data = request.POST.get('data')
        
        attachment_file = request.FILES["file"]
        fs = FileSystemStorage()
        filename, ext = str(attachment_file).split('.')

        ows = OverwriteStorage()        
        # Overwrite file. So, less disk space will be used
        name = 'attachment.'+str(ext)
        try:
            
            # If user does not allow access then it will throw an exception and code will stop executing
            ows.get_available_name(name)
            # So handling exception

        except Exception as e:
            print(e)

        fl = fs.save(name, attachment_file)
        
        df = df_dataset['df']
        column = df_dataset['emailColumn']
        print(df_dataset['emailColumn'])
        emails = df[column].dropna().unique().tolist()
        
        email = EmailMessage(
            subject,
            data,
            'kshitijpanchal131@gmail.com',
            emails,
            headers={'Message-ID': 'foo'},
        )
        email.attach_file(fl)
        email.send()
        
        return HttpResponse("Error: send")

    else:
        return HttpResponse("Error: Something went wrong")
