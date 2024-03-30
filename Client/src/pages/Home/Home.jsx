import { NavLink } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home flex h-screen">
      <section className="l-side flex flex-col items-center p-7 justify-center gap-9">
        <div className="headings">
            <p className="flex flex-col text-9xl text font-semibold text-cyan-700">Finding <span>Balance</span> <span className="text-emerald-400">In Mental</span> <span className="text-lime-400">Wellness.</span></p>
        </div>
        <div className="texts flex gap-14">
            <h2 className="text-emerald-400 font-medium w-36">Discover calm, ignite resilience thrive in harmony.</h2>
            <p className="text-cyan-700 font-medium w-72">We understand the importance of prioritizing mental health and offer a supportive community and resources to guide you on your path to inner peace.</p>
        </div>
        <button className="bg-cyan-700 py-4 px-8 rounded-2xl w-11/12"><NavLink to="/" className="text-lime-400 uppercase font-extrabold">Join us</NavLink></button>
      </section>
      <section className="r-side flex items-end">
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
