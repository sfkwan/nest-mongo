# Use the official MongoDB image as the base image
FROM mongo:7.0.4-jammy

# Copy the generate-keyfile.sh script to the container
COPY generate-keyfile.sh /generate-keyfile.sh

# Create the keyfile directory and generate the keyfile during the image build
RUN mkdir -p /opt/keyfile && \
    /bin/bash /generate-keyfile.sh

# Copy the custom mongod.conf to the container's configuration directory
COPY mongod.conf /etc/mongod.conf

# Copy the mongo-init.js file to the container's initialization script directory
COPY mongo-init.js /docker-entrypoint-initdb.d/mongo-init.js

CMD ["mongod", "-f", "/etc/mongod.conf"]