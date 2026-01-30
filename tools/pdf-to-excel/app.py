import streamlit as st
import pandas as pd
import pdfplumber
import io
import zipfile

# Set page configuration
st.set_page_config(page_title="PDF to Excel Converter", page_icon="📊")

def extract_tables_from_pdf(pdf_file):
    all_tables = []
    try:
        with pdfplumber.open(pdf_file) as pdf:
            for page in pdf.pages:
                tables = page.extract_tables()
                for table in tables:
                    if table:
                        df = pd.DataFrame(table[1:], columns=table[0])
                        all_tables.append(df)
        return all_tables
    except Exception as e:
        st.error(f"Error extracting tables: {e}")
        return []

def main():
    st.title("📊 PDF to Excel Converter")
    st.write("Upload PDF files to extract tables into Excel spreadsheets.")

    # File uploader
    uploaded_files = st.file_uploader("Choose PDF files", type="pdf", accept_multiple_files=True)

    if uploaded_files:
        st.info(f"Processing {len(uploaded_files)} file(s)...")
        
        results = {}
        
        # Progress bar
        progress_bar = st.progress(0)
        
        for i, uploaded_file in enumerate(uploaded_files):
            # Extract tables
            tables = extract_tables_from_pdf(uploaded_file)
            
            if tables:
                # Combine all tables
                final_df = pd.concat(tables, ignore_index=True)
                
                # Convert to Excel
                output = io.BytesIO()
                with pd.ExcelWriter(output, engine='openpyxl') as writer:
                    final_df.to_excel(writer, index=False, sheet_name='Sheet1')
                
                # Store result
                # Use original filename but change extension
                file_name = uploaded_file.name.rsplit('.', 1)[0] + ".xlsx"
                results[file_name] = output.getvalue()
                
                # Show preview for the first file only to avoid clutter
                if i == 0:
                    st.subheader(f"Preview: {uploaded_file.name}")
                    st.dataframe(final_df.head())
            else:
                st.warning(f"No tables found in {uploaded_file.name}")
            
            # Update progress
            progress_bar.progress((i + 1) / len(uploaded_files))
            
        if results:
            st.success(f"Successfully converted {len(results)} file(s)!")
            
            # Create ZIP file
            zip_buffer = io.BytesIO()
            with zipfile.ZipFile(zip_buffer, "w") as zf:
                for file_name, data in results.items():
                    zf.writestr(file_name, data)
            
            # Download button
            st.download_button(
                label="📥 Download All as ZIP",
                data=zip_buffer.getvalue(),
                file_name="converted_tables.zip",
                mime="application/zip"
            )

if __name__ == "__main__":
    main()
