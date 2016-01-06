# docker

```
docker build john/tor tor/
drg --cpuset-cpus 0 \
    --memory 512mb \
    -v $HOME/Downloads:/root/Downloads \
    john/tor
```
