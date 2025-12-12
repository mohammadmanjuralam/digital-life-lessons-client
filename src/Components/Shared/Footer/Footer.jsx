import React from "react";

const Footer = () => {
  return (
    <div>
      <aside className="text-center py-10">
        <a className="btn btn-ghost  text-4xl font-extrabold bg-linear-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
          <span className="text-purple-400">Digital</span>{" "}
          <span className="text-orange-500">Life</span> Session
        </a>
      </aside>
      <footer className="footer bg-base-200 text-base-content p-10 flex justify-center gap-30">
        <nav>
          <h6 className="footer-title">Contact</h6>
          <a className="link link-hover">Email: info@example.com</a>
          <a className="link link-hover">Phone: +880 123 456 789</a>
          <a className="link link-hover">Dhaka, Bangladesh</a>
        </nav>

        <nav>
          <h6 className="footer-title">Terms</h6>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms & Conditions</a>
          <a className="link link-hover">Refund Policy</a>
        </nav>

        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            {/* Twitter */}
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.6a9.83 9.83 0 0 1-2.83.78A4.93 4.93 0 0 0 23.34 3a9.86 9.86 0 0 1-3.13 1.2A4.92 4.92 0 0 0 16.62 3c-2.72 0-4.92 2.2-4.92 4.92 0 .39.04.77.13 1.13-4.09-.2-7.72-2.17-10.15-5.15a4.93 4.93 0 0 0-.67 2.47c0 1.7.87 3.2 2.19 4.08a4.93 4.93 0 0 1-2.23-.62v.06c0 2.38 1.7 4.36 3.95 4.82a4.94 4.94 0 0 1-2.22.08 4.93 4.93 0 0 0 4.6 3.42A9.88 9.88 0 0 1 0 19.54 13.94 13.94 0 0 0 7.56 22c9.05 0 14-7.5 14-14v-.64A10.07 10.07 0 0 0 24 4.6z" />
              </svg>
            </a>

            {/* Facebook */}
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.6 3H4.4A1.4 1.4 0 0 0 3 4.4v15.2A1.4 1.4 0 0 0 4.4 21h8.2v-6.6H10v-3h2.6V9.4c0-2.6 1.6-4 3.9-4 1.1 0 2 .1 2.3.1v2.7H17c-1.3 0-1.6.6-1.6 1.5v2h3.2l-.4 3h-2.8V21h4.2a1.4 1.4 0 0 0 1.4-1.4V4.4A1.4 1.4 0 0 0 19.6 3" />
              </svg>
            </a>

            {/* GitHub */}
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.4 2.86 8.14 6.84 9.46.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.92-.62.07-.6.07-.6 1.02.07 1.55 1.05 1.55 1.05.9 1.55 2.36 1.1 2.94.84.1-.66.35-1.1.63-1.35-2.22-.25-4.55-1.12-4.55-4.97 0-1.1.39-2 1.04-2.7-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.4.1 2.65.65.7 1.04 1.6 1.04 2.7 0 3.86-2.33 4.72-4.56 4.97.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.58.69.48a9.98 9.98 0 0 0 6.85-9.46c0-5.5-4.46-9.96-9.96-9.96z" />
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
