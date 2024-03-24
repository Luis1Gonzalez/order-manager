import useControl from "@/hooks/useControlProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import ok from "@/assets/ok.svg";
import Image from "next/image";

const UploadImage = () => {
  const { setFile, file, setIsLoading, setPhotoUrl, photoUrl } = useControl();

  const [isOk, setIsOk] = useState(false);

  const handleUpload = async () => {
    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", "order_manager");
    setIsLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dcspww1fu/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const imagen = await res.json();
    setPhotoUrl(imagen.secure_url);
    setIsLoading(false);
    setIsOk(true);
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <input
        className={`${isOk ? "hidden" : ""}`}
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />

      <img
        src={photoUrl}
        alt="foto"
        className={`${isOk ? "flex" : "hidden"} w-[100px]`}
      />

      <button
        onClick={handleUpload}
        className={`bg-green-500 p-3 text-white font-bold text-xl hover:text-black hover:bg-green-600 shadow-xl rounded-lg ${
          isOk ? "hidden" : ""
        }`}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadImage;
