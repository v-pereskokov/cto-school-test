import serialize from 'serialize-javascript';

export const renderObject = (data: unknown) =>
    serialize(data).replace(/</g, '\\\u003c');

export const renderResource = (resources: string[]) =>
    resources.filter(Boolean).join('\n');
