import scanner from 'sonarqube-scanner';

import { shaLatestCommit, latestTag, exec } from './helpers.js';

// set variables
const token = process.env['SONAR_TOKEN'] ?? exec('export $(cat env/.sonar.env | xargs) && echo $SONAR_TOKEN');

const serverUrl = process.env['SONAR_HOST_URL'] ?? exec('export $(cat env/.sonar.env | xargs) && echo $SONAR_HOST_URL');

const analyzeBranch = process.env['ANALYZE_BRANCH'] ?? branch;

const version = process.env['LATEST_TAG'] ?? latestTag;

// run scanner
scanner.cli(
  [`-Dsonar.login=${token}`, `-Dsonar.branch.name=${analyzeBranch}`],
  {
    serverUrl,
    options: {
      'sonar.projectName': 'Admin panel UI',
      'sonar.projectKey': 'authorization_ui',
      'sonar.projectVersion': version,
      'sonar.language': 'ts',
      'sonar.projectBaseDir': '.',
      'sonar.sources': 'src',
      'sonar.tests': 'src',
      // TODO uncomment when tests are added
      // 'sonar.exclusions': 'src/**/tests/**/*',
      // 'sonar.test.inclusions': 'src/**/tests/**/*.(spec|test).ts',
      // 'sonar.typescript.lcov.reportPaths': 'coverage/unit/lcov.info',
      // 'sonar.testExecutionReportPaths': 'coverage/unit/test-reporter.xml',
    },
  },
  process.exit,
);
