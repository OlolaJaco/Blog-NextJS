import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <section className="footer bg-neutral text-neutral-content p-10">
      <aside>
        <Image
          src="/ololajaco-lemo.jpg"
          alt="Olola Jaco Blog Logo"
          width={50}
          height={50}
        />
        <p>
          Olola Jaco Blog is a blog that focuses on web development.
          <br />
          Copyright © 2025 - All right reserved by Olola Jaco Ltd.
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <Link 
            href="https://github.com/OlolaJaco">
            <FaGithub size={30} />
          </Link>
          <Link 
            href="https://linkedin.com/in/akinbusola-akinola">
            <FaLinkedin size={30} />
          </Link>
        </div>
      </nav>
    </section>
  );
};

export default Footer;
