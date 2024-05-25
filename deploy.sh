#serve -s build -l 3000
server_path="/home/git/DavidJNy2_1/server/"
file_path="/home/git/DavidJNy2_1/server/server.js"
file_path_websocket="/home/git/DavidJNy2_1/server/websocket.js"


echo "Switching to branch master"
echo "Pulling from main"

sudo git pull

npm install

cd /server
npm install
cd ../DavidJNy2_1

echo "Building app..."

npm run build

echo "Deploying files to server..."
sudo scp -r build/ /home/git/DavidJNy2_1/server

#kill server
echo "Stopping server"
sudo systemctl stop myexpressapp

echo "Loading new server"
node "$file_path" &
node "$file_path_websocket" &


echo "Rebooting server/services"
sudo systemctl start myexpressapp
sudo systemctl restart myexpressapp


echo "Done!"

# run sudo ./deploy.sh
