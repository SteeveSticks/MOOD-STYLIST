import { Download } from "lucide-react";
import { useState } from "react";

const DownloadButton = ({ image }: { image: string }) => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(image);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      setDownloadUrl(objectUrl);

      // Create a temporary <a> element and click it
      const tempLink = document.createElement("a");
      tempLink.href = objectUrl;
      tempLink.download = "ai-outfit.png";
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

      // Optional: Clean up object URL later
      setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return <div> </div>;
};

export default DownloadButton;
