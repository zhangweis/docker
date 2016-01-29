FROM ubuntu:trusty

#MAINTAINER Nicola Molinari <emmenko@gmail.com>

ENV java_version 1.8.0_51
ENV filename jdk-8u51-linux-x64.tar.gz
ENV JAVA_HOME /opt/java-oracle/jdk$java_version
ENV PATH $JAVA_HOME/bin:$PATH

RUN apt-get update; \
  apt-get install -y git curl; \
  curl -sL https://deb.nodesource.com/setup_5.x | sudo bash -; \
  apt-get update && apt-get install -y nodejs
RUN apt-get install -y wget; wget --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u51-b16/$filename -O /tmp/$filename --progress=bar:force; \
  mkdir -p /opt/java-oracle && tar -zxf /tmp/$filename -C /opt/java-oracle/;  \
  update-alternatives --install /usr/bin/java java $JAVA_HOME/bin/java 20000; \
  update-alternatives --install /usr/bin/javac javac $JAVA_HOME/bin/javac 20000; \
  apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#ADD xvfb.sh /etc/init.d/xvfb
ADD entrypoint.sh /entrypoint.sh

#ENV DISPLAY :99.0
#ENV CHROME_BIN /usr/bin/google-chrome

#FROM emmenko/nodejs-java
#copied to upgrade nodejs
MAINTAINER John Zhang <cdzhangw@gmail.com>

RUN npm install -g decaf
ADD fitnesse.jar /root/fitnesse.jar
ADD decaf/lib/processor.js /usr/lib/node_modules/decaf/lib/processor.js
ADD decaf/lib/fixture_loader.js /usr/lib/node_modules/decaf/lib/fixture_loader.js
ADD decaf/lib/sut.js /usr/lib/node_modules/decaf/lib/sut.js
ENTRYPOINT ["/entrypoint.sh"]
# java -jar fitnesse.jar -e 0 -p 8100
