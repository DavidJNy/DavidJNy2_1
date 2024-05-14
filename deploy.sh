echo "Switching to branch master"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* /var/www/davidjny/

echo "Done!"

# run sudo ./deploy.sh