import ControlContext from "@/context/controlProvider";
import { useContext } from "react";

const useControl = () => {
    return useContext(ControlContext);
  };
  export default useControl;
  