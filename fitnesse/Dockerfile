FROM emmenko/nodejs-java

MAINTAINER John Zhang <cdzhangw@gmail.com>

RUN npm install -g decaf
ADD fitnesse.jar /root/fitnesse.jar
ADD decaf/lib/processor.js /usr/lib/node_modules/decaf/lib/processor.js
ENTRYPOINT ["/entrypoint.sh"]
# java -jar fitnesse.jar -e 0 -p 8100