import Container from "./Container";

const Comments = () => {
  return (
    <section className="py-28 bg-black">
      <div className="container flex flex-col items-center">
        <h4 className="text-white text-2xl font-bold">What Clients say?</h4>
        <p className="mt-5 text-center text-white font-medium">
          IF YOU GOT ANY QUESTION <br />
          PLEAS DO NOT HESITATE TO SEND US A MESSAGE
        </p>
        <div className="mt-20 container">
            <Container/>
        </div>
      </div>
    </section>
  );
};

export default Comments;
