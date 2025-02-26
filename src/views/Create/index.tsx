import React from "react";
import StateSaver from "@/components/Settings/StateSaver";
import OpenProjectDialog from "@/components/Settings/OpenProjectDialog";
import Main from "@/components/Layout/Main";

const CreateView = () => {
  return (
    <>
      <StateSaver />
      <OpenProjectDialog />
      <Main />
    </>
  );
};

export default CreateView;
