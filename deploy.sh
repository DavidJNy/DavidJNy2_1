#!/bin/bash

#type "bash deploy.sh" to run script

echo "Pulling from main..."
git pull

# Check if git pull was successful
if [ $? -ne 0 ]; then
    echo "Git pull failed, exiting."
    exit 1
fi

echo "Installing npm dependencies..."
npm install

# Check if npm install was successful
if [ $? -ne 0 ]; then
    echo "npm install failed, exiting."
    exit 1
fi

echo "Building app..."
npm run build

# Check if npm run build was successful
if [ $? -ne 0 ]; then
    echo "npm run build failed, exiting."
    exit 1
fi

echo "Deploying files to server..."

echo "Stopping existing pm2 processes..."
pm2 stop davidportserver

# Check if pm2 stop all was successful
if [ $? -ne 0 ]; then
    echo "pm2 stop all failed, exiting."
    exit 1
fi

echo "Starting pm2 processes..."
pm2 restart davidportserver

# Check if pm2 restart all was successful
if [ $? -ne 0 ]; then
    echo "pm2 restart davidportserver failed, exiting."
    exit 1
fi

echo "Rebooting server/services..."
# Add commands to reboot server/services if needed

echo "Done!"
