import ThreadCard from "./ThreadCard";

const MapTopics: React.FC<{ topics: any }> = ({ topics }) => {
  return (
    <>
      {topics &&
        [...topics]
          .sort((a, b) => b.id - a.id)
          .map((thread) => (
            <div key={thread.id}>
              {!(thread.parentid >= 1) && <ThreadCard thread={thread} />}
            </div>
          ))}
    </>
  );
};

export default MapTopics;
