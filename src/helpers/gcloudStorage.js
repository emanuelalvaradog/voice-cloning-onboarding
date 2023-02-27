const AUTH_TOKEN = import.meta.env.VITE_BEARER_TOKEN;
// const API_KEY = process.env.API_KEY;
// const PROJECT_NAME = process.env.PROJECT_ID;

// async function createBucket() {
//   const storageUrl = `https://storage.googleapis.com/storage/v1/b?${PROJECT_NAME}&key=${API_KEY}`;
//   const fetchRes = await fetch(storageUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${AUTH_TOKEN}`,
//     },
//     body: {
//       name: "carl-dataset",
//     },
//   });
//   const resData = await fetchRes.json();
//   console.log(resData);
// }

async function fetch2GcloudApi(fileUrl, bucketName, fileName) {
  const bucketURL = `https://storage.googleapis.com/upload/storage/v1/b/${bucketName}/o?name=${fileName}&uploadType=media`;

  const fetchRes = await fetch(bucketURL, {
    method: "POST",
    headers: {
      "Content-Type": "audio/wav",
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    body: await fetch(fileUrl).then((res) => res.blob()),
  });
  const data = await fetchRes.json();
  return data;
}

export async function uploadFile2Bucket(fileUrl, bucketName, fileName) {
  try {
    const uploadRes = await fetch2GcloudApi(fileUrl, bucketName, fileName);
    if (uploadRes) {
      console.log(uploadRes);
      return uploadRes;
    }
  } catch (e) {
    console.log(e);
  }
}
