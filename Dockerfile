FROM 'node:10-slim'

COPY . . 
RUN yarn install 

CMD ["yarn", "start"]