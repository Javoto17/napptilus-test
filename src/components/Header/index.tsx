const Header = () => {
  return (
    <nav className="bg-gray-300 absolute top-0 left-0 right-0">
      <div className="container flex flex-wrap justify-between items-center mx-auto py-4 px-6">
        <a href="/" className="flex items-center gap-x-6">
          <img
            src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png"
            loading="lazy"
            className="w-6 h-auto max-w-full"
          />
          <span className="text-xl font-semibold">Oompa Loompa's Crew</span>
        </a>
      </div>
    </nav>
  );
};

export default Header;
