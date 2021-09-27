FROM node:14.16
ARG WORK_DIR=/frontend
ENV PATH /frontend/node_modules/.bin:$PATH

RUN mkdir /frontend
WORKDIR /frontend
COPY package.json /frontend

COPY package-lock.json /frontend

RUN npm install @angular/cli
RUN npm install

COPY . /frontend

EXPOSE 4200
CMD ng serve --host 0.0.0.0


# stage 1 buiild app
# FROM node:14.16
# WORKDIR /app
# COPY . .


# RUN npm install 
# RUN npm run build --prod


# stage 2 runing app

# FROM nginx:alpine
# COPY --from=node /app/dist/web-cat-app /user/share/nginx/html