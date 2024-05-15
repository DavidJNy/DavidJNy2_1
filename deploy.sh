echo "Switching to branch master"
echo "Pulling from main"

sudo git pull

echo "Building app..."

npm run build

echo "Deploying files to server..."
scp -r build/ /home/git/DavidJNy2_1/server

#serve -s build -l 3000
file_path="/home/Psyko/git/DavidJNy2_1/server/server.js"

node "$file_path"

echo "Done!"

# run sudo ./deploy.sh