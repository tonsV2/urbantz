# Urbantz API
Simple Node.js API

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
- [Urbantz API](#urbantz-api)

- [Endpoints](#endpoints)
- [Request examples](#request-examples)
  - [Post a new name](#post-a-new-name)
  - [Get the stored name](#get-the-stored-name)
  - [Get the application status](#get-the-application-status)
- [Development](#development)
- [Tests](#tests)
- [Configuration](#configuration)
- [Production](#production)
- [CI/CD](#cicd)
  - [Configuration](#configuration-1)
    - [Docker image](#docker-image)
    - [Kubernetes context](#kubernetes-context)
- [Developers notes](#developers-notes)
  - [Docker](#docker)
    - [Configuration](#configuration-2)
    - [Run as pid 1](#run-as-pid-1)
    - [Run as an unprivileged user](#run-as-an-unprivileged-user)
  - [Docker compose](#docker-compose)
  - [Helmfile](#helmfile)
  - [CI/CD](#cicd-1)
  - [Shortcomings](#shortcomings)
    - [No https](#no-https)
    - [Only two environments. Dev and prod, no test](#only-two-environments-dev-and-prod-no-test)
    - [Helm chart](#helm-chart)
  - [Conclusion](#conclusion)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Endpoints
The application provides a small API consisting of the following endpoints.

| Method | Path           | Description                           |
|--------|:---------------|:--------------------------------------|
| GET    | /uptime        | Returns the uptime of the application |
| GET    | /server/uptime | Returns the uptime of the server      |
| GET    | /health        | Show health status of the application |

# Request examples
The following examples uses HTTPie and assumes the application is running on `localhost` at port `8080`

## Post a new name
```bash
http :3000/uptime
```

## Get the stored name
```bash
http :3000/server/uptime
```

## Get the application status
```bash
http :3000/health
```

# Development
Run the below command and point your browser to [http://localhost:3000](http://localhost:3000).

Any changes to the source code should be automatically reflected.

```bash
docker-compose up dev
```

# Tests
The limited amount of tests can be found in the [src/tests](src/tests) folder.

The tests can be run using the following command.

```bash
docker-compose run test
```

# Configuration
There isn't much to configure but should you wish to change the server port from the default 3000 to anything else it can be done by setting the environment variable `PORT` to whichever port you wish.

# Production
A Helm chart, and a Helmfile has been implemented for the sake of running this application in production

# CI/CD
Any commit to master will be deployed to the development environment.

Any git tagged commit will result in a deployment to production.

## Configuration
### Docker image
The environment variable, `env.IMAGE_NAME`, found in [.github/workflows/main.yml](.github/workflows/main.yml) should be updated to match your Docker registry image name.

### Kubernetes context
A GitHub Action secret of the name `KUBECONFIG` containing your raw `kubectl` configuration should be present for the clusters you wish to target.

# Developers notes
In the following I'll try to give some insights into the toughts I had during development

## Docker
Docker is tool which offers great power but can also easily be configured to cause a security breach.

### Configuration
Only configurable aspect of this application is the server port which can be configured externally via an environment variable.

### Run as pid 1
In order for our application to receive signals from the host it should be running as pid 1. It's also best practice to only run one process per container.

Using the below command you can see which id the process is running under

```bash
docker-compose exec production ps aux
```

This should be enforced in the CI/CD pipeline.

### Run as an unprivileged user
It's very important that our process isn't running as root. Should an attacker gain access it will be a lot easier to gain further access if the process already has administrative access.

By running the below command we can see who is running our process

```bash
docker-compose exec production whoami
```

Since we are running on Alpine I choose to use the `guest` user.

The important thing to note is that it's a normal user with a limited set of capabilities, and the default shell is `/sbin/nologin`.

This should be enforced in the CI/CD pipeline.

## Docker compose
I want to make it as easy as possible for the developers working on this app. Therefore I've implemented a Docker Compose service called dev. The idea is that the developer can be up and running with having to worry about installing any dependencies beside Docker and Docker Compose.

## Helmfile
I don't release a Helm package, and I've ignored versioning for the initial release of this app. It would be fairly easy to support different versions running (or being disabled) in different environments.

When dealing with multiple environments it can happen that you accidentally target the wrong environment. For that reason it's mandatory to specify an environment when deploying using the Helmfile, and I've hardcoded the Kubernetes context each environment thus making it harder to target the wrong environment.

## CI/CD
The underlying CI/CD system isn't so important, what's important is the processes we implement.

Below is a unexhausted list of things which should be considered in a CI/CD pipeline. I won't go into details since books has been written on each topic.

* Build
* Test
* Integration test
* Smoke test
* Code coverage
* Code analysis
* Scanning of docker image

## Shortcomings
### No https
For a real life application this is a must

### Only two environments. Dev and prod, no test
My CI/CD implementation currently only supports two environments. I have some ideas about how to expend my current setup to support more but for now I'll leave it as is

### Helm chart
I don't compile a helm package nor upload one to a repository. For a serious setup a versioned and signed chart should be created and stored in a repository.

## Conclusion
It has been an interesting task. I ended up spending a bit less than 7 hours. A fair amount was spent trying to fix an issue with the pipeline doing as I intended but still failing. Please see my "HACK" note on the last line of the pipeline configuration.

I feel that I implemented a fairly reasonable setup. I test and deploy to dev on every commit.

If a commit is tagged a Docker image with that tag is built and deployed to production. To avoid faulty deploys it might be better to only do so if it's on a release branch.
