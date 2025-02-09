import { useInitialData } from "../Hooks/useInitialData";
interface VideoData {
  videos: string[]; // Assuming 'videos' is an array of strings
}

const SavedVideos = () => {
  const { data, loading }: { data: VideoData | null; loading: boolean } =
    useInitialData<VideoData>({
      method: "GET",
      url: "savedVideos",
    });
  if (loading) {
    return <>Loading videos fetching...</>;
  }
  console.log(data);

  return (
    <>
      <h1>Videos</h1>
      <div className="flex  items-center min-h-screen">
        {data?.videos?.map((item: string) => (
          <video controls width="300" height={"300"}>
            <source
              src={"http://localhost:3000/api/" + item}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
    </>
  );
};

export default SavedVideos;
