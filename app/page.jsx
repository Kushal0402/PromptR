import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Your Custom AI Prompt Generator
        <br />
        <span className="primary_gradient text-center">
          PromptR is here for you
        </span>
      </h1>

      <p className="desc text-center">
        PromptR is an AI prompting tool to discover, create and share creative
        prompts
      </p>

      <Feed />
    </section>
  );
};

export default Home;
