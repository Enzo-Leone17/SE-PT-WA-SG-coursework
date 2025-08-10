import React, { useContext, useState } from "react";

const BigCatContext = React.createContext();

export function useBigCatContext() {
  return useContext(BigCatContext);
}

export function BigCatProvider({ children }) {
  const cats = [
    {
      name: "Cheetah",
      latinName: "Acinonyx jubatus",
      image:
        "https://cdn.pixabay.com/photo/2018/05/23/16/56/cheetah-3424526_1280.jpg",
    },
    {
      name: "Cougar",
      latinName: "Puma concolor",
      image:
        "https://cdn.pixabay.com/photo/2022/10/17/17/21/cougar-7528306_1280.jpg",
    },
    {
      name: "Jaguar",
      latinName: "Panthera onca",
      image:
        "https://cdn.pixabay.com/photo/2016/10/10/00/09/jaguar-1727406_1280.jpg",
    },
    {
      name: "Leopard",
      latinName: "Panthera pardus",
      image:
        "https://cdn.pixabay.com/photo/2014/11/03/17/40/leopard-515509_1280.jpg",
    },
    {
      name: "Lion",
      latinName: "Panthera leo",
      image:
        "https://cdn.pixabay.com/photo/2023/06/29/10/33/lion-8096155_1280.png",
    },
    {
      name: "Snow leopard",
      latinName: "Panthera uncia",
      image:
        "https://cdn.pixabay.com/photo/2015/07/25/16/57/snow-leopard-860247_1280.jpg",
    },
    {
      name: "Tiger",
      latinName: "Panthera tigris",
      image:
        "https://cdn.pixabay.com/photo/2020/11/03/07/25/tiger-5708918_1280.jpg",
    },
  ];
  const [bigCatList, setBigCatList] = useState(cats);
  return (
    <BigCatContext.Provider value={{ bigCatList, setBigCatList }}>
      {children}
    </BigCatContext.Provider>
  );
}
