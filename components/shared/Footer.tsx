import Link from "next/link";

const Footer = () => {
  return (
    <footer className="h-40 container mx-auto px-3 border-t dark:border-white my-6">
      <div className="flex sm:flex-row flex-col justify-evenly gap-10 lg:gap-0 mt-5">
        {/* left */}
        <div className="flex flex-col items-center sm:items-start space-y-4">
          <h1 className="text-xl font-semibold">Important Links</h1>
          <Link
            href={"/privacy"}
            className="dark:hover:text-accentColor hover:text-accentColorLight"
          >
            Privacy
          </Link>
          <Link
            href={"/about"}
            className="dark:hover:text-accentColor hover:text-accentColorLight"
          >
            About Us
          </Link>
          <Link
            href={"/tips"}
            className="dark:hover:text-accentColor hover:text-accentColorLight"
          >
            Tips
          </Link>
          <Link
            href={"/contact-us"}
            className="dark:hover:text-accentColor hover:text-accentColorLight"
          >
            Contact Us
          </Link>
        </div>
        {/* middle */}
        <div className="flex flex-col items-center sm:items-start space-y-4">
          <h1 className="text-xl font-semibold">Contact us</h1>
          <Link
            href={"#"}
            className="dark:hover:text-accentColor hover:text-accentColorLight"
          >
            Email
          </Link>
          <Link
            href={"#"}
            className="dark:hover:text-accentColor hover:text-accentColorLight"
          >
            Need Help?
          </Link>
          <Link
            href={"#"}
            className="dark:hover:text-accentColor hover:text-accentColorLight"
          >
            Feedback
          </Link>
        </div>
        {/* right */}
        <div className="flex flex-col items-center sm:items-start space-y-4">
          <h1 className="text-xl font-semibold">Join us</h1>
          <Link
            href={"#"}
            className="dark:hover:text-accentColor hover:text-accentColorLight"
          >
            Request a new series
          </Link>
          <Link
            href={"#"}
            className="dark:hover:text-accentColor hover:text-accentColorLight"
          >
            Report bugs
          </Link>
          <Link
            href={"#"}
            className="dark:hover:text-accentColor hover:text-accentColorLight"
          >
            Join Our Ranks
          </Link>
        </div>
      </div>
      <h1 className="text-center h-10 mt-3">
        © 2024-2025 disasterscans.com | Made with ❤️ by{" "}
        <Link
          href={"mailto:shilajitdutta44@gmail.com"}
          className="dark:hover:text-accentColor hover:text-accentColorLight"
        >
          Shilajit
        </Link>
      </h1>
    </footer>
  );
};

export default Footer;
