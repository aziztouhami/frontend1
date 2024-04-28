#Étape de build
FROM node:20.11.0-alpine as build
WORKDIR /frontend
COPY . .
RUN npm install
EXPOSE 4200
CMD /frontend/node_modules/.bin/ng serve --host 0.0.0.0

