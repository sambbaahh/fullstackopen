export const parseParameter = (parameter: unknown): string => { 
    if (!parameter || !isString(parameter)) {
        throw new Error('Incorrect or missing parameter');
    }

    return parameter;
};


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };