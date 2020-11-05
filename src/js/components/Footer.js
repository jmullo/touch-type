import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faDonate } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {

    return (
        <div className="footer">
            <div className="link">
                <FontAwesomeIcon className="icon" icon={faEnvelope} /><a href="mailto:jussi.mullo@iki.fi">jussi.mullo@iki.fi</a>
            </div>
            <div className="link">
                <FontAwesomeIcon className="icon" icon={faGithub} /><a href="https://github.com/jmullo/touch-type">GitHub</a>
            </div>
            <div className="link">
                <FontAwesomeIcon className="icon" icon={faDonate} /><a href="https://www.paypal.me/jmullo">Donate with PayPal</a>
            </div>
        </div>
    );

};
