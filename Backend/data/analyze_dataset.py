import pandas as pd
import os

file_path = r'd:\project\Funiture\Backend\data\furniture_dataset_cleaned.csv'

if not os.path.exists(file_path):
    print(f"Error: File not found at {file_path}")
else:
    try:
        df = pd.read_csv(file_path)
        print('--- Info ---')
        print(df.info())
        print('\n--- Duplicates ---')
        print(f'Duplicates based on asin: {df.duplicated(subset=["asin"]).sum()}')
        print(f'Duplicates based on uniq_id: {df.duplicated(subset=["uniq_id"]).sum()}')
        print('\n--- Missing Values ---')
        print(df.isnull().sum())
        
        # Check categorical values
        if 'product_type' in df.columns:
            print('\n--- Product Types ---')
            print(df['product_type'].value_counts())
        
    except Exception as e:
        print(f"Error reading or processing file: {e}")
