const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({ region: 'us-east-2' });

const s3 = new AWS.S3();

const updateMetadata = async () => {
  const bucketName = 'users-pfp';
  const objectKey = 'profiles';
  
  try {
    const headObject = await s3.headObject({ Bucket: bucketName, Key: objectKey }).promise();

    await s3.copyObject({
      Bucket: bucketName,
      CopySource: `${bucketName}/${objectKey}`,
      Key: objectKey,
      MetadataDirective: 'REPLACE',
      Metadata: {
        ...headObject.Metadata,
      },
      CacheControl: 'no-cache',
    }).promise();

    console.log(`Updated Cache-Control metadata for ${objectKey}`);
  } catch (error) {
    console.error('Error updating metadata:', error.message);
  }
};

updateMetadata();
