# Use official node image as the base image
FROM node:erbium-alpine as build



# Set the working directory
WORKDIR /usr/local/app



# Add the source code to app
COPY ./ /usr/local/app/



# Install all the dependencies
RUN npm install



# Generate the build of the application
RUN npm run storybook 


# Use official nginx image as the base image
FROM nginx:latest



# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/storybook-static /usr/share/nginx/html



# Expose port 6006
EXPOSE 6006
