echo "Switching to branch master"
echo "Pulling from main"

sudo git pull

echo "Building app..."

npm run build

echo "Deploying files to server..."
sudo scp -r build/ /home/git/DavidJNy2_1/server

#serve -s build -l 3000
file_path="/home/git/DavidJNy2_1/server/server.js"
file_path_websocket="/home/git/DavidJNy2_1/server/websocket.js"

node "$file_path"
node "$file_path_websocket"


echo "Done!"

# run sudo ./deploy.sh
