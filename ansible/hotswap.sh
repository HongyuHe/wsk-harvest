#!/usr/bin/env bash

COMPONENT=$1
TAG=$2
ENVIRONMENT=cloudlab

# * NB: For invokers, the new implementation should be compiled and built on all nodes.
sudo ./gradlew :core:$COMPONENT:distDocker -PdockerImageTag=$TAG
cd ansible
ansible-playbook -i environments/$ENVIRONMENT $COMPONENT.yml -e docker_image_tag=$TAG