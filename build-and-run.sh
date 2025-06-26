#!/bin/bash

# Hebrew Text Editor - Docker Build and Run Script
echo "🔨 Building Hebrew Text Editor Docker image..."

# Build the Docker image
docker build -t hebrew-text-editor .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Stop any existing container
    echo "🛑 Stopping any existing container..."
    docker stop hebrew-text-editor 2>/dev/null || true
    docker rm hebrew-text-editor 2>/dev/null || true
    
    # Run the new container
    echo "🚀 Starting Hebrew Text Editor..."
    docker run -d -p 4051:80 --name hebrew-text-editor hebrew-text-editor
    
    if [ $? -eq 0 ]; then
        echo "✅ Hebrew Text Editor is now running!"
        echo ""
        echo "📱 Access the application:"
        echo "   Local:   http://localhost:4051"
        echo "   Network: http://$(hostname -I | awk '{print $1}'):4051"
        echo ""
        echo "🛠️  Management commands:"
        echo "   Stop:    docker stop hebrew-text-editor"
        echo "   Logs:    docker logs hebrew-text-editor"
        echo "   Remove:  docker rm hebrew-text-editor"
    else
        echo "❌ Failed to start container"
        exit 1
    fi
else
    echo "❌ Build failed"
    exit 1
fi
