#!/usr/bin/env node

process.env.FORCE_COLOR = 1;

const yargs = require('yargs');
const semver = require('semver');
const chalk = require('chalk');
const exec = require('child_process').execSync;

yargs
  .option('sourceImage', {
    demandOption: true,
    description: 'Name of the source docker image. Example: "metroline/ui-tmp"',
    type: 'string',
  })
  .option('targetImage', {
    demandOption: false,
    description: 'Name of the target docker image. Example: "metroline/ui"',
    type: 'string',
  })
  .option('versionTag', {
    demandOption: true,
    description: 'A valid semantic version. Example: "1.0.0"',
    type: 'string',
  })
  .option('suffix', {
    demandOption: false,
    description: 'Example: "-alpine"',
    type: 'string',
  })
  .option('latest', {
    demandOption: false,
    description: 'Whether the "latest" tag should be created',
    type: 'boolean',
    default: true,
  })
  .command('*', 'Create semver tags', (yargs) => {

  }, ({sourceImage, targetImage, versionTag, suffix, latest}) => {
    if (!semver.valid(versionTag)) {
      console.log(`${versionTag} is not semver valid`);
      return;
    }

    const tags = [];

    const semVersion = semver.parse(versionTag);
    if (!semVersion) {
      console.log(`${versionTag} is not semver valid`);
      return;
    }

    const tagSuffix = suffix ? '-' + suffix : '';

    if (semVersion.prerelease && semVersion.prerelease.length > 0) {
      tags.push(`${versionTag}${tagSuffix}`);
      tags.push(`next${tagSuffix}`);
    } else {
      tags.push(`${semVersion.major}${tagSuffix}`);
      tags.push(`${semVersion.major}.${semVersion.minor}${tagSuffix}`);
      tags.push(`${semVersion.major}.${semVersion.minor}.${semVersion.patch}${tagSuffix}`);
      if (latest) {
        tags.push(`latest${tagSuffix}`);
      }
      if (suffix) {
        tags.push(suffix);
      }
    }

    const nameAndTags = tags.map(tag => `${targetImage || sourceImage}:${tag}`);

    for (let nameAndTag of nameAndTags) {
      console.log(`🏷️ ${chalk.bold(nameAndTag)}`);
      exec(`docker tag ${sourceImage} ${nameAndTag}`);
      exec(`docker push ${nameAndTag}`);
    }
  })
  .argv;
