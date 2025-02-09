import { useState } from "react";
import { apiRequest } from "../Utility/apiRequest";

const Home = () => {
  const [video, setVideo] = useState();
  const fileUpload = (e: any) => {
    console.log(e.target.value);
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      setVideo(e.target.files[0]);
    }
  };
  const uploadVideo = async () => {
    if (!video) {
      return;
    }
    const form = new FormData();
    form.append("video", video);
    console.log(form);
    const data = await apiRequest({
      method: "POST",
      url: "uploadVideo",
      data: form,
    });
    console.log(data);
  };
  // if (loading) {
  //   return <h1>Loading.... </h1>;
  // }
  return (
    <div
      style={{
        color: "red",
        display: "flex",
        border: "1px solid white",
        padding: "5px",
        alignItems: "center",
      }}
    >
      <input
        style={{ width: "fit-content", backgroundColor: "white" }}
        type="file"
        accept="image/png, image/jpeg,video/mp4"
        onChange={fileUpload}
      />
      <button onClick={uploadVideo}>Upload</button>
    </div>
  );
};

export default Home;
