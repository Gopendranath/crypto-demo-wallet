import { ModeToggle } from "./mode-toggle";

const header = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full px-5">
        <div className="rounded-base border-border text-foregronud bg-secondary-background w400:h-[unset] w400:flex-col w400:gap-3 w400:py-3 z-50 mx-auto mt-5 flex h-[70px] w-full max-w-[900px] items-center justify-between border-2 px-5">
          <a href="/">
            <h2 className="font-heading w500:text-2xl w400:text-xl text-3xl">
              Wallet
            </h2>
          </a>

          <div className="w500:text-base w400:text-sm flex items-center text-lg">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </>
  );
};

export default header;
