from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle

def generate_pdf(filename):
    doc = SimpleDocTemplate(filename, pagesize=letter)
    elements = []

    # Data for the table
    data = [
        ['Name', 'Age', 'City'],
        ['Alice', '28', 'New York'],
        ['Bob', '34', 'San Francisco'],
        ['Charlie', '22', 'Boston'],
        ['David', '40', 'Chicago'],
    ]

    # Create the table
    t = Table(data)

    # Add style to the table
    style = TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ])
    t.setStyle(style)

    elements.append(t)
    doc.build(elements)
    print(f"Generated {filename}")

if __name__ == "__main__":
    generate_pdf("test_table.pdf")
