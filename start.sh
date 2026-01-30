#!/bin/sh

# Start Streamlit in background
echo "Starting Streamlit..."
# Debug info
python3 --version
pip3 list

cd /usr/share/nginx/html/tools/pdf-to-excel
# Note: Streamlit requires --server.address=0.0.0.0 to be accessible inside container/proxy
# and --server.baseUrlPath to match the proxy location
python3 -m streamlit run app.py --server.port 8501 --server.address=0.0.0.0 --server.baseUrlPath=/tools/pdf-converter --server.headless=true &
PID=$!
echo "Streamlit started with PID $PID"
sleep 5
if ! kill -0 $PID; then
    echo "Streamlit process died!"
    exit 1
fi
echo "Streamlit process is running."

# Start Nginx
echo "Starting Nginx..."
nginx -g "daemon off;"
