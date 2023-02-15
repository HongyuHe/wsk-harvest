#!/usr/bin/env bash

if [[ $# -ne 1 ]]; then
    echo "No environment name specified!" >&2
    exit 2
fi


ENV=$1

(cd tools/ubuntu-setup && ./all.sh)

sudo npm install -g openwhisk-composer

# * Just to be sure
sudo chmod 666 /qvar/run/docker.sock


# * Pull up the default python for ansible to work properly
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.8 2

# * Build
./gradlew distDocker

cd ansible || exit
export ENVIRONMENT=$ENV

# * Use the generated default setting.
#export OW_DB=CouchDB
#export OW_DB_USERNAME=admin
#export OW_DB_PASSWORD=123123
#export OW_DB_PROTOCOL=http
export OW_DB_HOST=10.0.1.1
#export OW_DB_PORT=8091

# * Run couchdb as a container.
ansible-playbook -i environments/"$ENVIRONMENT" setup.yml
ansible-playbook -i environments/"$ENVIRONMENT" prereq.yml

ansible-playbook -i environments/"$ENVIRONMENT"  couchdb.yml
ansible-playbook -i environments/"$ENVIRONMENT"  initdb.yml
ansible-playbook -i environments/"$ENVIRONMENT"  wipe.yml

ansible-playbook -i environments/"$ENVIRONMENT"  openwhisk.yml

ansible-playbook -i environments/"$ENVIRONMENT"  apigateway.yml
ansible-playbook -i environments/"$ENVIRONMENT"  postdeploy.yml

cd ..
./bin/wsk property set --apihost 172.17.0.1 --auth 23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP
./bin/wsk -i action invoke /whisk.system/utils/echo -p message hello --result

sudo cp bin/wsk /usr/bin/wsk


## OR host a couchbase locally.
## Install (cli location: /opt/couchbase/bin, /opt/couchbase/bin/install, and /opt/couchbase/bin/tools)
#curl -O https://packages.couchbase.com/releases/couchbase-release/couchbase-release-1.0-amd64.deb
#sudo dpkg -i ./couchbase-release-1.0-amd64.deb
#sudo apt-get update
#sudo apt-get install couchbase-server-community
#
## Initialize a cluster.
#couchbase-cli cluster-init -c 127.0.0.1 --cluster-username hy \
# --cluster-password 123123 --services data --cluster-ramsize 4096
#
## Check status
#curl http://127.0.0.1:8092
#sudo systemctl status couchbase-server
#couchbase-cli  server-list -c http://localhost:8091 --username hy --password 123123
#
## Get cluster info.
#curl -u hy:123123 http://localhost:8091/pools
#
## Only if using self-hosted couchbase:
## ansible-playbook initdb.yml

