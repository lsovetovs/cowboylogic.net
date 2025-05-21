import EditablePage from "../../components/EditablePage/EditablePage";

const About = () => {
  return (
    <EditablePage
      slug="about"
      title="About Us"
      placeholder="Tell something about CowboyLogic..."
      whiteBackground={false} // ✅ буде біле поле і панель усередині
    />
  );
};

export default About;
