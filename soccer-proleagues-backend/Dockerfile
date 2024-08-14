# Use an official Python runtime as a parent image
FROM python:3.9-slim-bullseye

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app
COPY /scripts/db/init-seed.sh /docker-entrypoint-initdb.d/init-seed.sh
COPY /scripts/db/seed.py /scripts/db/dump.py

# Ensure the shell script is executable
RUN chmod +x /docker-entrypoint-initdb.d/init-seed.sh

# Set the entrypoint to your shell script
ENTRYPOINT ["/docker-entrypoint-initdb.d/init-seed.sh"]

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 4000
# EXPOSE 8000
# EXPOSE 5432

# Define environment variable
ENV FLASK_APP=app.py

# Run app.py when the container launches
# CMD ["flask", "run", "--host=0.0.0.0", "--port=4000"]
CMD ["flask", "run", "--host=0.0.0.0", "--port=4000", "flask", "run", "/docker-entrypoint-initdb.d/init-seed.sh"]

# CMD ["flask", "run", "--host=0.0.0.0", "--port=8000"]
