# ################
# How to deploy?
# ################
# On the dev PC:
# yarn run build
# docker build -t autodiagnostic-frontend .
# docker save -o autodiagnostic-frontend:latest.dockerimage.tar autodiagnostic-frontend:latest
# scp autodiagnostic-frontend-latest.dockerimage.tar badgeedev@badgee-tst.sowalfin.net:/home/badgeedev/

# On the host PC (where the Docker images will be started)
# docker load -i autodiagnostic-frontend-latest.dockerimage.tar
# docker run -it --rm -p 80:80 autodiagnostic-frontend:latest # → sera remplacé par docker-compose up à terme
# ###############

FROM nginx:stable-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY ./public/ /usr/src/app/
#COPY ./public/ /usr/share/nginx/html/

# Copy configuration
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf


# RUN
# Same as parent
