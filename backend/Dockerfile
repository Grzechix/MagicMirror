# Dockerfile for Flask backend

# We are using the official Python image as a base
FROM python

# WORKDIR sets the working directory inside the container
WORKDIR /app

# Copy files from the local directory to the container
COPY . /app

# Install the required libraries
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables for Flask (optional)
# This will make Flask available outside the container
ENV FLASK_APP=app
ENV FLASK_RUN_HOST=0.0.0.0  

# Port on which the Flask application will be available
EXPOSE 5000

# Start the Flask application
CMD ["flask", "run"]
