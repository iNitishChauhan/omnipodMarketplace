import '../App.css';
import FooterLogo from '../images/footer-logo.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo"><img src={FooterLogo} alt="Omnipod logo" className="footer__logo" /></div>
          <div className="footer__social">
            <a className="footer__social-btn" href="https://www.instagram.com/omnipod/" target="_blank" rel="noopener noreferrer">
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#9166c9"/>
              <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#9166c9"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#9166c9"/>
              </svg>
            </a>
            <a className="footer__social-btn" href="https://www.facebook.com/omnipod/" target="_blank" rel="noopener noreferrer">
              <svg   width="20px"   height="20px"   viewBox="-143 145 512 512"   fill="#9166c9"   xmlns="http://www.w3.org/2000/svg">
                <path d="M329,145h-432c-22.1,0-40,17.9-40,40v432c0,22.1,17.9,40,40,40h432c22.1,0,40-17.9,40-40V185C369,162.9,351.1,145,329,145z
                  M169.5,357.6l-2.9,38.3h-39.3v133H77.7v-133H51.2v-38.3h26.5v-25.7c0-11.3,0.3-28.8,8.5-39.7c8.7-11.5,20.6-19.3,41.1-19.3
                  c33.4,0,47.4,4.8,47.4,4.8l-6.6,39.2c0,0-11-3.2-21.3-3.2c-10.3,0-19.5,3.7-19.5,14v29.9H169.5z"/>
              </svg>
            </a>
            <a className="footer__social-btn" href="https://twitter.com/myOmnipod" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#9166c9" class="bi bi-twitter-x" viewBox="0 0 16 16" id="Twitter-X--Streamline-Bootstrap" height="16" width="16">
            <path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" stroke-width="1"></path>
          </svg>
            </a>
          </div>
          
        </div>
        <div className="footer__copy">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel
          facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus
          vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
          accumsan lacus vel facilisis.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
