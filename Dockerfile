# ################
# How to deploy?
# ################
# On the dev PC:
# yarn run production # or 'staging'
# docker build -t autodiagnostic-frontend-production .
# docker save -o autodiagnostic-frontend-production-latest.dockerimage.tar autodiagnostic-frontend-production:latest
# scp autodiagnostic-frontend-production-latest.dockerimage.tar badgeedev@badgee-tst.sowalfin.net:/home/badgeedev/

# On the host PC (where the Docker images will be started)
# docker load -i autodiagnostic-frontend-production-latest.dockerimage.tar
# docker run -it --rm -p 80:80 autodiagnostic-production-frontend:latest # → sera remplacé par docker-compose up à terme
# ###############

FROM nginx:stable-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY ./public/ /usr/src/app/

# Copy configuration
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# RUN
# Same as parent
