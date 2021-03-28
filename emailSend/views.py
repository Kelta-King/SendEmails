from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.core.files.storage import FileSystemStorage
import pandas as pd
import os

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

# Create your views here.
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
        ows.get_available_name(name)
            
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