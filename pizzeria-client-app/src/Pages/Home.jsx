import CardLeft from "../Components/CardLeft";
import CardRight from "../Components/CardRight";
import ingredientImg from "../assets/Ingredients.jpeg";
import chefImg from "../assets/Chef.jpeg";
import fortyFive from "../assets/45Min.jpg";

export default function Home() {
  const titles = ["Ingredients", "Our Chefs", "45-min Delivery"];
  const contents = [
    "We are uncompromising when it comes to goodness. Whether it’s tearing up a farm-fresh lettuce leaf or steaming tender baby carrots, we believe in using ingredients at their freshest. Cut. Chop. Steam. Stir. While they are still young and full of flavor—that’s our philosophy. It’s what makes the kitchen a better place.",
    "They make sauces sing and salads dance. With skill, knowledge, passion, and a touch of creativity, they create magic in every dish. They turn goodness into something so delightful, it almost can’t contain itself. But we know exactly what to do with it—we share it with you.",
  ];
  const images = [ingredientImg, chefImg, fortyFive]
  return (
    <>
      <div className="container">
        <div className="container-fluid">
          <div className="header text-center border-bottom mb-4">
            <h1 style={{fontSize: "4rem"}}>Our Story</h1>
          </div>
          <div style={{ textAlign: "justify" }} className="fs-5 p-4">
            <p>
              At Pizzeria, we believe in adding a little fun to every bite. To
              celebrate our Fresh Pan Pizza, we launched the Best Excuse Awards
              on our Facebook fan page. Fans were challenged to come up with the
              wackiest and most creative excuses for everyday situations.
            </p>
            <p>
              The best excuse earned the Best Excuse Badge along with exciting
              Pizzeria vouchers. The response was overwhelming — proving that
              Pizzeria’s Fresh Pan Pizza is truly the Tastiest Pan Pizza Ever!
            </p>
            <p>
              Since its launch, people simply can’t resist the softest,
              cheesiest, crunchiest, and butteriest Fresh Pan Pizza. Fans even
              joked about leaving the stage mid-performance or finding excuses
              to skip a football match, just to enjoy a slice. The campaign not
              only sparked creativity but also created a wave of enthusiastic
              engagement across our community. Pizzeria’s Fresh Pan Pizza isn’t
              just food — it’s the ultimate excuse for happiness.
            </p>
          </div>
        </div>
        <div className="container-fluid p-4">
          <CardLeft title={titles[0]} content={contents[0]} img={images[0]} />
          <CardRight title={titles[1]} content={contents[1]} img={images[1]} />
          <CardLeft title={titles[2]} img={images[2]} />
        </div>
      </div>
    </>
  );
}
