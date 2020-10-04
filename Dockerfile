FROM python:3.7-alpine

ENV PYTHONUNBUFFERED 1

RUN mkdir /application

WORKDIR /application

COPY Pipfile Pipfile.lock /application/

RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

RUN pip install psycopg2

RUN pip install pipenv

RUN pipenv install

COPY . /application/