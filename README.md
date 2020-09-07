# docker-semver-tags

Create semver tags and their associated shortcuts for your Docker images.

```shell script
$ npx docker-semver-tags --sourceImage metroline/metroline --versionTag 1.0.0
🏷️ metroline/metroline:1.0.0
🏷️ metroline/metroline:1.0
🏷️ metroline/metroline:1
🏷️ metroline/metroline:latest
```

Use a suffix:

```shell script
$ npx docker-semver-tags --sourceImage metroline/metroline --versionTag 1.0.0 --suffix "alpine"
🏷️ metroline/metroline:1.0.0-alpine
🏷️ metroline/metroline:1.0-alpine
🏷️ metroline/metroline:1-alpine
🏷️ metroline/metroline:latest-alpine
```

Different source and target images:

```shell script
$ npx docker-semver-tags --sourceImage tmp --sourceImage metroline/metroline --versionTag 1.0.0 --suffix "alpine"
🏷️ metroline/metroline:1.0.0-alpine
🏷️ metroline/metroline:1.0-alpine
🏷️ metroline/metroline:1-alpine
🏷️ metroline/metroline:latest-alpine
```

Do not create latest tag:

```shell script
$ npx docker-semver-tags --sourceImage metroline/metroline --versionTag 1.0.0 --latest false
🏷️ metroline/metroline:1.0.0
🏷️ metroline/metroline:1.0
🏷️ metroline/metroline:1
```
