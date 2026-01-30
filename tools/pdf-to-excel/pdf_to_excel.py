import pdfplumber
import pandas as pd
import sys
import os

def pdf_to_excel(pdf_path, excel_path):
    print(f"Processing {pdf_path}...")
    
    if not os.path.exists(pdf_path):
        print(f"Error: File {pdf_path} not found.")
        return

    all_tables = []
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for i, page in enumerate(pdf.pages):
                print(f"Extracting specific tables from page {i+1}...")
                tables = page.extract_tables()
                
                for table in tables:
                    # Filter out empty tables, headers, etc. if needed
                    if table:
                        df = pd.DataFrame(table[1:], columns=table[0])
                        all_tables.append(df)
        
        if all_tables:
            print(f"Found {len(all_tables)} tables. Saving to {excel_path}...")
            # Combine all tables into one sheet for simplicity, or separate sheets
            # For this MVP, we concat them.
            final_df = pd.concat(all_tables, ignore_index=True)
            final_df.to_excel(excel_path, index=False)
            print("Done!")
        else:
            print("No tables found in the PDF.")
            
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 pdf_to_excel.py <input_pdf> <output_excel>")
    else:
        pdf_to_excel(sys.argv[1], sys.argv[2])
