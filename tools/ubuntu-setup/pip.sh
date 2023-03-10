#!/bin/bash
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

set -e
set -x

# Force a (re)install of pip in the correct location
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py --force-reinstall
#sudo cp /users/$USER/.local/bin/pip /usr/local/bin/pip
#sudo cp /users/$USER/.local/bin/pip3 /usr/local/bin/pip3

pip install markupsafe==2.0.1
sudo pip install argcomplete
sudo pip install couchdb
pip install pip --upgrade
pip install pyopenssl --upgrade
