import PromptCard from "./PromptCard";
const Profile = ({ name, data, handleEdit, handleDelete }) => {
  return (
      <section className="w-full">
        <div className="w-full flex justify-between border-b-2 border-gray-300 pb-4">
          <h1 className="head_text text-left text-primary-scnd">{name}</h1>
        </div>
        <div className="mt-10 prompt_layout">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      </section>
    );
  };

export default Profile;
