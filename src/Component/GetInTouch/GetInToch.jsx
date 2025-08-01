import { useNavigate } from 'react-router-dom';
import './GetInTouch.css';

export default function TouchWithUse() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
        window.scrollTo(0, 0);
    }

    return (
        <div className="contact-section1">
            <h2 className="contact-heading">Have a Project in Mind?</h2>
            <p className="contact-subheading">
                Let's discuss how Sat Shri Steel can bring your vision to life with our expertise in steel construction.
            </p>
            <button className="contact-button" onClick={goToHome}>Contact Us Today</button>
        </div>
    );
}