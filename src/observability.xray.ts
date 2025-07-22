import AWSXRayCore from 'aws-xray-sdk-core';
import awsxray_express from 'aws-xray-sdk-express';

const awsxray = AWSXRayCore;

const nodeEnv = process.env.NODE_ENV ?? 'development';

awsxray.setContextMissingStrategy(() => {
  if (nodeEnv !== 'production') {
    console.warn('[X-Ray] Contexto ausente ignorado (modo não-produtivo)');
  }
});

export { awsxray, awsxray_express };
