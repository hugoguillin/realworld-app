#!/bin/bash

# Get env variables to login in Docker Hub
DOCKER_HUB_USERNAME=$DOCKER_HUB_USERNAME
DOCKER_HUB_PASSWORD=$DOCKER_HUB_PASSWORD

# Check if the environment variables are set
if [ -z "$DOCKER_HUB_USERNAME" ] || [ -z "$DOCKER_HUB_PASSWORD" ]; then
  echo "Error: Environment variables DOCKER_HUB_USERNAME and DOCKER_HUB_PASSWORD are not set."
  exit 1
fi

# Compila la imagen
docker build -t realworldapp-for-test-automation:https .

# Etiqueta la imagen con el nombre de usuario de Docker Hub
docker tag realworldapp-for-test-automation:https $DOCKER_HUB_USERNAME/realworldapp-for-test-automation:https

# Inicia sesión en Docker Hub
docker login --username $DOCKER_HUB_USERNAME --password $DOCKER_HUB_PASSWORD

# Sube la imagen a Docker Hub
docker push $DOCKER_HUB_USERNAME/realworldapp-for-test-automation:https
