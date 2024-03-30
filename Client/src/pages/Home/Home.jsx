import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="flex">
      <section className="l-side">
        <div className="headings">
            <h1>Finding balance <span>In Mental</span> <span>Wellness.</span></h1>
        </div>
        <div className="texts flex">
            <h2>Discover calm ignite resilience thrive in harmony.</h2>
            <p>We understand the importance of prioritizing mental health and offer a supportive community and resources to guide you on your path to inner peace.</p>
        </div>
        <button><NavLink to="/">Join us</NavLink></button>
      </section>
      <section className="r-side flex">
        <div className="flex flex-col">
            <div className="upper flex">
                <h1>20 <span>+</span></h1>
                <p>Psychologits availabe to chat with</p>
            </div>
            <div className="lower flex">
                <h3>Find Solace, Cultivate Balance, Live Mindfully</h3>
                <p>Together, we'll explore holistic approaches to mental wellness, incorporating elements of self-care, stress managment, and personal growth.</p>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Home
