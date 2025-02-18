# Installation

## Install using pipx

Otava requires Python 3.8.  If you don't have python 3.8, use pyenv to install it.

Use pipx to install otava:

```
pipx install git+ssh://git@github.com/apache/otava
```

## Build Docker container

To build the Docker container, run the following command:

```bash
docker build -t otava .
```
