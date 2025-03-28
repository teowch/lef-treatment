import zipfile
import glob
import os

for filepath in glob.iglob('files/*.lxf'):
    print('unzipping ' + filepath)
    with zipfile.ZipFile(filepath, 'r') as zip_ref:
        zip_ref.extractall('unzipped')
        filename = filepath.split('.')[0].split('\\')[-1]
        os.rename('unzipped/results.lef', 'unzipped/' + filename + '.lef')