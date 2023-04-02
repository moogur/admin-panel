import childProcess from 'child_process';

export function exec(command, returnedWhenError = '') {
  try {
    return childProcess.execSync(command).toString().trim();
  } catch (error) {
    console.log(error);
    return returnedWhenError;
  }
}

export const branch = exec('git rev-parse --abbrev-ref HEAD');
export const shaLatestCommit = exec('git rev-parse --short HEAD');
export const latestTag = exec('git describe --abbrev=0 --tags', '0.0.0').replace(/^v?/, '');
