#!/bin/bash
set -e

TAG=${1:-`date '+%Y%m%d%H%M%S'`}
REGISTRY=${2:-vpereskokov/vpagroup}
BUILD=${3:-testing}
PORT=${4:-4000}

echo "${TAG}" "${REGISTRY}" "${BUILD}" "${PORT}"

DOCKER_CONTAINER_NAME="weather"

function pushToRegistry() {
    # $1 - TAG
    echo "Registry with tag: ${REGISTRY}:${TAG}"
    docker tag "${DOCKER_CONTAINER_NAME}" "${REGISTRY}:${TAG}"
    docker push "${REGISTRY}:${TAG}"
}

if docker stop "${DOCKER_CONTAINER_NAME}"; then
    echo Stopped
fi

echo "BUILD=${BUILD}" >> docker/.env
echo "PORT=${PORT}" >> docker/.env

cat docker/.env

DBUILD_START=$(date +"%s")

# Build and push to registry
docker build \
    --build-arg BUILD="$(echo ${BUILD})" \
    --build-arg PORT="$(echo ${PORT})" \
    -f ./docker/Dockerfile \
    -t "${DOCKER_CONTAINER_NAME}" .

DBUILD_FINISH=$(date +"%s")
echo "Docker build finished after: $(( DBUILD_FINISH-DBUILD_START ))s"

DPUSH_START=$(date +"%s")

pushToRegistry "${TAG}" "${DOCKER_CONTAINER_NAME}"

DPUSH_FINISH=$(date +"%s")
echo "Docker push finished after: $(( DPUSH_FINISH-DPUSH_START ))s"

# Clear artifacts
if docker stop "${DOCKER_CONTAINER_NAME}"; then
    echo Stopped
else
    echo Not started
fi
docker rmi -f "${DOCKER_CONTAINER_NAME}"

# Show the correct tag
echo "Tag: ${TAG}"
