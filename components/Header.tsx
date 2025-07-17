import Image from "next/image";

const Header = () => {
  return (
    <div className="flex items-center justify-start">
      <Image src="/img/AIMoodLogo.jpg" alt="App logo" width={90} height={90} />

      <h1 className="text-4xl font-bold tracking-tight">
        Halamd{" "}
        <span className="text-muted-foreground text-xl">
          👗 AI Mood Stylist
        </span>
      </h1>
    </div>
  );
};

export default Header;
