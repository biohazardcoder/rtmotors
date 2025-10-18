import { useEffect, useState } from "react";
import "./team.css"; // CSS

interface Member {
  name: string;
  role: string;
  avatar: string;
  contact: string;
  email: string;
}

const teamMembers: Member[] = [
  {
    name: "Akhliddin Teshaboev",
    role: "CEO",
    avatar: "/team/c1.jpg",
    contact: "+8210-2989-8641",
    email: "rtmotors.ceo@gmail.com",
  },
  {
    name: "Rakhmatilla Akhmedov",
    role: "Operation Manager",
    avatar: "/team/o1.jpg",
    contact: "+8210-9687-9796",
    email: "rtmotors.operation@gmail.com",
  },
  {
    name: "Bekmurod Abdullaev",
    role: "Marketing Manager",
    avatar: "/team/sa1.jpg",
    contact: "+8210-8465-8085",
    email: "rtmotors.marketing@gmail.com",
  },
  {
    name: "Jeong Seung Cheol",
    role: "Car Inspector",
    avatar: "/team/s1.jpg",
    contact: "+8210-3853-0865",
    email: "rtmotors.inspection@gmail.com",
  },
  {
    name: "Fakhriddin Teshaboev",
    role: "Sales Manager",
    avatar: "/team/s2.jpg",
    contact: "+99895-563-9595",
    email: "rtmotors.sales1@gmail.com",
  },
  // {
  //   name: "Farrukh aka",
  //   role: "Sales Manager",
  //   avatar: "/team/s3.jpg", 
  //   contact: "+8210-8239-9498",
  //   email: "rtmotors.sales2@gmail.com",
  // },
];

export const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateCarousel = (newIndex: number) => {
    const len = teamMembers.length;
    setCurrentIndex(((newIndex % len) + len) % len);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") updateCarousel(currentIndex - 1);
      if (e.key === "ArrowRight") updateCarousel(currentIndex + 1);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  const getClassName = (offset: number) => {
    const isMobile = window.innerWidth < 768;
    let className = "card";

    if (offset === 0) className += " center";
    else if (offset === 1) className += " right-1";
    else if (offset === teamMembers.length - 1) className += " left-1";
    else if (!isMobile) {
      if (offset === 2) className += " right-2";
      else if (offset === teamMembers.length - 2) className += " left-2";
      else className += " hidden";
    } else {
      className += " hidden";
    }

    return className;
  };

  return (
    <div className="team-wrapper pt-16 md:pt-52">
      <h1 className="about-title">OUR TEAM</h1>

      <div className="carousel-container">
        <button
          className="nav-arrow left"
          onClick={() => updateCarousel(currentIndex - 1)}
        >
          ‹
        </button>
        <div className="carousel-track">
          {teamMembers.map((member, i) => {
            const offset =
              (i - currentIndex + teamMembers.length) % teamMembers.length;
            const className = getClassName(offset);

            return (
              <div
                key={i}
                className={className}
                onClick={() => updateCarousel(i)}
              >
                <img src={member.avatar} alt={member.name} />
              </div>
            );
          })}
        </div>
        <button
          className="nav-arrow right"
          onClick={() => updateCarousel(currentIndex + 1)}
        >
          ›
        </button>
      </div>

      <div className="member-info">
        <h2 className="member-name">{teamMembers[currentIndex].name}</h2>
        <p className="member-role">{teamMembers[currentIndex].role}</p>
        <p className="member-role">{teamMembers[currentIndex].contact}</p>
        <p
          style={{
            color: "#848696",
            fontSize: "1rem",
            fontWeight: 500,
            opacity: 0.8,
            letterSpacing: "0.1em",
            padding: "10px 0",
            marginTop: "-15px",
            position: "relative",
          }}
        >
          {teamMembers[currentIndex].email}
        </p>
      </div>

      <div className="dots">
        {teamMembers.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => updateCarousel(i)}
          />
        ))}
      </div>
    </div>
  );
};
