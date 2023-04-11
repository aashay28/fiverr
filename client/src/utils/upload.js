import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");
  try {
    const res = await axios.post(
      " https://api.cloudinary.com/v1_1/dvxcetzmy/image/upload",
      data
    );

    const { url } = await res.data;

    return url;
  } catch (err) {
    console.log("err", err);
  }
};
export default upload;
