import logger from './Logger';

export const pErr = (err: Error) => {
  if (err) {
    logger.err(err);
  }
};

export const getRandomInt = () => {
  return Math.floor(Math.random() * 1_000_000_000_000);
};

export const mapPayloadToRepo = (payload: any, Repo: any) => {
  logger.info('repotype: ' + typeof Repo);

  if (typeof Repo === 'function') {
    const repoInstance = new Repo();
    for (const [key, value] of Object.entries(payload)) {
      repoInstance[key] = value;
    }
    return repoInstance;
  }
  if (typeof Repo === 'object') {
    const copyRepo = { ...Repo };
    for (const [key, value] of Object.entries(payload)) {
      copyRepo[key] = value;
    }
    return copyRepo;
  }
};
