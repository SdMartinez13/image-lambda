'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3();

exports.handler = async (event) => {
  console.log(event);
  // TODO implement

  // let { name, size, type } = event;
  // let result = name + size + type;

  // console.log(result);

  // let bucketName = 'my-lab17-bucket';
  // let key = 'images.json';

  // let images = await S3.getObject({Bucket: bucketName, Key: key}).promise();

  let bucketName = event.Records[0].s3.bucket.name;
  let key = event.Records[0].s3.object.key;

  let images = await S3.getObject({ Bucket: bucketName, Key: key }).promise();


  console.log('images', images);

  let stringifiedImages = images.Body.toString();
  let parsedImages = JSON.parse(stringifiedImages);
  console.log('parsed images', parsedImages[0]);

  let { name, size, type } = parsedImages[0];
  let result = name + size + type;

  console.log('result', result);



  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };
  return response;
};
