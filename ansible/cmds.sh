wsk action invoke /whisk.system/utils/echo -p message hello --result -i

compose parallel.js > parallel.json && deploy parallel parallel.json -w -i
wsk -i action invoke parallel -P parallel_params.json --result

wsk activation poll -i

sudo ansible all -i environments/cloudlab -m ping

# * Get rid off docker 
sudo apt-get purge -y docker-engine docker docker.io docker-ce docker-ce-cli
sudo systemctl start docker


# * For weird permission error
sudo chmod 755 ~/.config
sudo chmod 755 ~/.docker/

sudo ansible-playbook -i environments/"$ENVIRONMENT" teardown.yml

# * Get container IP
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <id | name>