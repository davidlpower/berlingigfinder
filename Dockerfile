FROM python:3.7-alpine
ENV PYTHONUNBUFFERED 1
RUN mkdir /application
WORKDIR /application
COPY Pipfile Pipfile.lock /application/
RUN apk update && apk add libpq
RUN pip install pipenv
RUN pipenv install
COPY . /application/