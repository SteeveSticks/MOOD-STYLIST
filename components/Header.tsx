import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <Link href="/">
      <div className="flex items-center justify-start flex-wrap">
        <Image
          src="/img/AIMoodLogo.jpg"
          alt="Halamd AI Mood Stylist logo"
          width={90}
          height={90}
          className="h-[60px] w-[60px] sm:h-[90px] sm:w-[90px] object-contain"
          aria-label="App logo"
        />

        <h1 className="text-xl sm:text-4xl font-bold tracking-tight">
          Halamd{" "}
          <span className="text-muted-foreground text-base sm:text-xl">
            👗 AI Mood Stylist
          </span>
        </h1>
      </div>
    </Link>
  );
};

export default Header;
