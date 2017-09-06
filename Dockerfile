FROM node:4.1
ENV HOME=/iotagent-ul

WORKDIR $HOME
COPY package.json $HOME/package.json
COPY . $HOME

RUN npm install 
EXPOSE 4061
EXPOSE 4062

#CMD ["npm", "start"]
#CMD ["node", "exampleMqtt.js"]  
CMD ["node","./bin/iotagent-ul"]
