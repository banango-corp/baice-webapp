#!/bin/bash

source /home/vagrant/.profile
cd /var/lib/jenkins/workspace/baice-webapp
npx serve dist/baice-webapp
