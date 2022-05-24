import {Link} from "react-router-dom"
const NavBar = () => {
    return ( 
        <nav className="flex justify-between my-4 ">
            <section className="text-[20px]">Quiz App</section>
            <ul className="flex gap-4 ">
                <Link className="hover:font-extrabold" to="/">Home</Link>
                <Link className="hover:font-extrabold" to="/quiz">Quiz</Link>
            </ul>
        </nav>
     );
}
 
export default NavBar;