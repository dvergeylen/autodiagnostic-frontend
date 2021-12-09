FROM nginx:stable-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY ./public/ /usr/src/app/
#COPY ./public/ /usr/share/nginx/html/

# Copy configuration
COPY ./nginx/autodiagnostique.conf /etc/nginx/conf.d/default.conf


# RUN
# Same as parent
