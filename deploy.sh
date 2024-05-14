echo "Switching to branch master"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* /Home/Psyko/DavidJNy2_1/server

#serve -s build -l 3000
cd server
npm run start

echo "Done!"

# run sudo ./deploy.sh