import { useEffect, useState } from "react";
import "./team.css"; // CSS

interface Member {
  name: string;
  role: string;
  avatar: string;
  contact:string
}

const teamMembers: Member[] = [
  {
    name: "Akhliddin Teshaboev",
    role: "CEO",
    avatar:
      "/team/ceo.jpg",
    contact : "+8210-2989-8641"
  },
  {
    name: "Rakhmatilla Akhmedov",
    role: "Operation Manager",
    avatar:
      "/team/operation_m.jpg",
    contact : "+8210-9687-9796"
  },
  {
    name: "Bekmurod Abdullaev",
    role: "Marketing Manager",
    avatar:
      "/team/sales_m.jpg",
    contact : "+8210-8465-8085"
  },
  {
    name: "Julia Gimmel",
    role: "UX Designer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop",
    contact : ""
  },
  {
    name: "Lisa Anderson",
    role: "Marketing Manager",
    avatar:
      "https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=900&auto=format&fit=crop",
    contact : ""
  },
  {
    name: "James Wilson",
    role: "Product Manager",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3687&auto=format&fit=crop",
    contact : ""
  },
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
    <div className="team-wrapper pt-52">
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
