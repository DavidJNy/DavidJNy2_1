# Serve static files

server_path="/home/Documents/DavidJNy2_1/server/"
file_path="/home/Documents/DavidJNy2_1/server/server.js"
file_path_websocket="/home/Documents/DavidJNy2_1/server/websocket.js"

echo "Pulling from main"
git pull

npm install

echo "Building app..."
npm run build

echo "Deploying files to server..."

# Stop existing pm2 processes
echo "Stopping existing pm2 processes..."
pm2 stop all

# Start new pm2 processes
echo "Starting pm2 processes..."
pm2 restart all


echo "Rebooting server/services"

echo "Done!"
