import scanner from 'sonarqube-scanner';

import { shaLatestCommit, latestTag, exec } from './helpers.js';

const token =
  process.env['SONAR_TOKEN'] ?? exec('export $(cat .env.development.local | xargs) && echo $VITE_SONAR_TOKEN');
const serverUrl =
  process.env['SONAR_SERVER_URL'] ??
  exec('export $(cat .env.development.local | xargs) && echo $VITE_SONAR_SERVER_URL');

scanner(
  {
    serverUrl,
    token,
    options: {
      'sonar.projectName': 'Admin panel UI',
      'sonar.projectVersion': `${latestTag}-${shaLatestCommit}`,
      'sonar.language': 'ts',
      'sonar.projectBaseDir': '.',
      'sonar.sources': 'src',
      'sonar.exclusions': 'src/**/tests/**/*',
      'sonar.tests': 'src',
      'sonar.test.inclusions': 'src/**/tests/**/*.(spec|test).ts',
      'sonar.typescript.lcov.reportPaths': 'coverage/unit/lcov.info',
      'sonar.testExecutionReportPaths': 'coverage/unit/test-reporter.xml',
    },
  },
  process.exit,
);
